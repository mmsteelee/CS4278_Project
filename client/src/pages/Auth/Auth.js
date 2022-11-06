import { useContext, useState } from "react";
import useStyles from './styles';
import { login } from "../../api/auth";
import {logout} from "../../api/auth";

import {useGoogleLogin, useGoogleLogout} from '@react-oauth/google';
import { useNavigate } from "react-router-dom"


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

    const navigate = useNavigate();

    async function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        
        setsignInText('Logging into Vandy Run Club!')

        // API Call
        await login(accessToken)
        .then( res => {
            if(res.data.message) {
                setsignInText(res.data.message + '. Please try again with a valid vanderbilt.edu email')
            } else {
                setCookie('token', res.data.token, {path:'/'})
                setUser(res.data.result)
                navigate(-1)
            }  
        })
        .catch(err => {
            setsignInText('We ran into an issue logging you in. Try again later')
            console.log("ERROR: ", err.json)
        })
    }
    const googleLogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess})

    return(
        <div>
            <Container component="main" maxwidth="xs"> 
            <Paper className={classes.paper} elevation={3}>
                <Avatar>
                    {user ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                </Avatar>
                <Typography varient="h5">
                    {signInText}
                </Typography>
                <Button fullWidth variant="contained" className={classes.googleButton} color="primary" onClick={() => googleLogin()}>
                    Google Sign In
                </Button>
            </Paper>
            </Container>
        </div>
    )
}

export default Auth;