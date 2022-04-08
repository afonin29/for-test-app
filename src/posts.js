import React from 'react'
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
    getDocs
} from 'firebase/firestore';
import { getProfilePicUrl, getUserName } from './auth'
import { Grid, Avatar } from '@mui/material';

export async function saveTask(taskText, taskDeadline) {
    // Add a new message entry to the Firebase database.
    try {
        await addDoc(collection(getFirestore(), 'tasks'), {
            name: getUserName(),
            text: taskText,
            deadline: taskDeadline,
            profilePicUrl: getProfilePicUrl(),
            timestamp: serverTimestamp()
        });
    }
    catch (error) {
        console.error('Error writing new message to Firebase Database', error);
    }
}


export async function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentTasksQuery = query(collection(getFirestore(), 'tasks'), orderBy('timestamp', 'desc'), limit(12));
    const querySnapshot = await getDocs(recentTasksQuery);
    const div = document.getElementById("chat-area")
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // displayMessage(doc.data().timestamp, doc.data().name, doc.data().text, doc.data().deadline, doc.data().profilePicUrl)
        console.log(doc.data())
    });
}

const pushToArray = () => {

}

function displayMessage(timestamp, name, text, deadline, picUrl) {
    return <div style={{ margin: 10, padding: 3, border: '1px solid grey' }}>
        <Grid container >
            <Avatar src={picUrl} />
            <div>{name}</div>
        </Grid>
        <div>Task: {text}</div>
        <div>Deadline: {deadline}</div>
        <div>Created: {timestamp}</div>
    </div>
}

// function deleteMessage() {

// }