import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/actions/AuthActions";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className='w-full  py-2 px-10 fixed top-0 left-0 right-0'>
      <div className='flex justify-between items-center'>
        <Link to='/'>
          <h1 className='text-xl font-bold text-primary'>Bloggify</h1>
        </Link>
        <ul className='flex gap-5 tedxt-sm items-center text-white'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/blogs'>Blogs</Link>
          </li>
          <li>
            <Link to={"/create"}>Create Blog</Link>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  size='icon'
                  className='rounded-full  bg-slate-100 cursor-pointer hover:text-white hover:shadow p-2 border transition ease-in-out duration-200'
                >
                  <UserRound size={20} className='text-primary' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </div>
  );
}
