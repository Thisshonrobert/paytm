import { Link } from "react-router-dom";

export function ButtonWarning({text,buttonText,to}){
return(<div>
    <div>{text}</div>
    <Link to={to}>
    <div>{buttonText}</div>
    </Link>
    
</div>)
}