
import { useRef } from 'react'
import { useState, useCallback, useEffect } from 'react'

function App() {

  const[length,setlength]=useState(6)
  const[numAllow,setnumAllow]=useState(false)
  const[charAllow,setcharAllow]=useState(false)
  const[password,setPassword]=useState("")



  //use refhook
  const passwordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if(numAllow){
      str+="0123456789"
    }
    if(charAllow){
      str+="!#$%&()*+,-./:;<=>?@[]^_{|}~"
    }

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)


  },[length, numAllow, charAllow, setPassword])



  
  useEffect(() => {
  passwordGenerator()
  }, [length,numAllow,charAllow,passwordGenerator])


     //  copy pass to clip
const copypasswordtoClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,102)
  window.navigator.clipboard.writeText(password)
},[password])
  

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 pt-4 pb-4 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button
            onClick={copypasswordtoClipboard}
            className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'
            >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input 
            type="range"
            min={1}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setlength(e.target.value)
            }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numAllow}
            id="numberInput"
            onChange={()=>{
              setnumAllow((prev)=>!prev);
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={charAllow}
            id="characterInput"
            onChange={()=>{
              setcharAllow((prev)=>!prev);
            }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
    </div>
    </>
  )
}
export default App
