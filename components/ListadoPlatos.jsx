'use client';

import { useEffect, useState } from "react";
import { getDishes } from "../api/api";
import BusquedaPlatos from "./BusquedaPlatos";
import PlatoCard from "./PlatoCard";
import Link from "next/link";

const ListadoPlatos = () => {
    const [dishes, setDishes] = useState([]);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [city, setCity] = useState("");
    const [localId, setLocalId] = useState("");

    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getDishes(query, category, dateFrom, dateTo, city, localId);
            console.log("dishes:", data.items);
            setDishes(data.items || []);
        };
        fetchDishes();
    }, [query, category, dateFrom, dateTo, city, localId]);

    return (
        <div className="bg-white" id="ListadoPlatos">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Listado de Platos
                </h2>

                <BusquedaPlatos
                    setQ={setQuery}
                    setCategory={setCategory}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                    setCity={setCity}
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