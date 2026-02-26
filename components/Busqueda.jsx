const Busqueda = ({setQuery, setType, setPriceRange, setRating, setCity, setZone}) => {
    return (
         <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <input
                id="query"
                name="query"
                type="text"
                placeholder="Nombre del local"
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
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
              <input
                id="rating"
                name="rating"
                type="text"
                placeholder="Calificación"
                onChange={(e) => setRating(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              <input
                id="city"
                name="city"
                type="text"
                placeholder="Ciudad"
                onChange={(e) => setCity(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              <input
                id="zone"
                name="zone"
                type="text"
                placeholder="Zona"
                onChange={(e) => setZone(e.target.value)}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              </div>
    );
}

export default Busqueda;
