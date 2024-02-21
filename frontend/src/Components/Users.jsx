import { useEffect, useState } from "react"
import { ButtonComponent } from "./ButtonComponent"
import axios from "axios";
import _debounce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";

export const Users = ({currentUserId}) => {
    
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");
   
    const debouncedApplyFilter = _debounce((e) => {
        setFilter(e.target.value);
    }, 500);
    
    useEffect(()=>{
     axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).
     then(respone=>{
        setUsers(respone.data.user);
     })
    },[filter])
    
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={debouncedApplyFilter}
            type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
        {users.map(user => (
    user._id !== currentUserId &&
    <User key={user._id} user={user} />
        ))}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate()
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center mt-3 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <ButtonComponent onClick={()=>{
                navigate("/sent?id="+user._id+"&name="+user.firstName)
            }} buttonname={"Send Money"} />
        </div>
    </div>
}