
import React, { useEffect, useState } from "react"
import MapComponent from "../Map/MapComponent"
import {getRun} from "../../api/runs"
import LoadingAnimation from "../loading-animation/loading-animation"

const RunDescription = ({description}) => {
    const [points, setPoints] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getRun(description.data_id)
            .then(res => {
                let data = res.data
                data = data.map(point => {
                    let nums = point.split(',')
                    return [parseFloat(nums[0]), parseFloat(nums[1])]
                })
                setPoints(data)
                setLoading(false)
            })
    }, []) 

    return(
        <div>
            <h1>{description.name}</h1>
            <p>Distance: {description.distance}</p>
            <p>Tags: {description.tags}</p>
            { loading ?
            <LoadingAnimation /> :
            <MapComponent
                points={points}
                editable={false}
            />
            }
        </div>
    )
}

export default RunDescription