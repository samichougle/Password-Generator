import { useState, useCallback, useEffect, useRef} from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed , setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charactersAllowed) str += "!#$%&*+-./:;<=>?@[\]^_`{}"

    for (let i = 1; i <= length; i++) {
      let  char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, numberAllowed, charactersAllowed, setPassword])

  const copyPasswordToClipbord = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charactersAllowed, passwordGenerator])
  
  return (
    <div className="flex items-center justify-center h-screen bg-blue-400">
      <div className="w-full max-w-md max-auto shadow-md rounded-lg px-4 my-8  text-blue-400 bg-gray-600 p-1.5">
        <h1 className="text-amber-50 text-center p-2.5 ">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-amber-50">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipbord}
          className="outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0"
          >copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
            type="range" 
            min={8}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            defaultChecked={charactersAllowed}
            id="charactersInput"
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
      </div>
  )
}

export default App
