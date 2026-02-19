// components/Filters.jsx
export default function Filters({
  q, setQ,
  type, setType,
  priceRange, setPriceRange,
  rating, setRating,
  city, setCity,
  zone, setZone,
  localId, setLocalId,       
  category, setCategory,    
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input
        type="search"
        placeholder="Buscar..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="border rounded p-2 flex-1"
      />

      <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded p-2">
        <option value="">Tipo</option>
        <option value="restaurante">Restaurante</option>
        <option value="cafeteria">Cafetería</option>
        <option value="bar">Bar</option>
        <option value="food_truck">Food truck</option>
        <option value="otros">Otros</option>
      </select>

      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="border rounded p-2">
        <option value="">Rango precio</option>
        <option value="economico">Económico</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>

      <select value={rating} onChange={(e) => setRating(e.target.value)} className="border rounded p-2">
        <option value="">Puntuación</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5</option>
      </select>

      <input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Ciudad" className="border rounded p-2" />

      <input value={zone} onChange={(e)=>setZone(e.target.value)} placeholder="Zona" className="border rounded p-2" />
    </div>
  );
}
