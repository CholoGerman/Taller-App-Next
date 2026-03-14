'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDish } from "../api/api";
import { CloudArrowUpIcon, ServerIcon, CurrencyDollarIcon, TagIcon } from '@heroicons/react/20/solid';
import { Rating } from "@material-tailwind/react";
import Link from "next/link";
import PlatoRating from "../components/PlatoRating";

const DetallesPlato = () => {
    const [dish, setDish] = useState({});
    const [refresh, setRefresh] = useState(false);
    const params = useParams();

    const features = [
        {
            name: 'Ciudad',
            description: dish.city,
            icon: CloudArrowUpIcon,
        },
        {
            name: 'Categoría',
            description: dish.category,
            icon: TagIcon,
        },
        {
            name: 'Precio',
            description: dish.price ? `$${dish.price}` : '',
            icon: CurrencyDollarIcon,
        },
        {
            name: 'Local',
            description: dish.local?.name,
            icon: ServerIcon,
            link: dish.localId ? `/VerLocal/${dish.localId}` : null,
        },
    ];

    useEffect(() => {
        const fetchDish = async () => {
            const data = await getDish(params.id);
            console.log(data);
            setDish(data.item);
        };
        fetchDish();
    }, [refresh]);

    return (
        <>
            <div className="overflow-hidden py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pt-4 lg:pr-8">
                            <div className="lg:max-w-lg">
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                    {dish.name}
                                </p>
                                <p className="mt-6 text-lg/8 text-gray-700">
                                    {dish.description}
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">
                                                {feature.link ? (
                                                    <Link href={feature.link} className="text-indigo-600 hover:underline">
                                                        {feature.description}
                                                    </Link>
                                                ) : (
                                                    feature.description
                                                )}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img
                            alt={dish.name}
                            src={dish.photos?.[0] || dish.photo || "https://via.placeholder.com/800x600?text=Plato"}
                            width={2432}
                            height={1442}
                            className="w-3xl rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
                        />
                    </div>
                </div>
            </div>

            {dish.reviews && dish.reviews.length > 0 && (
                <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Reseñas</h2>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {dish.reviews.map((review) => (
                            <li key={review.id}>
                                <div className="flex items-center gap-x-6">
                                    <img
                                        alt="Avatar"
                                        src={review.user?.avatar || "https://cdn-icons-png.flaticon.com/512/9131/9131478.png"}
                                        className="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5"
                                    />
                                    <div>
                                        <Rating value={review.rating} readonly />
                                        <p className="text-sm/6 font-semibold text-indigo-600">{review.comment}</p>
                                        <p className="text-xs text-gray-500">por {review.user?.name || 'Usuario'}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <PlatoRating id={dish.id} name={dish.name} setRefresh={setRefresh} />

            
        </>
    );
};

export default DetallesPlato;