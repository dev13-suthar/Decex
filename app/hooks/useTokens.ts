import { useEffect, useState } from "react"
import { TokenDetails } from "../Tokens"; 
import axios from "axios";

export interface TokenWithBalance extends TokenDetails{
    balance:string,
    usdBalance:string
}

export const useTokens = (address:string)=>{
    const [tokenBalances, settokenBalances] = useState<{
        totalBalance:number,
        tokens:TokenWithBalance[]
    }|null>(null);
    const [loading, setloading] = useState(true);

    useEffect(()=>{
        axios.get(`/api/tokens?address=${address}`)
        .then(res=>{
            settokenBalances(res.data)
            setloading(false)
        })
    },[address])


    return {
        loading,tokenBalances
    }
}

export interface totalBalancesType{
    totalBalance:number,
    tokens:TokenWithBalance[]
}