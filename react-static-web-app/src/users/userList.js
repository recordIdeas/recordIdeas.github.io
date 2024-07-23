import React from 'react';
import { Link } from "react-router-dom";

export default function UserList() {
  return <ul>
    <li><Link to="/users/1">User 1</Link></li>
    <li><Link to="/users/2">User 2</Link></li>
    <li><Link to="/users/3">User 3</Link></li>
    <li><Link to="/users/4">User 4</Link></li>
  </ul>
}