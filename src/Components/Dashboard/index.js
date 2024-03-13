import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firebase from '../../firebase'; // Import Firebase
import { getStorage, ref, uploadBytes } from 'firebase/storage'; // Import storage functions

const Dashboard = () =>{
    const location = useLocation();
    // eslint-disable-next-line
    const navigate = useNavigate();
    const userId = location.state.id;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const Users = firebase.firestore().collection("Users");

        Users.doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
            const user = doc.data();
            setUserData(user);
            } else {
            console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [userId]);

    function uploadImage(event){
        const file = event.target.files[0];
        const storageRef = ref(getStorage(), `images/${file.name}`);

        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a file:', snapshot);
        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
    }

    function handleSubmit(){
        // navigate("/Video1", { state: { id: userId, userData } });
        console.log(userData);
    }

    return(
        <div style={{display:"flex", flexDirection:"column", width:"100%", height: "100vh", justifyContent:"center", alignItems: 'center', background: 'black'}}>

            <div style={{display: 'flex', flexDirection: 'column', width: '40%', gap:'5px', alignItems: 'center', justifyContent:'center', height: '100vh'}}>
                

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80vw', marginTop: '0px', marginBottom: '10px'}}>
                    {userData && <p style={{color: 'white', fontSize: '20px', fontWeight: '900'}}>Welcome, {userData.Name}!</p>}
                </div>  

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80vw', marginTop: '-20px'}}>
                    <input type="file" onChange={uploadImage} style={{display: 'flex', height: '100px', width: '400px', background: 'grey', borderRadius: '20px'}} />
                    <p style={{color: 'white'}}>Click or Drag Image to Upload.</p>
                </div>

                <button onClick={handleSubmit} style={{width:"220px", marginTop: '25px', marginBottom: '40px', borderRadius: '10px', padding: '10px', backgroundColor: 'white', color: 'black', cursor: 'grab'}} >
                    Next
                </button>

            </div>
        </div>
    )
}

export default Dashboard
