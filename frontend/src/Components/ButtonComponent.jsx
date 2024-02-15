export function ButtonComponent({buttonname,onClick}){
    return(<div>
        <button  onClick={onClick} type="button">{buttonname}</button>
    </div>)
}