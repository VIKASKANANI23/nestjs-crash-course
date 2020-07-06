import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, ParseBoolPipe, Query, UseFilters, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';
import { UserDto, UserParamsDto } from './dto/user.dto';
import { HttpExceptionFilter } from './filter';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  // 
  }
  @Get()
  getUsers(  
  @Param('id', ParseIntPipe) id: number,
  @Query('sort') sort: boolean,
  @Body() data: UserDto)
  : User[] {
    return this.userService.getUsers()
  }

  // HTTP GET /user
  @Get('/:email')
  async getUser(@Param() param: UserParamsDto): Promise<User> {
    try {
       return await this.userService.getUser(param.email)
    }catch(err){
       throw new BadRequestException('test')
    }
  }

  @Post()
  @UsePipes(new ValidationPipe(

  ))
  postUser(@Body() user: UserDto): User {
    return this.userService.addUser(user);
  }


  // HTTP DELETE /users/EMAIL@GMAIL.COM
  @Delete('/:email')
  deleteUser(@Param() params: UserParamsDto): User[] {
    return this.userService.deleteUser(params.email);
  }
}
