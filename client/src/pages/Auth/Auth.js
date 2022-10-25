import { useContext, useState } from "react";
import useStyles from './styles';
import {api as axios} from '../../utils/axios'

import {useGoogleLogin} from '@react-oauth/google';
import { Navigate } from "react-router-dom"


import { Avatar, Button, Paper, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { UserContext } from '../../App'
import { CookieContext } from "../../App";

const Auth = () => {
    const classes = useStyles()
    const {user, setUser} = useContext(UserContext)
    const {cookies, setCookie} = useContext(CookieContext)
    const [signInText, setsignInText] = useState('Sign in with your vanderbilt.edu Email')

    async function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        
        setsignInText('Logging into Vandy Run Club!')

        // API Call
        await axios({
            method: "POST",
            url: "/auth/login",
            data: {accessToken}
        })
        .then( res => {
            if(res.data.message) {
                setsignInText(res.data.message + '. Please try again with a valid vanderbilt.edu email')
            } else {
                setCookie('token', res.data.token, {path:'/'})
                setUser(res.data.result)
            }  
        })
        .catch(err => console.log("ERROR: ", err.json))
    }
    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess})

    return(
        <div>
            {user ? <Navigate to="/"/> : 
            <Container component="main" maxwidth="xs"> 
            <Paper className={classes.paper} elevation={3}>
                <Avatar>
                    {user ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                </Avatar>
                <Typography varient="h5">
                    {signInText}
                </Typography>
                <Button fullWidth variant="contained" className={classes.googleButton} color="primary" onClick={() => login()}>
                    Google Sign In
                 </Button>
            </Paper>
        </Container>}
        </div>
    )
}

export default Auth;