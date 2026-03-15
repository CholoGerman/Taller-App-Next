'use client';

import { useState, useEffect } from 'react';
import { postDish, getLocals } from '../api/api';
import { useRouter } from "next/navigation";
import styled from 'styled-components';

const UserIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const TagIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
  </svg>
);

const StoreIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5zM6 18v-4h6v4H6z" />
  </svg>
);

const MapIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const CurrencyIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M11.5 17.1c-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79z" />
  </svg>
);

const DescriptionIcon = () => (
  <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0 4h8v2H8v-2zm0-8h8v2H8v-2z" />
  </svg>
);

const AltaPlato = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [localId, setLocalId] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const [locals, setLocals] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchLocals = async () => {
      const data = await getLocals();
      setLocals(data.items || []);
    };
    fetchLocals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!name || !category || !localId || !city || !price || !description) {
      setMessage('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    try {
      const result = await postDish({
        name,
        category,
        localId: parseInt(localId),
        city,
        price: parseFloat(price),
        description
      });

      if (result.error) {
        setMessage(result.error);
        return;
      }

      setMessage('Plato creado con éxito');
      // Reiniciar el formulario
      setName('');
      setCategory('');
      setLocalId('');
      setCity('');
      setPrice('');
      setDescription('');
    } catch (err) {
      setMessage('Error al crear el plato');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="page-container">
        <form className="form" onSubmit={handleSubmit}>
          <p id="heading">Alta de Plato</p>

          <div className="field-group">
            <label>Nombre del plato</label>
            <div className="field">
              <UserIcon />
              <input
                type="text"
                placeholder="Ej: Pizza Margherita"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Categoría</label>
            <div className="field">
              <TagIcon />
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option value="entrada">Entrada</option>
                <option value="principal">Principal</option>
                <option value="postre">Postre</option>
                <option value="bebida">Bebida</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <label>Local</label>
            <div className="field">
              <StoreIcon />
              <select
                className="input-field"
                value={localId}
                onChange={(e) => setLocalId(e.target.value)}
                required
              >
                <option value="" disabled>Selecciona un local</option>
                {locals.map((local) => (
                  <option key={local.id} value={local.id}>
                    {local.name} - {local.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <label>Ciudad</label>
            <div className="field">
              <MapIcon />
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
            <label>Precio ($)</label>
            <div className="field">
              <CurrencyIcon />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="input-field"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field-group">
            <label>Descripción</label>
            <div className="field">
              <DescriptionIcon />
              <textarea
                rows="4"
                placeholder="Describe el plato..."
                className="input-field"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="btn">
            <button type="submit" className="button1" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Plato'}
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
    padding: 3rem 3rem;
    background-color: #171717;
    border-radius: 30px;
    transition: 0.4s ease-in-out;
    width: 100%;
    height: 900px;
    max-width: 600px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.6);
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

  /* Estilos para select y textarea */
  select.input-field {
    appearance: none;
    background: transparent;
  }

  select.input-field option {
    background: #222;
    color: #f0f0f0;
  }

  textarea.input-field {
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
  }

  .btn {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    margin-top: 1.8rem;
  }

  .button1, .button2 {
    padding: 0.7rem 2rem;
    border-radius: 40px;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #252525;
    color: white;
    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
  }

  .button1 {
    background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
  }

  .button1:hover:not(:disabled) {
    background: linear-gradient(145deg, #1f1f1f, #0f0f0f);
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.5);
  }

  .button1:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button2 {
    background: #2a2a2a;
  }

  .button2:hover {
    background: #3a3a3a;
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.5);
  }

  .mensaje-error {
    color: #ff6b6b;
    text-align: center;
    margin-top: 0.8rem;
    font-size: 0.95rem;
    background: rgba(255, 107, 107, 0.1);
    padding: 0.5rem;
    border-radius: 20px;
  }
`;

export default AltaPlato;