'use client';

import { useEffect, useState } from "react";
import { getDishes } from "../api/api";
import { useRouter } from 'next/navigation';
import BusquedaPlatos from "./BusquedaPlatos";
import PlatoCard from "./PlatoCard";
import Loader from "./Loader";
import Link from "next/link";

const ListadoPlatos = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [city, setCity] = useState("");
    const [localId, setLocalId] = useState("");





    useEffect(() => {
        const fetchDishes = async () => {
            setLoading(true);
            const data = await getDishes(query, category, dateFrom, dateTo, city, localId);
            console.log("dishes:", data.items);
            setDishes(data.items || []);
            setLoading(false);
        };
        fetchDishes();
    }, [query, category, dateFrom, dateTo, city, localId]);


    if (loading) {
        return <Loader />;
    }


    return (
        <div id="ListadoPlatos">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Listado de Platos
                </h2>

                <BusquedaPlatos
                    q={query}
                    setQ={setQuery}
                    category={category}
                    setCategory={setCategory}
                    dateFrom={dateFrom}
                    setDateFrom={setDateFrom}
                    dateTo={dateTo}
                    setDateTo={setDateTo}
                    city={city}
                    setCity={setCity}
                    localId={localId}
                    setLocalId={setLocalId}
                />

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {dishes.map((dish) => (
                        <Link key={dish.id} href={`/VerPlato/${dish.id}`}>
                            <PlatoCard dish={dish} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListadoPlatos;