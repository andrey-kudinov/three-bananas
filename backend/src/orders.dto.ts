import { IsArray, IsEmail, IsIn, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  email!: string;

  @IsArray()
  @IsString({ each: true })
  @IsIn(['basic', 'advanced'], { each: true })
  items!: string[];
}