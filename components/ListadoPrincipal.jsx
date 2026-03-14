'use client';

import { useState, useEffect } from "react";
import { getLocals } from "../api/api";
import { useRouter } from 'next/navigation';
import Busqueda from "./Busqueda";
import LocalCard from "./LocalCard";
import Loader from "./Loader";
import Link from "next/link";


const ListadoPrincipal = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [rating, setRating] = useState("");
    const [city, setCity] = useState("");
    const [zone, setZone] = useState("");

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


    useEffect(() => {
        const fetchLocals = async () => {
            setLoading(true);
            const data = await getLocals(query, type, priceRange, rating, city, zone);
            console.log("Locales", data.items);
            setLocals(data.items);
            setLoading(false);
        }
        fetchLocals();
    }, [query, type, priceRange, rating, city, zone]);

    if (loading) {
        return <Loader />;
    }


    return (<div >
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