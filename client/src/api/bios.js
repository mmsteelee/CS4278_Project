import {api as axios} from '../utils/axios'

export async function updateBio(bio) {
    return await axios({
        method: "POST",
        url: `/bio/update/${bio._id}`,
        data: bio
    })
}

export async function getBios() {
    return await axios({
        method: "GET",
        url: '/bio/',
    })
}

export async function addNewBio(bio) {
    return await axios({
        method: "POST",
        url: '/bio/new',
        data: bio
    })
}

export async function deleteBio(bio) {
    return await axios({
        method: "DELETE",
        url: `/bio/delete/${bio._id}`,
    })
}