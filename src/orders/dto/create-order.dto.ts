import { IsString, IsDate, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePackageDto } from './create-package.dto';

export class CreateOrderDto {
  @IsString()
  readonly pickupAddress: string;

  @IsDate()
  readonly scheduledDate: Date;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phone: string;

  @IsString()
  readonly recipientAddress: string;

  @IsString()
  readonly department: string;

  @IsString()
  readonly municipality: string;

  @IsString()
  readonly referencePoint: string;

  @IsString()
  @IsOptional()
  readonly instructions?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePackageDto)
  readonly packages: CreatePackageDto[];
}

  