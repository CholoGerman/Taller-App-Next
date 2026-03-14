'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function SesionPanel() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
      const t = localStorage.getItem("token")
      setToken(t);
    } else {
      router.push("/");
    }
  }, []);


   const handleClick = () => {
    if (user) {
      router.push(`/perfil/${user.id}`);
    }
  };

  if (!user) return null;

   return (
    <div onClick={handleClick} className="cursor-pointer">
      <img
        alt="imagen de perfil"
        src="https://cdn-icons-png.flaticon.com/512/6861/6861326.png"
        className="size-12 rounded-full outline-1 -outline-offset-1 outline-black/5 hover:opacity-80 transition"
      />
    </div>
  );
}