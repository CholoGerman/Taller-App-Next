'use client';
import { useState, useEffect } from "react";
import { getLocals } from "../api/api";
import { useRouter } from 'next/navigation';
import Busqueda from "./Busqueda";
import LocalCard from "./LocalCard";
import Loader from "./Loader";

const ListadoPrincipal = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [locals, setLocals] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [minRating, setMinRating] = useState("");
    const [maxRating, setMaxRating] = useState("");
    const [city, setCity] = useState("");
    const [zone, setZone] = useState("");

    useEffect(() => {
        const fetchLocals = async () => {
            setLoading(true);
            const data = await getLocals(query, type, priceRange, minRating, city, zone);
            let items = data.items;

            if (maxRating) {
                const max = parseFloat(maxRating);
                items = items.filter(local => local.ratingAverage <= max);
            }

            if (minRating) {
                const min = parseFloat(minRating);
                items = items.filter(local => local.ratingAverage >= min);
            }

            setLocals(items);
            setLoading(false);
        }
        fetchLocals();
    }, [query, type, priceRange, minRating, maxRating, city, zone]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" id="ListadoLocales">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Listado de Locales</h2>
            <Busqueda
                query={query}
                setQuery={setQuery}
                type={type}
                setType={setType}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                maxRating={maxRating}
                setMaxRating={setMaxRating}
                city={city}
                setCity={setCity}
                zone={zone}
                setZone={setZone}
            />
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {locals.map((local) => (
                    <LocalCard key={local.id} local={local} />
                ))}
            </div>
        </div>
    );
}

export default ListadoPrincipal;