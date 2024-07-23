useMemo
   const cachedValue = useMemo(calculateValue, dependencies)
   * cachedValue: 返回的计算结果，如果依赖项不改变，该结果会被缓存
   * calculateValue: 计算要缓存的值的函数，它应该是纯函数，不应采用任何参数，并且应返回任何类型的值
   * dependencies: 依赖项列表

memo(function Component1({params})) {
  return (
    <>
    {params}
    </>
  )
}  缓存组件，如果组件传入的参数的值不改变，不会触发重新渲染该组件