import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get("me") //front-end envoie rien
    getMe (){
        // return this.userService.getAll()
        return 'user info'
    }

}