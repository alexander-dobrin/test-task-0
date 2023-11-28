import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetUsersQueryDto {
  @IsNotEmpty()
  readonly email!: string;

  @IsOptional()
  @IsNumber()
  readonly number?: number;
}
