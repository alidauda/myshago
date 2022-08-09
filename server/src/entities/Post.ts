import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Post {
  [OptionalProps]?: "title" | "updatedA" | "createdAt";
  @Field(()=>Int)
  @PrimaryKey()
  id!: number;
  
  @Field(()=>String)
  @Property({type:"text"})
  title!:string;
  
  @Field(()=> String)
  @Property({type:"date"})
  createdAt=new Date();
  
  @Field(()=>String)
  @Property({type:"date",onUpdate:()=>new Date() ,nullable:true})
  updatedA = new Date();

  

  

}