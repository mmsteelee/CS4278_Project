
import React, { useEffect, useState } from "react"
import MapComponent from "../Map/MapComponent"
import {getRun} from "../../api/runs"
import LoadingAnimation from "../loading-animation/loading-animation"
import './run-description.css'

const RunDescription = ({description}) => {
    const [points, setPoints] = useState([])
    const [loading, setLoading] = useState(true)

    var tags = description.tags;
    var tagsToString = tags.join(',           ');

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
        <div className="run-returns">
            <div className="description">
                <h1>{description.name}</h1>
                <p>Distance: {description.distance}</p>
                <div className="array">
                  
                    {/* <p>Tags: {tags}</p> */}
                    {/* <p>Tags: {description.tags}</p> */}
                    <p>Tags: {tagsToString}</p>
                </div>
            </div>
            <div className="map-picture">
                { loading ?
                <LoadingAnimation /> :
                <MapComponent
                    points={points}
                    editable={false}
                />
                }
            </div>
        </div>
    )
}

export default RunDescription