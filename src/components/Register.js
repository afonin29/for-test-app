import React from 'react';
import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { FormControl, Grid, TextField, Button } from '@mui/material';
import { Redirect } from 'react-router-dom'
import { PROFILE_PATH } from '../utils/constants';
import { signUpWithEmailAndPassword } from '../auth';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signUp() {
        signUpWithEmailAndPassword(email, password);
    }


    return (
        <Grid container justifyContent="center" alignItems="center" p={2} spacing={2} sx={{ flexDirection: 'column' }}>
            <FormControl>
                <TextField id="email-info" label="Email" variant="outlined" sx={{ m: 1 }} onChange={(e) => setEmail(e.target.value)} />
                <TextField id="password-info" label="Password" variant="outlined" sx={{ m: 1 }} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" sx={{ m: 1 }} onClick={ signUp }>Register</Button>
            </FormControl>
        </Grid>
    );
};

export default Register;