import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsDateString, IsInt, IsDate } from 'class-validator';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';

export class ProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
