import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import firebase from '../../firebase'; // Import Firebase
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'; // Import storage functions
import 'firebase/functions'; // Import the functions module from Firebase

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state ? location.state.id : ''; // Update this line
    const [userData, setUserData] = useState(null);
    const [files, setFiles] = useState([]);
    const [clickCounts, setClickCounts] = useState({}); // New state variable for click counts
    
    useEffect(() => {
        if (userId) {
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

            const storageRef = ref(getStorage(), `images/${userId}`);

            listAll(storageRef)
                .then((res) => {
                    const promises = res.items.map((item) => getDownloadURL(item));
                    Promise.all(promises)
                        .then((urls) => {
                            setFiles(urls.map((url, index) => ({ url, name: res.items[index].name })));
                            
                            // Retrieve click counts from Firestore
                            const clickCountsRef = firebase.firestore().collection("ClickCounts").doc(userId);
                            clickCountsRef.get().then((doc) => {
                                if (doc.exists) {
                                    setClickCounts(doc.data());
                                } else {
                                    // If click counts document doesn't exist, initialize it
                                    const initialClickCounts = {};
                                    urls.forEach(url => {
                                        initialClickCounts[url] = 0;
                                    });
                                    clickCountsRef.set(initialClickCounts);
                                    setClickCounts(initialClickCounts);
                                }
                            });
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
                // Update click counts in state and Firestore
                const updatedClickCounts = { ...clickCounts };
                updatedClickCounts[url] = (updatedClickCounts[url] || 0) + 1;
                setClickCounts(updatedClickCounts);
                firebase.firestore().collection("ClickCounts").doc(userId).set(updatedClickCounts);

                // Increment access count in Firestore analytics collection
                const analyticsRef = firebase.firestore().collection("analytics").doc(url);
                analyticsRef.get()
                    .then((doc) => {
                        if (doc.exists) {
                            analyticsRef.update({ count: firebase.firestore.FieldValue.increment(1) });
                        } else {
                            analyticsRef.set({ count: 1 });
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating access count:', error);
                    });
            })
            .catch((error) => {
                console.error('Error copying link:', error);
            });
    }

    function handleSubmit() {
        navigate("/", { state: { id: userId, userData } });
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
                                <th style={{ border: '1px solid white', color: 'white' }}>Stats</th> {/* New column header */}
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr key={index} >
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{file.name}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        <button onClick={() => copyLink(file.url)}>Copy Link</button>
                                    </td>
                                    <td style={{ border: '1px solid black' }}>{userData.views}</td> {/* Display click count for each file */}
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
