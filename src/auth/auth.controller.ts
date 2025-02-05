import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    /*@Body('email') email:string, 
         si l'on desire que le password soit un  numero alors ('passowrd',ParseIntPipe)
         @Body('password') password: string,*/
    @Body() dto: AuthDto,
  ) {
    //   console.log({
    //    dto,
    // });
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignInDto) {
    //   console.log({
    //    dto,
    // });
   
    return this.authService.signin(dto);
  }
}
