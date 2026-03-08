'use client';
import { useState , useEffect } from "react";
import {useRouter} from 'next/navigation';
import Link from "next/link";

export default function SesionPanel() {
    const [user , setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    },[])


    const handleClick = () =>{
        router.push(`/perfil/${user.id}`);
    }

  return (
    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
      <li>
        <Link href={`/perfil/${user?.id}`}>
          <div className="flex items-center gap-x-6 cursor-pointer">
            <img
              alt="imagen de perfil"
              src="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
              className="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5"
            />
          </div>
        </Link>
      </li>
    </ul>
  )
}