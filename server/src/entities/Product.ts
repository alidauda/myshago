import { Entity, ManyToOne, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { v4 } from "uuid";
import { User } from "./User";

@ObjectType()
@Entity()
export class Product{
    [OptionalProps]?: "title" | "updatedA" | "createdAt";
    @Field(()=>String)
    @PrimaryKey()
    id: string=v4();
    
    @Field(()=>String)
    @Property({type:"text"})
    productName!:string;
    
    @Field(()=> String)
    @Property({type:"date"})
    createdAt=new Date();
    
    @Field(()=>String)
    @Property({type:"date",onUpdate:()=>new Date() ,nullable:true})
    updatedA = new Date();

    @Field(()=>Int)
    @Property()
    qty!:number

    @Field(()=>Int)
    @Property()
    amount!:number

    @Field(()=>User)
    @ManyToOne({ entity:()=>User})
    owner!:User

}