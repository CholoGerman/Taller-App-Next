'use client';

import { useState, useEffect } from 'react';
import { postDish, getLocals } from '../api/api';
import Button from './Button';

const AltaPlato = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [localId, setLocalId] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [locals, setLocals] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLocals = async () => {
            const data = await getLocals();
            setLocals(data.items || []);
        };
        fetchLocals();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await postDish({
        name,
        category,
        localId: parseInt(localId),
        city,
        price: parseFloat(price),
        description
    });

    if (result.error) {
        console.log(result.error);
        return;
    }

    console.log("Plato creado exitosamente");
// Reiniciar el formulario
    setName("");
    setCategory("");
    setLocalId("");
    setCity("");
    setPrice("");
    setDescription("");
};

    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
                />
            </div>

            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Alta de Platos</h2>
                <p className="mt-2 text-lg/8 text-gray-600">Registra un nuevo plato en tu local</p>
            </div>

            {message && (
                <div className={`mt-4 text-center ${message.includes('éxito') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                            Nombre del plato
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="category" className="block text-sm/6 font-semibold text-gray-900">
                            Categoría
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="entrada">Entrada</option>
                            <option value="principal">Principal</option>
                            <option value="postre">Postre</option>
                            <option value="bebida">Bebida</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="localId" className="block text-sm/6 font-semibold text-gray-900">
                            Local
                        </label>
                        <select
                            id="localId"
                            value={localId}
                            onChange={(e) => setLocalId(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        >
                            <option value="">Selecciona un local</option>
                            {locals.map((local) => (
                                <option key={local.id} value={local.id}>
                                    {local.name} - {local.city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm/6 font-semibold text-gray-900">
                            Ciudad
                        </label>
                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="price" className="block text-sm/6 font-semibold text-gray-900">
                            Precio ($)
                        </label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm/6 font-semibold text-gray-900">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-2 block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button 
                onClick={handleSubmit}
                type="submit"
            >
                Crear Plato
            </Button>
                </div>
            </form>
        </div>
    );
};

export default AltaPlato;