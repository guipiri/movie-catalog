import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SWAGGER_DES_UNAUTHORIZED } from 'src/constants';
import { JwtAuthGuard } from './auth.guard';

export function AuthDecorators() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: SWAGGER_DES_UNAUTHORIZED }),
    UseGuards(JwtAuthGuard),
  );
}
