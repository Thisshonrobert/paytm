import { ButtonComponent } from "../Components/ButtonComponent";
import { ButtonWarning } from "../Components/ButtonWarning";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";

export const Signin = ()=>{
    return(
    <div className="bg-slate-300 h-screen flex justify-center">
       <div className="flex flex-col justify-center ">
        <div className="rounded-lg bg-white w-80 text-center p-2 px-4">
            <Heading  label = {"Sign In"} />
            <SubHeading text={"Enter your information to create an account"}/>
            <InputBox label={"First Name"} placeholder={"thisshon"}/>
            <InputBox label={"Last Name"} placeholder={"robert"}/>
            <InputBox label={"Email"} placeholder={"thisshon@gmail.com"}/>
            <InputBox label={"Password"} placeholder={"12234"}/>
            <ButtonComponent buttonname={"Sign in"} onClick={()=>{}}/>
            <ButtonWarning text={"Don't have an account? "} buttonText={"Sign Up"}  to={"/signup"}/>
        </div>
       </div>
    </div>)
}
