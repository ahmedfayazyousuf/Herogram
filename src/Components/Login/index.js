import React from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase';

const Login = () => {
    const navigate = useNavigate();

    function VerifyUser() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zAZ]{2,}))$/;
    
        if (email === "" || !email.match(validRegex)) {
            document.getElementById('error').innerHTML = "PLEASE ENTER A VALID EMAIL";
            return;
        }

        if (password === "") {
            console.log('Hello');
            document.getElementById('error').innerHTML = "PLEASE ENTER YOUR PASSWORD";
            return;
        }

        firebase.firestore().collection('Users')
            .where('Email', '==', email)
            .where('Password', '==', password)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        // eslint-disable-next-line
                        const userData = doc.data();
                        navigate('/Dashboard', {state:{id:doc.id}});
                    });
                } else {
                    navigate('/Loser'); 
                }
            })
            .catch((error) => {
                console.error('Error verifying user:', error);
            });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "90vh", justifyContent: "center", alignItems: "center", flexWrap: 'wrap', textAlign: 'center', background: 'black' }}>
            <h1 style={{ color: 'white', fontSize: '25px', marginTop: '60px' }}>Login</h1>

            <div style={{ width: "80%", maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <input className='specialFont' type="email" placeholder='EMAIL' id='email' style={{ opacity: '0.6', background: "white", border: "1px solid transparent", textAlign: 'center', marginBottom: '15px', width: "100%", maxWidth: '700px', height: '30px', color: "black", paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'white', borderRadius: '120px', fontSize: '16px' }} />
            </div>

            <div style={{ width: "80%", maxWidth: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <input className='specialFont' type="password" placeholder='PASSWORD' id='password' style={{ opacity: '0.6', background: "white", border: "1px solid transparent", textAlign: 'center', marginBottom: '15px', width: "100%", maxWidth: '700px', height: '30px', color: "black", paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'white', borderRadius: '120px', fontSize: '16px' }} />
            </div>

            <div style={{height: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginBottom: '5px'}}>
                <p id='error' style={{color:"red", fontSize: '10px'}}></p>
            </div>

            <div style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                <button onClick={VerifyUser} id="buttontext" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', height: '30px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '16px', color: '#1E1450', border: '1px solid transparent', cursor: 'grab' }}>Sign in</button>
            </div>
        </div>
    );
}

export default Login;
