import {api as axios} from '../utils/axios'

export async function user() {
    return await axios({
        method: "GET",
        url: "/auth/user"
    })
}

export async function login(accessToken) {
    return await axios({
        method: "POST",
        url: "/auth/login",
        data: {accessToken}
    })
}

export async function logout(accessToken) {
    return await axios({
        method: "POST",
        url: "/auth/logout",
        data: {accessToken}
    })
}

export async function exp() {
    return await axios({
        method: "GET",
        url: "/auth/exp"
    })
}

