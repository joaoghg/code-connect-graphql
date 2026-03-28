import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthPayload } from './entities/auth-payload.entity';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args('credentials') credentials: SignInDto) {
    return this.authService.signIn(credentials.email, credentials.password);
  }
}
