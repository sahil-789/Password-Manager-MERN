import React from 'react';
import { v4 as uuidv4 } from 'uuid';

  import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'

const API_BASE_URL = "https://password-manager-backend-rouge.vercel.app/";




const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async ()=>{
    let req= await fetch(`${API_BASE_URL}`)
    let passwords= await req.json()
    console.log(passwords)
      setpasswordArray(passwords)

  }

  useEffect(() => {
    
    getPasswords()
    
   
  }, [])



  const showpassword = () => {
    const pass = document.getElementById("password")
     passwordRef.current.type="text"

    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type="text"
    }
    else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type="password"
    }

    

    // if (pass.type === "password") {
    //   pass.type = "text"
    // }
    // else {
    //   pass.type = "password"
    // }
  }

  const savePassword = async () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){
    setpasswordArray([...passwordArray,{...form, id:uuidv4()}])
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id:uuidv4()}]))
    // console.log(...passwordArray, form)
    await fetch(`${API_BASE_URL}`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...form, id:uuidv4()})})

   await fetch(`${API_BASE_URL}`,{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({ id:form.id})})

    setform({site:"",username:"",password:""})
    toast('Password Saved', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    
      });
    }
    else{
      toast('Error:Password not Saved',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      
        })
    }
  }
  
  const deletePassword = async (id)=>{
    let c=confirm("Are you sure you want to edit this password?")
    if(c){
    console.log("deleting password with id",id)
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    let res= await fetch(`${API_BASE_URL}`,{method:"DELETE",headers:{"content-type":"application/json"},body:JSON.stringify({ id})})
    toast('Password Deleted Succesfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    
      });
   
    }
  }
  const editPassword =(id)=>{
   
    console.log("editing password with id",id)
    setform({...passwordArray.filter(item=>item.id===id)[0],id:id})
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    
    
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    toast('copied to clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    
      });
    navigator.clipboard.writeText(text)
  }
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">

        </div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer min-h-[85vh]">
        <h1 className='text-4xl text font-bold text-center'>
          <span className="text-green-500">  &lt; </span>
          <span>Pass</span>
          <span className="text-green-500">OP/ &gt; </span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own password ,anager</p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} type="text" placeholder='Enter Website url' className="rounded-full border border-green-500  w-full px-4 py-1" name="site"  />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} type="text" placeholder='Enter Username' className="rounded-full border border-green-500  w-full px-4 py-1" name="username" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} type="password" placeholder='Enter Password' className="rounded-full border border-green-500  w-full px-4 py-1" name="password"  />
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showpassword}>
                <img ref={ref} src="icons/eye.png" width={26} className='p-1' alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'> <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover">
          </lord-icon> Add Password</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {
            passwordArray.length===0 && <div>No Passwords to show </div>
          }
          { passwordArray.length!=0 && <table className="table-auto w-full overflow-hidden rounded-md mb-10"> 
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item,index)=>{
                return <tr key={index}>
                <td className='text-center  py-2 border border-white '>
                  <div className='flex items-center justify-center'>
                 <span> <a href={item.site} target="_blank" className='flex items-center justify-center text-ellipsis max-w-[90%] whitespace-nowrap' >{item.site}</a> </span>
                <div className="cursor-pointer size-7 lord-icon-copy flex items-center justify-center pt-[5px]" onClick={()=>{copyText(item.site)}}>
                    <lord-icon  style={{"width":"20px","height":"20px"}}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover" >
                    </lord-icon>
                    </div>
                    </div>
                </td>
                <td className='text-center  py-2 border border-white '>
                <div className='flex items-center justify-center'>
                 <span> {item.username}</span> 
                  <div className="cursor-pointer size-7 lord-icon-copy flex items-center justify-center pt-[5px]" onClick={()=>{copyText(item.username)}}>
                    <lord-icon  style={{"width":"20px","height":"20px"}}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover" >
                    </lord-icon>
                    </div>
                    </div>
                  </td>
                <td className='text-center  py-2 border border-white '>
                <div className='flex items-center justify-center'>
                 <span>{"*".repeat(item.password.length)}</span> 
                  <div className="cursor-pointer lord-icon-copy size-7 flex items-center justify-center pt-[5px]" onClick={()=>{copyText(item.password)}}>
                    <lord-icon  style={{"width":"20px","height":"20px"}}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover" >
                    </lord-icon>
                    </div>
                    </div>
                  </td>
                  <td className='text-center  py-2 border border-white '>
                  <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                  </td>
              </tr>
              })}
             
              
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
