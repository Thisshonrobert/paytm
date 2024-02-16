export function InputBox({label,placeholder}){
    return(<div>
        <div className="text-sm font-medium text-left py-1">{label}</div>
        <input className="border w-full px-2 py-1 rounded border-slate-200 " placeholder={placeholder} ></input>
    </div>)
}