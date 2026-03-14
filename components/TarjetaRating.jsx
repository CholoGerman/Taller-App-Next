import styled from 'styled-components';

const TarjetaRating = styled.div`
  width: 100%;
  max-width: 24rem;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  z-index: 0;

  /* Pseudo-elemento con el patrón y un overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    --s: 105px; /* tamaño del patrón */
    --c1: #b9b9b9;
    --c2: #dcdcdc;
    --c3: #fafafa;

    /* Patrón de triángulos */
    background: 
      conic-gradient(
        from 75deg,
        var(--c1) 15deg,
        var(--c2) 0 30deg,
        #0000 0 180deg,
        var(--c2) 0 195deg,
        var(--c1) 0 210deg,
        #0000 0
      )
      calc(0.5 * var(--s)) calc(0.5 * var(--s) / 0.577),
      conic-gradient(
        var(--c1) 30deg,
        var(--c3) 0 75deg,
        var(--c1) 0 90deg,
        var(--c2) 0 105deg,
        var(--c3) 0 150deg,
        var(--c2) 0 180deg,
        var(--c3) 0 210deg,
        var(--c1) 0 256deg,
        var(--c2) 0 270deg,
        var(--c1) 0 286deg,
        var(--c2) 0 331deg,
        var(--c3) 0
      );
    background-size: var(--s) calc(var(--s) / 0.577);
    
    /* Overlay blanco semitransparente (ajusta la opacidad a tu gusto) */
    background-color: rgba(255, 255, 255, 0.6);
    background-blend-mode: overlay; /* Prueba también 'soft-light', 'multiply', etc. */
  }

  /* El contenido queda por encima */
  & > * {
    position: relative;
    z-index: 1;
  }
`;

export default TarjetaRating;