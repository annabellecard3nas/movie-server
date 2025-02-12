import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET! 
    });
  }

  async validate(payload: {sub:number, email:string}) {

    const user = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    // delete user.password;
    
    return user; 
  }
}
