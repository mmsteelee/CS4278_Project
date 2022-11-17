import {api as axios} from '../utils/axios'

export async function user() {
    return await axios({
        method: "GET",
        url: "/account/user"
    })
}

export async function login(accessToken) {
    return await axios({
        method: "POST",
        url: "/account/login",
        data: {accessToken}
    })
}

export async function exp() {
    return await axios({
        method: "GET",
        url: "/account/exp"
    })
}

