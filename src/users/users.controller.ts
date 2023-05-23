import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserId } from '../decorators/user-id.decorator';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  getMe(@UserId() id: string) {
    return this.usersService.findById(id);
  }

  @Patch('/me')
  @UsePipes(ValidationPipe)
  updateUser(@UserId() id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
