import {api as axios} from '../utils/axios'

export async function getAdmins() {
    return await axios({
        method: "GET",
        url: "/admin/"
    })
}

export async function grantAdmin(email) {
    return await axios({
        method: "PUT",
        url: "/admin/grant",
        data: {email: email}
    })
}

export async function revokeAdmin(email) {
    return await axios({
        method: "PUT",
        url: "/admin/revoke",
        data: {email: email}
    })
}