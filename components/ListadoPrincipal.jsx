'use client';

import { useState, useEffect } from "react";
import { getLocals } from "../api/api";
import Busqueda from "./Busqueda";
import LocalCard from "./LocalCard";
import Link from "next/link";


const ListadoPrincipal = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [locals, setLocals] = useState([]);

    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [rating, setRating] = useState("");
    const [city, setCity] = useState("");
    const [zone, setZone] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
        const token = localStorage.getItem("token");
        setToken(token);
    }, [])


    useEffect(() => {
        const fetchLocals = async () => {
            const data = await getLocals(query, type, priceRange, rating, city, zone);
            console.log("Locales", data.items);
            setLocals(data.items);
        }
        fetchLocals();
    }, [query, type, priceRange, rating, city, zone]);


    return (<div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" id="ListadoLocales">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Listado de Locales</h2>
            <Busqueda setQuery={setQuery} setType={setType} setPriceRange={setPriceRange} setRating={setRating} setCity={setCity} setZone={setZone} />
       <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
  {locals.map((local) => (
    <LocalCard key={local.id} local={local} />
  ))}
</div>
        </div>
    </div>);

}


export default ListadoPrincipal;