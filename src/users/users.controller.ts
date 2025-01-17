import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login_user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.register(createUserDto);
      return {
        status: 'success',
        message: 'User registered successfully',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      const token = await this.usersService.login(email, password);
      return {
        status: 'success',
        message: 'Login successful',
        data: token,
      };
    } catch (error) {
      throw error; 
    }
  }

}
