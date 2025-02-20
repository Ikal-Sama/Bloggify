import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className='bg-black'>
      <Header />
      <div className='px-10  h-full'>
        <Outlet />
      </div>
    </div>
  );
}
