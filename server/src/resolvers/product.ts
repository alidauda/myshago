import { Product } from '../entities/Product';
import { MyContext } from '../types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { wrap } from '@mikro-orm/core';

@InputType()
class Input {
  @Field()
  qty: number;
  @Field()
  amount: number;
  @Field()
  productName: string;
}

@ObjectType()
class Error {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class ProductResponse {
  @Field(() => [Error], { nullable: true })
  error?: Error[];
  @Field(() => Product, { nullable: true })
  product?: Product;
}


@Resolver()
export class ProductResolver {
  @Mutation(() => ProductResponse)
  async addProduct(
    @Arg('options') options: Input,
    @Ctx() { em, req }: MyContext
  ) {
    if (!req.session.userId) {
        {
            return {
                error:[
                    {
                        field: 'user',
                        message: 'please login',
                    }
                ]
            }
        }
    }
    const product = em.create(Product, {
      ...options,
      owner: new Object(req.session.userId),
    });

    await em.persistAndFlush(product);
    await wrap(product.owner).init();
    return {
        product
    };
  }
}
