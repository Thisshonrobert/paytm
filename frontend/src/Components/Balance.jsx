export function Balance({amount}){
    return(
        <div className="flex font-semibold  pt-4 pb-4 text-lg">
            <div >Your Balance</div>
            <div className="pl-4"> Rs {amount}</div>
        </div>
    )
}