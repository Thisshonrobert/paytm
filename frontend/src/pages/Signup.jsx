import { ButtonComponent } from "../Components/ButtonComponent";
import { ButtonWarning } from "../Components/ButtonWarning";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";

export function Signup(){
    return(<div >
        <Heading  label = {"Signup"} />
       <InputBox label={"Fistname"} placeholder={"thisshon"}/>
       <InputBox label={"Lastname"} placeholder={"robert"}/>
       <InputBox label={"Email"} placeholder={"thisshon@gmail.com"}/>
       <InputBox label={"Password"} placeholder={"12234"}/>
       <ButtonComponent buttonname={"Sign Up"} onClick={()=>{}}/>
       <ButtonWarning text={"Already have an account?"} buttonText={"Sign In"}  to={"/signin"}/>
    </div>)
}