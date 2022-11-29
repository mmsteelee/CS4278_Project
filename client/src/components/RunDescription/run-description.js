
import React, { useEffect, useState } from "react"
import MapComponent from "../Map/MapComponent"
import {getRun} from "../../api/runs"
import LoadingAnimation from "../loading-animation/loading-animation"
import './run-description.css'

const RunDescription = ({description}) => {
    const [mapData, setMapData] = useState([])
    const [loading, setLoading] = useState(true)

    var tags = description.tags;
    var tagsToString = tags.join(',           ');

    useEffect(() => {
        
        getRun(description.data_id)
            .then(res => {
                let data = {
                    route: res.data.route.map(
                        nums => [parseFloat(nums[0]), parseFloat(nums[1])]
                    ),
                    waypoints: res.data.waypoints.map(
                        nums => [parseFloat(nums[0]), parseFloat(nums[1])] 
                    ),
                    distance: description.distance
                }

                setMapData(data)
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
                    mapData={mapData}
                    editable={false}
                />
                }
            </div>
        </div>
    )
}

export default RunDescription