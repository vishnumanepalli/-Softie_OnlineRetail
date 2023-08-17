import React from 'react';
import Img2 from '../images/image.jpg';

const Home = () => {
  return (
    <div style={{ display: 'flex',backgroundColor:'white' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '48px', fontFamily: 'Lucida Sans Typewriter' }}>We bring the <span style={{ color: 'red' }}>Store</span><br/>to your <span style={{ color: 'red' }}>Door</span></h1>


        <p style={{ fontSize: '18px', fontFamily: 'Lucida Sans Typewriter' }}>Shop now from anywhere with best discounts.</p>
        <p style={{ fontSize: '28px', fontFamily: 'Lucida Sans Typewriter' }}> Find Latest Trends</p>
        <p style={{ fontSize: '28px', fontFamily: 'Lucida Sans Typewriter' }}>Fastest Delivery </p>
      </div>
      <div style={{ flex: 1, marginTop:'100px'}}>
        <img src={Img2} alt="your-image" style={{ width: '100%', height: '500px' }} />
      </div>
    </div>
  );
};

export default Home;
