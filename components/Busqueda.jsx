'use client';
import { useState } from 'react';
import Input from './input';
import Select from './Select';

const Busqueda = ({
  setQuery,
  setType,
  setPriceRange,
  setRating,
  setCity,
  setZone
}) => {
  // Estados locales para controlar los inputs
  const [localQuery, setLocalQuery] = useState('');
  const [localType, setLocalType] = useState('');
  const [localPriceRange, setLocalPriceRange] = useState('');
  const [localRating, setLocalRating] = useState('');
  const [localCity, setLocalCity] = useState('');
  const [localZone, setLocalZone] = useState('');

  // Funciones que actualizan estado local y notifican al padre
  const handleQueryChange = (e) => {
    setLocalQuery(e.target.value);
    setQuery(e.target.value);
  };
  const handleTypeChange = (e) => {
    setLocalType(e.target.value);
    setType(e.target.value);
  };
  const handlePriceRangeChange = (e) => {
    setLocalPriceRange(e.target.value);
    setPriceRange(e.target.value);
  };
  const handleRatingChange = (e) => {
    setLocalRating(e.target.value);
    setRating(e.target.value);
  };
  const handleCityChange = (e) => {
    setLocalCity(e.target.value);
    setCity(e.target.value);
  };
  const handleZoneChange = (e) => {
    setLocalZone(e.target.value);
    setZone(e.target.value);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/70 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Filtrar locales
      </h3>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <Input
          label="Nombre del local"
          name="query"
          type="text"
          value={localQuery}
          onChange={handleQueryChange}
        />

        <Select
          name="type"
          value={localType}
          onChange={handleTypeChange}
        >
          <option value="">Todos los tipos</option>
          <option value="RESTAURANTE">Restaurante</option>
          <option value="BAR">Bar</option>
          <option value="FOOD_TRUCK">Food Truck</option>
          <option value="CAFETERIA">Cafetería</option>
          <option value="OTROS">Otros</option>
        </Select>

        <Select
          name="priceRange"
          value={localPriceRange}
          onChange={handlePriceRangeChange}
        >
          <option value="">Todos los precios</option>
          <option value="ECONOMICO">Económico</option>
          <option value="MEDIO">Medio</option>
          <option value="ALTO">Alto</option>
        </Select>

        <Input
          label="Calificación (1-5)"
          name="rating"
          type="text"
          value={localRating}
          onChange={handleRatingChange}
        />

        <Input
          label="Ciudad"
          name="city"
          type="text"
          value={localCity}
          onChange={handleCityChange}
        />

        <Input
          label="Zona"
          name="zone"
          type="text"
          value={localZone}
          onChange={handleZoneChange}
        />
      </div>
    </div>
  );
};

export default Busqueda;