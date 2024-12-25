import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    
    @Post('login')
    async Login(@Body() userDTO : UserDTO, @Res({passthrough: true}) res) {
        const {message, token} =  await this.userService.login(userDTO);
        res.cookie('jwt', token, {
            secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng secure trong môi trường production
            sameSite: 'strict'
        });
        return res.status(200).json({ 
            mess: message
     });
    }
    @Post('register')
    async Register(@Body() userDTO : UserDTO, @Res() res) {
        const newUser = await this.userService.createUser(userDTO);
        return res.status(200).json(newUser);
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res) {
        res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
        return res.status(200).json({
            message: 'Logout successful'
        });
    }
}
