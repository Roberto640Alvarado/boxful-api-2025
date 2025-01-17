import { IsString, IsNumber } from 'class-validator';

export class CreatePackageDto {
  @IsNumber()
  readonly length: number; 

  @IsNumber()
  readonly width: number; 

  @IsNumber()
  readonly height: number;

  @IsNumber()
  readonly weight: number;

  @IsString()
  readonly content: string;
}
