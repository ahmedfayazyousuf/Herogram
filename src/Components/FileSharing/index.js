import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firebase from '../../firebase'; // Import Firebase
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'; // Import storage functions

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state ? location.state.id : ''; // Update this line
    const [userData, setUserData] = useState(null); 
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (userId) { // Add this check
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

            const storageRef = ref(getStorage(), `images/`);
            listAll(storageRef)
                .then((res) => {
                    const promises = res.items.map((item) => getDownloadURL(item));
                    Promise.all(promises)
                        .then((urls) => {
                            setFiles(urls.map((url, index) => ({ url, name: res.items[index].name })));
                        })
                        .catch((error) => {
                            console.error('Error getting download URLs:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error listing files:', error);
                });
        }
    }, [userId]);

    function copyLink(url) {
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('Link copied to clipboard:', url);
            })
            .catch((error) => {
                console.error('Error copying link:', error);
            });
    }

    function handleSubmit() {
        navigate("/Video1", { state: { id: userId, userData } });
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "center", alignItems: 'center', background: 'black' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '40%', gap: '5px', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80vw', marginTop: '0px', marginBottom: '10px' }}>
                    {userData && <p style={{ color: 'white', fontSize: '20px', fontWeight: '900' }}>Welcome, {userData.Name}!</p>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80vw', marginTop: '-20px' }}>
                    <table style={{ background: 'white', borderCollapse: 'collapse', border: '1px solid black' }}>
                        <thead>
                            <tr style={{backgroundColor: 'black'}}>
                                <th style={{ border: '1px solid white', color: 'white'}}>File Name</th>
                                <th style={{ border: '1px solid white', color: 'white' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr key={index} >
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{file.name}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        <button onClick={() => copyLink(file.url)}>Copy Link</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={handleSubmit} style={{ width: "220px", marginTop: '25px', marginBottom: '40px', borderRadius: '10px', padding: '10px', backgroundColor: 'white', color: 'black', cursor: 'grab' }}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Dashboard;
