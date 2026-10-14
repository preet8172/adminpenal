
import { createContext, useState } from "react";
import axios from "axios";

import { useEffect } from "react";
export let Authcontext= createContext()

export function Authprovider({children}){
let [products,setproducts]= useState([])



    async function fetchdata(obj){
        let data1 = await axios.post("http://localhost:5000/users/login",obj)

        // let data2 = await fetch("https://fakestoreapi.com/products")
        // console.log(data2)

        let res = await data1.data
        console.log(res)
        
    }


    useEffect(()=>{
        let obj={
"email":"vikram@example.com",
"password":"vikram123"
}
fetchdata(obj)
    },[])


    return (

        <>
        <Authcontext.Provider value={{products}}>
            {children}
        </Authcontext.Provider>
    
        </>
    )
}