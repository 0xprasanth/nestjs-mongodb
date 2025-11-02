import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/User.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserSettings } from 'src/schemas/UserSettings.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
  getUsers() {
    return this.userModel.find().populate(['settings', 'posts']).select('-__v');
  }

  getByUsername(username: string) {
    return this.userModel
      .findOne({ username })
      .populate(['settings', 'posts'])
      .select('-__v');
  }

  getUserById(id: string) {
    return this.userModel
      .findById(id)
      .populate(['settings', 'posts'])
      .select('-__v -password');
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .select('-__v');
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id, {
      new: true,
    });
  }
}
