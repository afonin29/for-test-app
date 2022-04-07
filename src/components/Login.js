import React from 'react';
import '../App.css'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { getAuth } from 'firebase/auth';
import { Link, FormControl, Button, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import { signInWithGoogle, signInWithEmailAndPass } from '../auth'

const Login = () => {

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signIn() {
        signInWithEmailAndPass(email, password)
    }
    return (
        <Grid container justifyContent="center" alignItems="center" p={2} spacing={2} sx={{ flexDirection: 'column' }}>
            <FormControl>
                <TextField id="outlined-basic" label="Login" variant="outlined" sx={{ m: 1 }} onChange={(e) => setEmail(e.target.value)} />
                <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ m: 1 }} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" sx={{ m: 1 }} onClick={signIn}>Login</Button>
            </FormControl>
            <Grid container justifyContent="center" alignItems="center" >
                <Button onClick={signInWithGoogle}>
                    <GoogleIcon sx={{ mr: 2 }} />
                </Button>
                <FacebookIcon />
            </Grid>
            <Link href="./register">Register</Link>
        </Grid>
    );
};

export default Login;