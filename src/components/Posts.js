import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Avatar } from '@mui/material';
import { saveTask, loadMessages } from '../posts';
import {useCollectionData} from "react-firebase-hooks/firestore";

const Posts = () => {

    const [task, setTask] = useState("");
    const [date, setDate] = useState("");

    function sendTask() {
        saveTask(task, date);
        setTask("");
        setDate("");
    }
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )


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