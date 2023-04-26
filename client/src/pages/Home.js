import React from 'react';
import Img2 from '../images/img12.jpg';

const Home = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '48px', fontFamily: 'Lucida Sans Typewriter' }}>We bring the <span style={{ color: 'red' }}>Store</span><br/>to your <span style={{ color: 'red' }}>Door</span></h1>


        <p style={{ fontSize: '18px', fontFamily: 'Lucida Sans Typewriter' }}>Shop now from anywhere with best discounts.</p>
        <p style={{ fontSize: '28px', fontFamily: 'Lucida Sans Typewriter' }}>Fresh Grocery </p>
        <p style={{ fontSize: '28px', fontFamily: 'Lucida Sans Typewriter' }}>Fastest Delivery </p>
      </div>
      <div style={{ flex: 1, marginTop:'60px'}}>
        <img src={Img2} alt="your-image" style={{ width: '100%', height: '530px' }} />
      </div>
    </div>
  );
};

export default Home;