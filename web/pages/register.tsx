import { NextPage } from "next";
import { useState } from "react";
import graphqlRequestClient from "../src/clients/graphqlResquest";
import { RegisterMutation, RegisterMutationVariables,  useRegisterMutation } from "../src/generated/graphql";

const Register:NextPage=()=>{
    const{mutate}=useRegisterMutation(graphqlRequestClient,{
        onSuccess: (data: RegisterMutation, _variables: RegisterMutationVariables, _context: unknown) => {
           
            return console.log('mutation data', data);
          },

    })
    const [email,setEmail]=useState("")
    return(
        <div>
        <input type={"email"} placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type={"password"} placeholder="password"/>
        <button onClick={(e)=>{
            mutate({  email: email, password:email })
        }}>submit</button>
        </div>
    )   
}

export default Register ;