import { useState, useCallback , useEffect , useRef } from 'react'

function App() {
  let [length, setLength] = useState(8)
  let [numberAllowed, setNumberAllowed] = useState(false)
  let [charAllowed, setCharAllowed] = useState(false)
  let [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  let passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "`~!@#$%^&*-_+|=[]{};:?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])
  useEffect(()=>{
    passwordGenerator()
  } , [length , numberAllowed , charAllowed , setPassword])
  const copyToKeyboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <div className='h-screen flex justify-center items-center w-screen'>
        <div className=' max-w-fit shadow-md rounded-lg px-4 my-8 bg-gray-600 text-orange-500'>
          <h1 className='text-white text-center mt-4 mb-4 '>Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input type="text" ref={passwordRef} value={password} className='outline-none w-full py-1 px-3' placeholder='strong password' readOnly />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToKeyboard}>copy</button>
          </div>
          <div className='flex text-sm gap-x-2 mb-4'>
            <div className='flex items-center gap-x-1'>
              <input type='range' min={8} max={25} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
              <label>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed((prew)=> !prew)}} />
              <label>Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={()=>{setCharAllowed((prew)=> !prew)}} />
              <label>Character</label>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
