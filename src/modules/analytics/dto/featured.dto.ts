import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsDateString, IsInt, IsDate } from 'class-validator';
import { InteractionType } from 'src/shared/enums/interaction-type.enum';

export class RegisterInteractionDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // tokenId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contract!: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InteractionType)
  interactionType!: InteractionType;
}

export class FeaturedDto {
  // @IsNotEmpty()
  // @IsString()
  // tokenId!: string;

  @IsNotEmpty()
  @IsString()
  contract!: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsInt()
  clicks!: number;

  @IsInt()
  views!: number;

  @IsDate()
  lastInteractedAt!: Date;
}
