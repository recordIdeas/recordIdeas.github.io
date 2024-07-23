useReducer:
  const [state, dispatch] = useReducer(reducer, initialState);
  * state : 页面中使用的数据，被改变将触发页面的重新渲染
  * initialState ：state的初始值
  * reducer(state, action){
      switch(action.type) {
        case 'type-1': {//type-1
          return {
            ...state,
            stateKey2: state.stateKey2 + 1,
            stateKey3: action.actionKey2,
            todos: [
              ...state.todos,
              {
                stateTodoKey2: state.todos.stateTodoKey2 + 1,
                stateTodoKey3: action.actionKey3,
              }
            ]
          }
        }
      }
      //type-2
      //......
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    } ：通过action改变state的所有具体方法
  * dispatch(action) ：传入action, 改变state 并返回











import { useReducer } from 'react';

const initialState = { name: 'Taylor', age: 42 };

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
}


function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}