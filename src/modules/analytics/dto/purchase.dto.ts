import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsDateString, IsInt, IsDate } from 'class-validator';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';

export class RegisterSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contract!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  quantity: number;
}

export class PurchaseDto {
  @IsNotEmpty()
  @IsString()
  contract!: string;

  @IsNotEmpty()
  @IsString()
  user: string;
}
