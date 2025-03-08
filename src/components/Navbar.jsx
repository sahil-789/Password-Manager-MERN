import React from 'react'
import { useEffect } from "react";

const Navbar = () => {

 useEffect(() => {
        fetch("https://yourbackend.vercel.app/api/test")
            .then(response => response.json())
            .then(data => console.log("Backend Response:", data))
            .catch(error => console.error("Error:", error));
    }, []);
  
  return (
    <nav className='bg-slate-800 text-white'>

        <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
       <div className="logo font-bold text-white text-2xl">
       <span className="text-green-500">  &lt; </span>
        <span>Pass</span> 
        <span className="text-green-500">OP/ &gt; </span>
      
       </div>

         {/* <ul>
            <li className='flex gap-4 '>
                <a href="/" className='hover:font-bold'>Home</a>
                <a href="" className='hover:font-bold'>About</a>
                <a href="" className='hover:font-bold'>Contact</a>
                
            </li>
         </ul> */}
         <button className='text-white bg-green-700 my-5 rounded-full flex  items-center justify-between pl-1'>
          <img className='invert w-10 p-1' src="icons/github.svg" alt="github" />
         <span className="font-bold px-2">GitHub</span> 
         </button>

         </div>
    </nav>
  )
}

export default Navbar
