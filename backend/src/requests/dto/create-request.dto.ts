import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  guestPhone: string;

  @IsString()
  @IsNotEmpty()
  requestText: string;
}