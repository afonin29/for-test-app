import React, { createElement, useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Avatar } from '@mui/material';
import { saveTask, loadTasks } from '../posts';
import { query, collection, getDocs, limit, orderBy, getFirestore, onSnapshot } from 'firebase/firestore';
import '../App.css';

const Posts = () => {

    loadTasks();
    
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");

    function sendTask() {
        saveTask(task, date);
        setTask("");
        setDate("");
    }

    
    // async function loadTasks() {
    //     const q = query(collection(getFirestore(), 'tasks'), orderBy('timestamp', 'desc'), limit(12));
    //     var array = [];
    //     onSnapshot(q, function(snap) {
    //         snap.docChanges().forEach(function(change) {
    //             var data = change.doc.data()
    //             createTask(data.text, data.deadline)
    //         })
    //     })
    // }

    // function createTask(task, deadline) {
    //     let root = document.getElementById("chat-area")
    //     let container = document.createElement("Grid")
    //     container.className = "task-container"

    //     let newTask = document.createElement("div");
    //     newTask.innerHTML = task;
    //     container.appendChild(newTask);

    //     let newDeadline = document.createElement("div");
    //     newDeadline.innerHTML = "Deadline: " + deadline;
    //     container.appendChild(newDeadline);

    //     root.appendChild(container)
    // }

    return (
        <Container>
            <Grid container justify={"center"} style={{ height: window.innerHeight - 70, marginTop: 10, border: "1px solid grey" }}>
                <div id="chat-area" style={{ height: "90%", width: "100%", border: '1px solid gray', overflowY: 'auto' }}>
                    
                </div>
                <Grid container direction={"row"} justifyContent={"space-around"} >
                    <TextField label="What" variant={"outlined"} style={{ width: "30%" }} onChange={(e) => setTask(e.target.value)}></TextField>
                    <TextField label="When" variant={"outlined"} style={{ width: "30%" }} onChange={(e) => setDate(e.target.value)}></TextField>
                    <Button variant={"contained"} style={{ color: "white", height: "70%", padding: "0 3%" }} onClick={sendTask}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Posts;