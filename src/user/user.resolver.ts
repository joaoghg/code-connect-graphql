import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './models/create-user.dto';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.users();
  }

  @Mutation(() => User)
  async createUser(@Args('user') user: CreateUserDto) {
    return this.userService.create(user);
  }
}
