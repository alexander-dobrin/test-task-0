import { IsEmail, IsNumber, IsOptional } from 'class-validator';

export class GetUsersQueryDto {
  @IsEmail()
  readonly email!: string;

  @IsOptional()
  @IsNumber()
  readonly number?: number;
}
