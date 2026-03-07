import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PlatoCard = ({ dish }) => {
  const imageUrl = dish.photos?.[0] || "https://via.placeholder.com/300";

  return (
    <StyledWrapper>
      <div className="card">
    
          <div className="content">
            <div className="back">
              <div className="back-content">
                <svg width="800px" height="800px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M359.8 368.7c-83.5 37-150 103.4-187.1 186.9-5.6 12.6 0.1 27.3 12.7 32.9 3.3 1.5 6.7 2.2 10.1 2.2 9.6 0 18.7-5.5 22.8-14.8 32.1-72.2 89.5-129.6 161.7-161.6 12.6-5.6 18.3-20.3 12.7-32.9-5.5-12.6-20.3-18.3-32.9-12.7z m214.6-108.5c7.2-11.8 11.6-25.5 11.6-40.3 0-42.8-34.7-77.4-77.4-77.4-42.8 0-77.4 34.7-77.4 77.4 0 14.8 4.4 28.6 11.6 40.3-216.7 31.9-383.5 219-383.5 444.4v54.1c0 13.8 11.2 25 25 25H933c13.8 0 25-11.2 25-25v-54.1c-0.1-225.4-167-412.4-383.6-444.4zM908 733.7H109.2v-29.1c0-220.2 179.2-399.3 399.4-399.3S908 484.4 908 704.6v29.1z m24.9 100.2H84.2c-13.8 0-25 11.2-25 25s11.2 25 25 25h848.7c13.8 0 25-11.2 25-25s-11.2-25-25-25z" fill="#FCA128" /></svg>
                <strong>{dish.name}</strong>
              </div>
            </div>
            <div className="front">
              <div className="img" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>
            <div className="front-content">
              <small className="badge">{dish.category}</small>
              <div className="description">
                <div className="title">
                  <p className="title">
                    <strong>{dish.name}</strong>
                  </p>
                  <span>${dish.price}</span>
                </div>
                <p className="card-footer">
                  {dish.city} | {dish.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 240px;
    height: 320px;
    cursor: pointer;
  }
  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
  }
  .front, .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }
  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #ff9966, #ff9966, #ff9966, #ff9966, transparent);
    animation: rotation_481 5000ms infinite linear;
  }
  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    font-size: 1.1rem;
  }
  .back-content svg {
    width: 70px;
    height: 70px;
  }
  .card:hover .content {
    transform: rotateY(180deg);
  }
  @keyframes rotation_481 {
    0% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
  }
  .front {
    transform: rotateY(180deg);
    color: white;
  }
  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .front-content .badge {
    background-color: #00000055;
    padding: 4px 12px;
    border-radius: 15px;
    backdrop-filter: blur(2px);
    width: fit-content;
    font-size: 0.9rem;
  }
  .description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 12px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
  }
  .title {
    font-size: 14px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .title p {
    width: 50%;
  }
  .card-footer {
    color: #ffffff88;
    margin-top: 8px;
    font-size: 10px;
  }
  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #ffbb66;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
  }
  #bottom {
    background-color: #ff8866;
    left: 70px;
    top: 10px;
    width: 180px;
    height: 180px;
    animation-delay: -800ms;
  }
  #right {
    background-color: #ff2233;
    left: 180px;
    top: -100px;
    width: 40px;
    height: 40px;
    animation-delay: -1800ms;
  }
  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
    100% { transform: translateY(0px); }
  }
`;
export default PlatoCard;