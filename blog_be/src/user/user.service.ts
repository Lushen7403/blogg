import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { UserDTO } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel : Model<User>,
        private readonly jwtService : JwtService
    ) {
    }
    async createUser(userDTO : UserDTO) : Promise<User> {
        const hashedPassword = await bcrypt.hash(userDTO.password, 12);
        const newUser = new this.userModel({ ...userDTO, password: hashedPassword });
        return newUser.save();
    }
    async login(userDTO : UserDTO) : Promise<{message: string, token: string}> {
        const user = await this.userModel.findOne({account : userDTO.account});
        if(!user) {
            throw new BadRequestException("Tài khoản không tồn tại!!");
        }
        if(!await bcrypt.compare(userDTO.password, user.password)) {
            throw new BadRequestException("Mật khẩu không chính xác !!")
        }
        const jwt = await this.jwtService.signAsync({id: user._id});
        return {
            message: 'Đăng nhập thành công !!!',
            token : jwt,
        };
    }
}
