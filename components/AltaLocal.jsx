'use client';

import { useState, useEffect } from 'react';
import { postLocal } from '../api/api';
import { useRouter } from "next/navigation";
import styled from 'styled-components';

const StoreIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z" />
  </svg>
);

const TagIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
  </svg>
);

const PriceIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M11.5 17.1c-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79z" />
  </svg>
);

const CityIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const ZoneIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const AddressIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const HoursIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z" />
  </svg>
);

const PhotoIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
);

const AltaLocal = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
      const t = localStorage.getItem("token");
      setToken(t);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleClick = (e) => {
    e.preventDefault();
    if (photo.trim() === "") return;
    setPhotos([...photos, photo]);
    setPhoto("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!name || !type || !priceRange || !city || !zone || !address || !hours) {
      setMessage("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      await postLocal(name, type, priceRange, city, zone, address, hours, photos);
      setMessage("Local creado con éxito");
      // Reiniciar formulario
      setName("");
      setType("");
      setPriceRange("");
      setCity("");
      setZone("");
      setAddress("");
      setHours("");
      setPhoto("");
      setPhotos([]);
    } catch (error) {
      setMessage("Error al crear el local");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="page-container">
        <form className="form" onSubmit={handleSubmit}>
          <p id="heading">Alta de Local</p>

          <div className="field-group">
            <label>Nombre del local</label>
            <div className="field">
              <StoreIcon />
              <input
                type="text"
                placeholder="Ej: La Tapería"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Tipo</label>
            <div className="field">
              <TagIcon />
              <select
                className="input-field"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="" disabled>Selecciona un tipo</option>
                <option value="BAR">Bar</option>
                <option value="RESTAURANTE">Restaurante</option>
                <option value="CAFETERIA">Cafetería</option>
                <option value="FOOD_TRUCK">Food Truck</option>
                <option value="OTROS">Otros</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <label>Rango de precio</label>
            <div className="field">
              <PriceIcon />
              <select
                className="input-field"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                required
              >
                <option value="" disabled>Selecciona un rango</option>
                <option value="ECONOMICO">Económico</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <label>Ciudad</label>
            <div className="field">
              <CityIcon />
              <input
                type="text"
                placeholder="Ciudad"
                className="input-field"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Zona</label>
            <div className="field">
              <ZoneIcon />
              <input
                type="text"
                placeholder="Zona"
                className="input-field"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Dirección</label>
            <div className="field">
              <AddressIcon />
              <input
                type="text"
                placeholder="Dirección"
                className="input-field"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Horarios</label>
            <div className="field">
              <HoursIcon />
              <input
                type="text"
                placeholder="Ej: Lunes a Viernes 9-18hs"
                className="input-field"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Agregar foto (URL)</label>
            <div className="field">
              <PhotoIcon />
              <input
                type="text"
                placeholder="https://ejemplo.com/foto.jpg"
                className="input-field"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="button-add"
              onClick={handleClick}
              disabled={!photo.trim()}
            >
              + Añadir foto
            </button>
          </div>

          {photos.length > 0 && (
            <div className="photos-list">
              <p className="photos-label">Fotos añadidas:</p>
              <ul>
                {photos.map((url, index) => (
                  <li key={index} className="photo-item">
                    <span>{url}</span>
                    <button
                      type="button"
                      className="photo-remove"
                      onClick={() => {
                        const newPhotos = photos.filter((_, i) => i !== index);
                        setPhotos(newPhotos);
                      }}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="btn">
            <button type="submit" className="button1" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Local'}
            </button>
          </div>

          {message && <p className="mensaje-error">{message}</p>}
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .page-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 2.5rem 3rem;
    background-color: #171717;
    border-radius: 30px;
    transition: 0.4s ease-in-out;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  .form:hover {
    transform: scale(1.02);
    border: 1px solid #333;
  }

  #heading {
    text-align: center;
    margin: 0 0 1rem 0;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .field-group label {
    color: #bbb;
    font-size: 0.85rem;
    font-weight: 500;
    margin-left: 0.5rem;
  }

  .field {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    border-radius: 40px;
    padding: 0.7rem 1.2rem;
    background-color: #171717;
    box-shadow: inset 3px 5px 12px #0a0a0a, inset -2px -2px 5px #2a2a2a;
    border: none;
    transition: box-shadow 0.2s;
  }

  .field:focus-within {
    box-shadow: inset 3px 5px 12px #0a0a0a, inset -2px -2px 5px #3a3a3a;
  }

  .input-icon {
    height: 1.3rem;
    width: 1.3rem;
    fill: #aaa;
    flex-shrink: 0;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #f0f0f0;
    font-size: 1rem;
    padding: 0.2rem 0;
  }

  .input-field::placeholder {
    color: #666;
    font-size: 0.9rem;
  }

  select.input-field {
    appearance: none;
    background: transparent;
  }

  select.input-field option {
    background: #222;
    color: #f0f0f0;
  }

  .button-add {
    background: #2a2a2a;
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 40px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    align-self: flex-start;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    margin-top: 0.2rem;
  }

  .button-add:hover:not(:disabled) {
    background: #3a3a3a;
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
  }

  .button-add:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .photos-list {
    background: #1e1e1e;
    border-radius: 20px;
    padding: 1rem;
    margin-top: 0.5rem;
  }

  .photos-label {
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .photos-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .photo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2a2a2a;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    color: #ddd;
    font-size: 0.85rem;
    word-break: break-all;
  }

  .photo-remove {
    background: none;
    border: none;
    color: #ff6b6b;
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
    padding: 0 0.3rem;
    transition: color 0.2s;
  }

  .photo-remove:hover {
    color: #ff4444;
  }

  .btn {
    display: flex;
    justify-content: center;
    margin-top: 1.8rem;
  }

  .button1 {
    padding: 0.7rem 2rem;
    border-radius: 40px;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
    color: white;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }

  .button1:hover:not(:disabled) {
    background: linear-gradient(145deg, #1f1f1f, #0f0f0f);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
  }

  .button1:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .mensaje-error {
    color:rgb(107, 255, 107);
    text-align: center;
    margin-top: 0.8rem;
    font-size: 0.95rem;
    background: rgba(255, 107, 107, 0.1);
    padding: 0.5rem;
    border-radius: 20px;
  }
`;

export default AltaLocal;