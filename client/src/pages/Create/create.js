import React, { useRef, useState } from 'react';
import NavBar from '../../components/NavBar-component/NavBar'

import MapComponent from "../../components/Map/MapComponent";
import Tags from "../../components/Tags/TagComponent";
import "ol/ol.css";
import "./create.css";
import { makeRun } from '../../api/runs';
// import Header from '../../components/header-component/header'

const defaultRun = [[-9663637.587241087,4320771.237232724],[-9663603.951528002,4320545.008367784],[-9663744.135997927,4319719.678623604],[-9662611.727172734,4319566.732425637],[-9662454.287134558,4321015.849989433],[-9662666.139601596,4321341.993847092],[-9663635.87530196,4320763.105521869]]
const mWidth = 20
const mLength = 20

const CreateARun = () => {
  const mapRef = useRef()
  const tagsRef = useRef()
  const [mapContext, setMapContext] = useState({
    name: 'Campus Loop',
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
    mapRef.current.reset()
    tagsRef.current.submit()
    let runMeta = {name: mapContext.name, distance: mapContext.distance, tags: mapContext.tags}
    let run = {
                meta: runMeta, 
                data: {coordinates: mapContext.coordinates.map(String)}
              }

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
     <MapComponent 
        ref={mapRef}
        width={mWidth}
        length={mLength} 
        updateMap={updateMap} 
        points={defaultRun}/>
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