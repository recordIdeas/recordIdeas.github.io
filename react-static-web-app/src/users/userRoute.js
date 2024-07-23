import React from 'react';
import { Route, Routes } from "react-router-dom";

import NotFound from '../components/NotFound.js';
import Users from './users.js';
import NewUser from './newUser.js';
import UserDetail from './userDetail.js';
import UserList from './userList.js';

export default function userRoute() {
  return <div>
    <h1>Users</h1>
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/create" element={<NewUser />} />
      <Route path="/list" element={<UserList />} />
      <Route path="/:id" element={<UserDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
}