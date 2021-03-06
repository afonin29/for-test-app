import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material';
import { Link, Avatar } from '@mui/material';
import '../App.css'
import { LOGIN_PATH } from '../utils/constants';
import { auth } from '../index'
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getProfilePicUrl } from '../auth';

const Navbar = () => {
    const [user] = useAuthState(auth);

    const signOutUser = () => {
        signOut(getAuth());
    }

    return (
        <AppBar position="static">
            <Toolbar variant="dense" >
                <Grid container justifyContent={"flex-end"}>
                    {user ?   
                        <Grid container justifyContent={"flex-end"}>
                            <Link href='./posts'>
                                <Button variant="outlined" style={{backgroundColor: "white"}} sx={{mr : 1}}>Posts</Button>
                            </Link>
                            <Link href='./login'>
                                <Button variant="outlined" onClick={signOutUser} style={{backgroundColor: "white"}} sx={{mr : 1}}>Sign out</Button>
                            </Link>
                            <Link href="./profile">
                                <Avatar alt="" src={getProfilePicUrl()} />
                            </Link>
                        </Grid>
                        :
                        <Link href="./login">
                            <Button variant="outlined" style={{backgroundColor: "white"}}>Login</Button>
                        </Link>
                    }
                    
                </Grid>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;