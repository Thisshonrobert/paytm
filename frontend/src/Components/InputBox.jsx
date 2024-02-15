export function InputBox({label,placeholder}){
    return(<div>
        <div>{label}</div><br></br>
        <input  placeholder={placeholder} ></input>
    </div>)
}