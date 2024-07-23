useRef 引用渲染不需要的值：

const inputRef = useRef(初始值)

inputRef.current // 初始值

inputRef.current = 改变值

inputRef.current // 改变值

1. 在重新渲染之前存储信息
2. 改变它不会触发重新渲染
3. 该信息对于组件的每个副本都是本地的
4. 可使用ref操作dom
5. 使用forwardRef方法将ref暴露给父组件

const MyInput = forwardRef((props, ref)=>{return <input {...props} ref={ref} />})

function Form() {
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }
  function handleChange() {
    console.log(inputRef.current);
  }
  return(
    <>
      <MyInput onChange={handleChange} ref={inputRef} />
      <button onClick={handleClick}>Click</button>
    </>
  )
}

** 渲染期间不能写入后读取（除非只用于初始化），请放在 事件 或 Effect 中使用
const playRef = useRef(null);
if(playRef.current === null) playRef.current = new VideoPlayer();


useState 与 useRef 的区别是：
useState，通过 setStateVal(value) 改变值, 直接通过 stateVal 拿到改变值，且会触发重新渲染（保存更新的值，并重新渲染当前组件）
useRef，通过 inputRef.current 改变值, 通过 inputRef.current 拿到改变值，不会触发重新渲染（保存更新的值，不会触发重新渲染）