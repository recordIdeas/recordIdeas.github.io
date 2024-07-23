import React from 'react';
import { Link } from "react-router-dom";

export default function HookList() {
  return <div>
    <main>
      <h2>Hooks</h2>
    </main>
    <nav>
      <ul>
        <li><Link to="/hooks/userLayoutEffect">userLayoutEffect</Link></li>
        <li><Link to="/hooks/useEffect">useEffect</Link></li>
        <li><Link to="/hooks/useTransition">useTransition</Link></li>
        <li><Link to="/hooks/useCallback">useCallback</Link></li>
        <li><Link to="/hooks/useContext">useContext</Link></li>
        <li><Link to="/hooks/useReducer">useReducer</Link></li>
        <li><Link to="/hooks/useImmerReducer">useImmerReducer</Link></li>
      </ul>
    </nav>
  </div>
}