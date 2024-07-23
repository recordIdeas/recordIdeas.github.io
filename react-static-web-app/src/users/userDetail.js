import React from 'react';
import { useParams } from "react-router-dom";

export default function UserDetail() {
  let params = useParams();

  return <div>
    <main>
      <h2>Welcome to User: {params.id}</h2>
    </main>
  </div>
}