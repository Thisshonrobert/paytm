import { Appbar } from "../Components/Appbar"
import {Balance } from "../Components/Balance"
import { Users } from "../Components/Users"

export const Dashboard = ()=>{
    return(
        <div>
            <Appbar/>
            <div className="px-4">
                <Balance amount={"10,000"}/>
                <Users name={"Thisshon Robert"}/>
             </div>
            
        </div>
    )
}