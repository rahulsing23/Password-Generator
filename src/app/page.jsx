"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";

const page = () => {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_-=+~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);
  

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator]);
   
  const copyPasswordToClipboard = useCallback(()=>{
    //for select the password  it is not necessary
    passwordRef.current ?.select()
    // main line to copy the password
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 py-3 my-[150px] text-orange-500 bg-gray-800 ">
        
        <h1 className="text-white text-center my-3 text-lg">Password Generator</h1>

       <div className="flex shadow rounded-lg overflow-hidden mb-4">

        <input type="text" value={password} 
        className="outline-none w-full py-1 px-3 "
        placeholder="Password"
        ref={passwordRef} readOnly/>

        <button 
        onClick={copyPasswordToClipboard}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
       </div>
       <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e)=>{
            setlength(e.target.value)
          }}/>
          <label> Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
            setnumberAllowed((prev) => !prev)
          }}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{
            setcharAllowed((prev) => !prev)
          }}/>
          <label htmlFor="charInput">Character</label>
        </div>
       </div>



      </div>
    </>
  );
};

export default page;
