import React from 'react';
import { useTransition } from 'react';

export default function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return <b>{children}</b>
  }

  if (isPending) {
    return <small><i>{children}</i></small>;
  }

  return (
    <button onClick={() => {
      startTransition(() => {
        onClick();
      });
    }}>
      {children}
    </button>
  );
}