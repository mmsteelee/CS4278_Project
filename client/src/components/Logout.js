import React from 'react';
import {GoogleLogout} from 'react-google-login';

const clientId = '573133251068-e1fd6sb5g36l0ktfd5t8ok00kremvo9i.apps.googleusercontent.com';

function Logout(){
    const onSuccess = (res) => {
        alert('Logout made successfully');
    };

    return(
        <div>
            <GoogleLogout
            clientId = {clientId}
            buttonText = "Login"
            onLogoutSuccess = {onSuccess}
        
            ></GoogleLogout>
        </div>
    );
}

export default Logout;


