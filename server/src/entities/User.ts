import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
 
} from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';
import { v4 } from 'uuid';
@ObjectType()
@Entity()
export class User {
  [OptionalProps]?: 'title' | 'email' | 'createdAt' | 'password';

  @Field(() => String)
  @PrimaryKey()
  id: string = v4();

  @Field(() => String)
  @Property({ type: 'text', unique: true })
  email!: string;

  
  @Property({ type: 'text' })
  password!: string;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();
}
