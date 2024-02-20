import { useEffect, useState } from "react";
import { Appbar } from "../Components/Appbar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";
import axios from "axios";


export const Dashboard = () => {
    const currentUserId = localStorage.getItem('userId');
    const [amount, setAmount] = useState(0);
    const yourToken = localStorage.getItem('token')
   useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
            Authorization: `Bearer ${yourToken}`
        }
    }).then(response => {
        setAmount(response.data.balance);
    });
    
   },[yourToken])


    return (
        <div>
            <Appbar onClick={()=>{
                localStorage.setItem('token',"");
                window.location="/signin"}
                }/> 
            <div className="px-4">
                <Balance amount={amount} />
                <Users currentUserId={currentUserId}/>
            </div>
        </div>
    );
};
