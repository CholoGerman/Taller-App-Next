'use client';

import { useEffect, useState } from "react";
import { getDishes } from "../api/api";
import Link from "next/link";



const ListadoPlatos = () => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("user"));
        setUser(u);
        const t = localStorage.getItem("token");
        setToken(t);
    }, []);

    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getDishes();
            console.log("dishes:", data.items);
            setDishes(data.items);
        };
        fetchDishes();
    }, []);

    return (
        <div className="bg-white" id="ListadoPlatos">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Listado de Platos
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {dishes.map((dish) => (
                        <div key={dish.id} className="group relative">
                            <img
                                src={dish.photos?.[0] || "https://via.placeholder.com/300"}
                                alt={dish.name}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={`/platos/${dish.id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            {dish.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{dish.category}</p>
                                    <p className="mt-1 text-sm text-gray-500">{dish.city}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">${dish.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListadoPlatos;