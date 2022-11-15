import React, { useRef, useState } from 'react';
import NavBar from '../../components/NavBar-component/NavBar'

import MapComponent from "../../components/Map/MapComponent";
import Tags from "../../components/Tags/TagComponent";
import "ol/ol.css";
import "./create.css";
import { makeRun } from '../../api/runs';
// import Header from '../../components/header-component/header'

const CreateARun = () => {
  const mapRef = useRef()
  const tagsRef = useRef()
  const [mapContext, setMapContext] = useState({
    name: 'Test2',
    distance: 0,
    tags: [],
    coordinates: [],
  })

  const updateMap = (runData, distance) => {
    let tmp = mapContext
    tmp.coordinates = runData
    tmp.distance = distance
    setMapContext(tmp)
  }

  const updateTags = (tags_) => {
    let tmp = mapContext
    tmp.tags = tags_
    setMapContext(tmp)
  }

  const uploadMap = () => {
    mapRef.current.submit()
    tagsRef.current.submit()
    let runMeta = {name: mapContext.name, distance: mapContext.distance, tags: mapContext.tags}
    let run = {meta: runMeta, data: {coordinates: JSON.stringify(mapContext.coordinates)}}

    if (!mapContext.coordinates.length) {
      // TDOO prompt user to draw a route before submittign
      return
    }
    if (!mapContext.tags.length) {
      // TDOO prompt user to enter tags before submittign
      return
    }
    makeRun(run)
      .then(console.log('Successfull upload'))
      .catch(err => console.log(err))
  };

  const removeLines = () => {
    mapRef.current.reset()
    tagsRef.current.clear()
    setMapContext({
      name: mapContext.name,
      distance: 0,
      tags: [],
      coordinates: [],
    })
  };

  return (
  
  <div className= "main-wrapper">
     <div className= "main-wrapper">
     <div className = "createFeatures">
     
     <div className='tagButtons'>
     <h1 id ="tagsText">Select the tags that apply to your run</h1>
     <Tags ref={tagsRef} updateTags={updateTags}/>
     </div>
     <div className='map'>
     <MapComponent ref={mapRef} updateMap={updateMap}/>
     <div className="measuring-tool">
        <button className="reset-button" onClick={removeLines}>
          Start Over
        </button>
        <button className="upload-button" onClick={uploadMap}>
          Upload Route
        </button>
      </div>
     </div>
    
     </div>  
      {/* <div className = "map">
      <MapComponent />
    </div>   

    <div className = "tags">
    <Tags/>
    </div> */}
      </div>
  </div>
  
  );
}
  export default CreateARun;