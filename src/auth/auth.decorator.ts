import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SWAGGER_DES_UNAUTHORIZED } from 'src/constants';
import { JwtAuthGuard } from './auth.guard';

export function AuthDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: SWAGGER_DES_UNAUTHORIZED }),
    UseGuards(JwtAuthGuard),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer #your-token-here',
      required: true,
    }),
  );
}
