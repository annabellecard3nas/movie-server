import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @UseGuards(JwtGuard)
  @Get('me') //front-end envoie rien
  getMe(@Req() req: Request) {
    //get the information of the current user based on the access token

    // return this.userService.getAll()
    return req.user;
  }
}
