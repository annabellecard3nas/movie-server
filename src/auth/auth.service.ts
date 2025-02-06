import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { AuthDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';


@Injectable() //decorater
export class AuthService {
  authService: any;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwt: JwtService,

  ) {}

  async signup(dto: AuthDto) {
    try {
      ///generate the password hash
      const hash = await argon.hash(dto.password);

      // Create a new user instance
      const user = this.userRepository.create({
        name: dto.name,
        email: dto.email,
        password: hash, // enregistre the hashed password
      });

      // Save the new user in the database
      await this.userRepository.save(user);

      
      //returns token
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Duplicate email error (Prisma error)
        throw new ForbiddenException('Credential taken');
      }
      throw error; // Re-throw other unexpected errors
    }
  }

  async signin(dto: SignInDto) {
    ///find the user by email
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    //and if the user doesn't exist then throw  exception (error)
    if (!user) throw new ForbiddenException('credential incorrect');

    //compare passwords
    const pwMatch = await argon.verify(user.password, dto.password);

    //if the password is incorrect then  throw Exception (error)
    //si le password est incorrect alors il faut jeter une exception en d'autres mots une erreur
    if (!pwMatch) throw new ForbiddenException('credential incorrect');

    // Delete the password field before returning the user
    // delete user.password;

    //otherwise return user
    return this.signToken(user.id, user.email);
  }


  //the token
  async signToken(userID: number, email: string): Promise<{access_token:string}> {
    const payload = { sub:userID, email };

   

    const token = await this.jwt.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      });
  
    return {
      access_token: token,
    }

    // return this.jwt.signAsync(payload, {
    //   expiresIn: '1h',
    //   secret: 'secret',
    // });
  }
}
