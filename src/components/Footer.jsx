import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full p-1 pt-3'>
        <div className="logo font-bold text-white text-2xl">
       <span className="text-green-500">  &lt; </span>
        <span>Pass</span> 
        <span className="text-green-500">OP/ &gt; </span>
      
       </div>

        <div className='flex h-10 justify-center items-center'>
      created with <img src="icons/heart.png" className='w-7 mx-2'  alt="" /> by sahil
      </div>
    </div>
  )
}

export default Footer
