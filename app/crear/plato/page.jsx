'use client';
import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { postPlato } from '../../../api/api';


const AltaLocales = () => {

const [name, setName] = useState('');
const [type, setType] = useState('');
const [priceRange, setPriceRange] = useState('');
const [city, setCity] = useState('');
const [zone, setZone] = useState('');
const [address, setAddress] = useState('');
const [hours, setHours] = useState('');
const [photo, setPhoto] = useState('');
const [photos, setPhotos] = useState([]);

const handleClick = async (e) => {
  e.preventDefault();
  setPhotos([...photos, photo]);
  setPhoto('');
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await postLocal(name, type, priceRange, city, zone, address, hours, photos);
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
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Alta de locales</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Ingresa un local</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
             Name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
              Type
            </label>
            <div className="mt-2.5">
               <select
                id="type"
                name="type"
                type="text"
                placeholder="Type of local"
                onChange={(e) => setType(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
                <option value="">All</option>
                <option value="RESTAURANTE">Restaurant</option>
                <option value="BAR">Bar</option>
                <option value="FOOD_TRUCK">Food Truck</option>
                <option value="CAFETERIA">Cafe</option>
                <option value="OTROS">Others</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">
              Price Range
            </label>
            <div className="mt-2.5">
               <select
                id="priceRange"
                name="priceRange"
                type="text"
                placeholder="Price Range"
                onChange={(e) => setPriceRange(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >
                <option value="">All</option>
                <option value="ECONOMICO">Economic</option>
                <option value="MEDIO">Medium</option>
                <option value="ALTO">High</option>
              </select>
            </div>
          </div>
          <div >
            <label htmlFor="city" className="block text-sm/6 font-semibold text-gray-900">
              City
            </label>
            <div className="mt-2.5">
              <input
                id="city"
                name="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div >
            <label htmlFor="zone" className="block text-sm/6 font-semibold text-gray-900">
              Zone
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                </div>
                <input
                  id="zone"
                  name="zone"
                  type="text"
                  onChange={(e) => setZone(e.target.value)}
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div >
            <label htmlFor="address" className="block text-sm/6 font-semibold text-gray-900">
              Address
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                </div>
                <input
                  id="address"
                  name="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div >
            <label htmlFor="hours" className="block text-sm/6 font-semibold text-gray-900">
              Hours
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                </div>
                <input
                  id="hours"
                  name="hours"
                  type="text"
                  onChange={(e) => setHours(e.target.value)}
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div >
            <label htmlFor="photo" className="block text-sm/6 font-semibold text-gray-900">
              Photos
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                </div>
                <input
                  id="photo"
                  name="photo"
                  type='text'
                  onChange={(e) => setPhoto(e.target.value)}
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                defaultValue={''}
                />
              </div>
            </div>
            <button 
            onClick={handleClick}
            className="mt-2.5 inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Upload Photo
            </button>
          </div>


        </div>
        
          {photos.map((photo) => <p key={photo}>{photo}</p>)}
        <div className="mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create local
          </button>
        </div>
      </form>
    </div>
  );
};

export default AltaLocales;