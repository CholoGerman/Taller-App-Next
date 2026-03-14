'use client';

import { useState , useEffect} from 'react';
import {postLocal} from '../api/api';
import { useRouter } from "next/navigation";
import Button from './Button';

const AltaLocal = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");


    const [name , setName] = useState("");
    const [type , setType] = useState("");
    const [priceRange , setPriceRange] = useState("");
    const [city , setCity] = useState("");
    const [zone , setZone] = useState("");
    const [address , setAddress] = useState("");
    const [hours , setHours] = useState("");
    const [photo , setPhoto] = useState("");
    const [photos , setPhotos] = useState([]);


    useEffect(() => {
        const u = localStorage.getItem("user");
        if(u){
        setUser(JSON.parse(u));
        const t = localStorage.getItem("token")
        setToken(t);
      }else{
        router.push("/");
      }
    },[])



    const handleClick = (e) => {
        e.preventDefault();
        setPhotos([...photos, photo]);
        setPhoto("");
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await postLocal(name,type,priceRange,city, zone, address , hours , photos); 
     
        // Reiniciar el formulario
        setName("");
        setType("");
        setPriceRange("");
        setCity("");
        setZone("");
        setAddress("");
        setHours("");
        setPhoto("");
        setPhotos([]);
    }

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
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Alta Locales</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Ingresa tu local!!</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-900">
              nombre
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm/6 font-semibold text-gray-900">
              city
            </label>
            <div className="mt-2.5">
              <input
                id="city"
                name="city"
                type="text"
                  onChange={(e) => setCity(e.target.value)}
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
           <div className="sm:col-span-2">
            <label htmlFor="zone" className="block text-sm/6 font-semibold text-gray-900">
              zone
            </label>
            <div className="mt-2.5">
              <input
                id="zone"
                name="zone"
                type="text"
                autoComplete="zone"
                onChange={(e) => setZone(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm/6 font-semibold text-gray-900">
              address
            </label>
            <div className="mt-2.5">
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="organization"
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="hours" className="block text-sm/6 font-semibold text-gray-900">
              Hours
            </label>
            <div className="mt-2.5">
              <input
                id="hours"
                name="hours"
                type="text"
                onChange={(e) => setHours(e.target.value)}
                autoComplete="hours"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
           <select
                id="type"
                name="type"
                type="text"
                placeholder="Type"
                onChange={(e) => setType(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
                <option value="">All</option>
                <option value="BAR">Bar</option>
                <option value="RESTAURANTE">Restaurant</option>
                <option value="CAFETERIA">Cafe</option>
                <option value="FOOD_TRUCK">Food Truck</option>
                <option value="OTROS">Others</option>
              </select>

 <select
                id="priceRange"
                name="priceRange"
                type="text"
                placeholder="Price Range"
                onChange={(e) => setPriceRange(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
                <option value="">All</option>
                <option value="ECONOMICO">Economic</option>
                <option value="MEDIO">Medium</option>
                <option value="ALTO">High</option>
              </select>
          <div className="sm:col-span-2">
            <label htmlFor="photo" className="block text-sm/6 font-semibold text-gray-900">
              Photo
            </label>
            <div className="mt-2.5">
              <input
                id="photo"
                name="photo"
                type="text"
                onChange={(e) => setPhoto(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                defaultValue={''}
              />
            </div>
          </div>
          <button
            onClick={handleClick}
            className="block  rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Photo
          </button>

        </div>
         {photos.map((photo) => <p key={photo}>{photo}</p> )}

        <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
                onClick={handleSubmit}
                type="submit"
            >
                Crear Local
            </Button>
        </div>
      </form>
    </div>
    );
}

export default AltaLocal;