import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsDateString, IsInt, IsDate } from 'class-validator';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';

export class PackingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class UpdatePackingDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
