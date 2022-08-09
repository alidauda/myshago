import { User } from '../entities/User';
import { MyContext } from '../types';
import {
  Arg,

  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import bcrypt from 'bcrypt';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class InputField {
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: InputField,
    @Ctx() { em,req }: MyContext
  ) {
    if (
      !options.email.match(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
      )
    ) {
      return {
        error: [
          {
            field: 'email',
            message: 'invalide email',
          },
        ],
      };
    }

    if (options.password.length <= 7) {
      return {
        error: [
          {
            field: 'password',
            message: 'password must be at least 8 characters',
          },
        ],
      };
    }
    const salt = await bcrypt.hash(options.password, 10);

    const user = await em.create(User, {
      email: options.email,
      password: salt,
    });
    try{await em.persistAndFlush(user);
    } catch (err) {
        if (err.code === "23505") {
          return {
            error: [
              {
                field: "email",
                message: "email already exist",
              },
            ],
          };
        }
      }
      req.session.userId=user.id;
    return {user};
  }
  @Query(()=>User,{nullable:true})
  async me(
    @Ctx(){req,em}:MyContext
  ){
    if(!req.session.userId){
       return null;
    }
    const user = await em.findOne(User,{id:req.session.userId})
   return user ;
    
  }
  @Mutation(()=>UserResponse)
  async login(@Arg("options") options: InputField, @Ctx() { em,req }: MyContext):Promise<UserResponse> {
    const user = await em.findOne(User, { email: options.email });
    if (!user) {
      return {
        error: [
          {
            field: "email",
            message: "this user does not exist",
          },
        ],
      };
    }
    const valid = await bcrypt.compare(options.password,user.password);
    console.log(valid)
    if (!valid) {
      return {
        error: [
          {
            field: "password",
            message: "that password is inncorect ",
          },
        ],
      };
    }
    req.session.userId=user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("asa");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
