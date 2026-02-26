"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocals } from "../../../api/api";
import Profile from "../../../components/Profile";

const BASE_URL = "https://api-react-taller-production.up.railway.app";

export default function Perfil() {

  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [locales, setLocales] = useState([]);
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      router.push("/");
      return;
    }

    setUsuario(user);
    loadData(user.id);
  }, []);

  const loadData = async (userId) => {
    try {
      // 🔹 LOCALES usando getLocals()
      const dataLocales = await getLocals();

      // si tu api devuelve { items: [...] }
      const listaLocales = dataLocales.items || [];

      const localesFiltrados = listaLocales.filter(
        (local) => local.creatorId === userId
      );

      setLocales(localesFiltrados);

      // 🔹 PLATOS
      const resPlatos = await fetch(`${BASE_URL}/api/dishes`);
      const dataPlatos = await resPlatos.json();

      const listaPlatos = dataPlatos.items || dataPlatos || [];

      const platosFiltrados = listaPlatos.filter(
        (plato) => plato.creatorId === userId
      );

      setPlatos(platosFiltrados);

    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  };

  return (
    <Profile
      usuario={usuario}
      locales={locales}
      platos={platos}
    />
  );
}