import { ButtonComponent } from "../Components/ButtonComponent";
import { ButtonWarning } from "../Components/ButtonWarning";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signin = ()=>{
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
   const navigate = useNavigate();

    return(
    <div className="bg-slate-300 h-screen flex justify-center">
       <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p-2 px-4">
            <Heading  label = {"Sign In"} />
            <SubHeading text={"Enter your information to signin"}/>
            <InputBox onChange={e=>{
                setFirstName(e.target.value);
            }}label={"First Name"} placeholder={"thisshon"}/>
              <InputBox onChange={e=>{
                setLastName(e.target.value)
            }}   label={"Last Name"} placeholder="robert"/>
            <InputBox onChange={e=>{
                setUsername(e.target.value);
            }}  label={"Email"} placeholder="thisshon@gmail.com"/>
            <InputBox onChange={e=>{
                setPassword(e.target.value);
            }} label={"Password"} placeholder="12234"/>
            <ButtonComponent onClick={ async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              firstName,
              lastName,
              password
            });       
            localStorage.setItem("token",response.data.token);
            localStorage.setItem('userId', response.data.id);

            navigate("/dashboard");
            }}buttonname={"Sign in"} />
            <ButtonWarning text={"Don't have an account? "} buttonText={"Sign Up"}  to={"/signup"}/>
        </div>
       </div>
    </div>)
}
