import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button disabled={!text.trim()} onClick={() => onAddTask(text.trim())}>Add</button>
    </>
  );
}
