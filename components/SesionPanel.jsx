'use client'
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";

export default function SesionPanel() {
    const [user, setUser] = useState(null);
    const router = useRouter();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);

    const handleClick = () => {
        router.push("/perfil/[id]");
    }

  return (
           <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        
            <li onClick={handleClick} className="flex cursor-pointer items-center gap-x-6">
              <div className="flex items-center gap-x-6">
              
              
                  <img
                  alt="imagen de perfil"
                  src={"data:image/png;base64,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"}
                  className="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5"
                />
              </div>
            </li>
     
        </ul>
  )
}
