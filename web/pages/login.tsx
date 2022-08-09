import { NextPage } from "next";
import graphqlRequestClient from "../src/clients/graphqlResquest";
import { useLoginMutation } from "../src/generated/graphql";

const Login:NextPage=()=>{
    //const[,login]=useLoginMutation(graphqlRequestClient,{})
    return(
        <div>
        <input type={"email"} placeholder="email" />
        <input type={"password"} placeholder="password"/>
        </div>
    )   
}

export default Login ;