import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsInt, IsNumber, IsString } from 'class-validator';
import { EnvironmentEnum } from '../shared/enums/environment.enum';
import { NearEnvEnum } from 'src/shared/enums/nearenv.enum';

export class EnvironmentVariables {
  @IsEnum(EnvironmentEnum)
  NODE_ENV: EnvironmentEnum;

  @IsInt()
  PORT!: number;

  @IsString()
  HOST_ORM!: string;

  @IsString()
  DATABASE_ORM!: string;

  @IsString()
  USER_ORM!: string;

  @IsString()
  PASSWORD_ORM!: string;

  @IsInt()
  PORT_ORM!: number;

  @IsString()
  DO_SPACES_KEY!: string;

  @IsString()
  DO_SPACES_SECRET!: string;

  @IsString()
  DO_SPACES_REGION!: string;

  @IsString()
  DO_SPACES_ENDPOINT!: string;

  @IsString()
  DO_SPACES_BUCKET!: string;
}
