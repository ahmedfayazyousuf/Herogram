import React, { useState, useEffect } from 'react';
import firebase from '../../firebase'; // Import Firebase

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from Firestore sorted by timestamp in descending order
        const unsubscribe = firebase.firestore().collection('Users').orderBy('time', 'desc').onSnapshot(snapshot => {
            const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(userData);
        });

        return () => unsubscribe();
    }, []);

    const increaseViewCount = (userId) => {
        firebase.firestore().collection('Users').doc(userId).update({
            views: firebase.firestore.FieldValue.increment(1)
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "90vh", justifyContent: "center", alignItems: "center", flexWrap: 'wrap', textAlign: 'center', background: 'black' }}>

            {/* Table to display user data */}
            <table style={{ width: '80%', marginTop: '20px', color: 'white' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.Name}</td>
                            <td>{user.views}</td>
                            <td>
                                <button onClick={() => increaseViewCount(user.id)}>Increase View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Admin;
