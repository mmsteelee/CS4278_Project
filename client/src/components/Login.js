import React from 'react';
import {GoogleLogin} from 'react-google-login';

const clientId = '573133251068-e1fd6sb5g36l0ktfd5t8ok00kremvo9i.apps.googleusercontent.com';

function Login(){
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };

    return(
        <div>
            <GoogleLogin
            clientId = {clientId}
            buttonText = "Login"
            onSuccess = {onSuccess}
            onFailure = {onFailure}
            cookiePolicy = {'single_host-origin'}
            style = {{marginTop: '100px'}}
            isSignedIn = {true}
            />
        </div>
    )
}

export default Login;