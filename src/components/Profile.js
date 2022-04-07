import React from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import '../App.css';
import { getProfilePicUrl, getUserName, getUserEmail, changeName } from '../auth';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

const Profile = () => {

    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();
    var userEmail = getUserEmail();

    const [name, setName] = useState(" ");
    const [active, setActive] = useState(false);

    const makeFieldsActive = () => {
        if (active) {
            changeName(name);
        }
        setActive(current => !current)
        console.log(getAuth().currentUser.displayName)
    }


    return (
        <Container>
            <Grid container>
                <Grid container md={4} justifyContent={"space-around"} alignItems={"center"} sx = {{flexDirection: "column"}} p={3}>
                    <img src={profilePicUrl} width={200} height={200}></img>
                    <Button variant="contained" style={{width: "30%"}} sx={{ m: 0.5 }}>Upload</Button>
                </Grid>
                <Grid container md={8} justifyContent={"space-around"}>
                    <Grid container >
                        <Grid container md={2} alignItems={"center"} justifyContent={"center"}>Name</Grid>
                        <Grid container md={10} alignItems={"center"}>
                            <TextField
                                disabled={!active}
                                id="user-name"
                                label="Name"
                                defaultValue={userName}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid container md={2} alignItems={"center"} justifyContent={"center"}>Email</Grid>
                        <Grid container md={10} alignItems={"center"}>
                            <TextField
                                disabled={!active}
                                id="user-email"
                                label="Email"
                                defaultValue={userEmail}
                            />
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid container md={2} alignItems={"center"} justifyContent={"center"}>Password</Grid>
                        <Grid container md={10} alignItems={"center"}>
                            <TextField
                                disabled
                                id="user-password"
                                label="Password"
                                defaultValue="************"
                            />
                        </Grid>
                        <Grid item md={4}>
                    <Button></Button>
                </Grid>
                <Grid container md={8} alignItems={"flex-start"}>
                    <Button variant="contained" onClick={makeFieldsActive}>{active ? "Save" : "Change"}</Button>
                </Grid>
                </Grid>
                </Grid>
                
            </Grid>
        </Container>
    );
};

export default Profile;