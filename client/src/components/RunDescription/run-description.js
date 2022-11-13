
import React from "react"

const RunDescription = ({description}) => {
    return(
        <div>
            <h1>{description.name}</h1>
            <p>Distance: {description.distance}</p>
            <p>Tags: {description.tags}</p>
        </div>
    )
}

export default RunDescription