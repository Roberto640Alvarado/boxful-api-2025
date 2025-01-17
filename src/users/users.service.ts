import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

type Tokens = {
  token: string,
  message: string
}

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtSvc: JwtService,
  ) {}

  //Crear un nuevo usuario
  async register(createUserDto: CreateUserDto): Promise<Tokens> {
    try {
      //Hashear la contraseña del usuario
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      //Buscar si ya existe un usuario con el mismo email
      const user = await this.userModel.findOne({ email: createUserDto.email });

      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      //Crear y guardar el nuevo usuario
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      //Guardar el usuario en la BD
      const savedUser = await newUser.save();

      //Generar y devolver el token
      return this.generateToken(savedUser);
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Username or email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Realizar login
  async login(email: string, password: string): Promise<Tokens> {
    try {
      //Verificar si el usuario existe
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      //Comparar la contraseña
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      //Generar y devolver el token
      return this.generateToken(user);
    } catch (error) {
      throw new HttpException(error.message || 'Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  //Generar token
  private async generateToken(user): Promise<Tokens> {
    const payload = {email: user.email, sub: user._id};

    const token = await this.jwtSvc.signAsync(payload);

    return {
      token,
      message: 'User logged in successfully',
    };
  }

}
