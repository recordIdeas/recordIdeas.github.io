useRef 从组件读取和订阅上下文

** 仅用于 上下文 中使用

import { createContext, useContext, useState } from 'react';

const SomeContext = createContext(null);

export default function App() {
  const [some, setSome] = useState('');

  return (
    <>
      <SomeContext.Provider value={{some, setSome}}>
        <Some />
        Your name is {some}
      </SomeContext.Provider>
    </>
  )
}

function Some() {
  const {some, setSome} = useContext(SomeContext);

  return (
    <div>Please Input Your Name:
      <input value={some} onChange={e=>{setSome(e.target.value)}} />
    </div>
  )
  <
}