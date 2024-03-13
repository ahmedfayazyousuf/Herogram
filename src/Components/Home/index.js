import { NavLink } from 'react-router-dom';
import React from 'react';

const Home = () => {

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "90vh", justifyContent: "center", alignItems: "center", flexWrap: 'wrap', textAlign: 'center', background: 'black' }}>
        <h1 style={{ color: 'white', fontSize: '25px', marginTop: '60px' }}>Herogram Test App</h1>

        <NavLink to="/Login" style={{textDecoration: 'none'}}>
            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                <button id="buttontext" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', height: '30px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '16px', color: '#1E1450', border: '1px solid transparent', cursor: 'grab'}}>Sign in</button>
            </div>
        </NavLink>

        <NavLink to="/Registration" style={{textDecoration: 'none', marginTop: '10px'}}>
            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                <button id="buttontext" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', height: '30px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '16px', color: '#1E1450', border: '1px solid transparent', cursor: 'grab'}}>Sign up</button>
            </div>
        </NavLink>

    </div>
  )
}

export default Home;