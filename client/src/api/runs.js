import {api as axios} from '../utils/axios'

// Returns the RunData in the form of geo json. 
// id obtained from the RunMeta
export async function getRun(id) {
    return await axios({
        method: "GET",
        url: `/runs/${id}`,
    })
}

// query should be of the form {distance: number, tags: [string]}
// returns array of RunMeta's sorted by query params
export async function search(query) {
    return await axios({
        method: "GET",
        url: `/runs/find`,
        params: query
    })
}

// run should be of the form 
// {meta: RunMeta object (see server/models/RunMeta), data: geo json}
export async function makeRun(run) {
    return await axios({
        method: "POST",
        url: `/runs/new`,
        data: run
    })
}