import React, { useRef, useState } from 'react';
import NavBar from '../../components/NavBar-component/NavBar'

import MapComponent from "../../components/Map/MapComponent";
import Tags from "../../components/Tags/TagComponent";
import "ol/ol.css";
import "./create.css";
import { makeRun } from '../../api/runs';
// import Header from '../../components/header-component/header'

const defaultRun = [[-86.81009726157794, 36.146299217317576],
[-86.80131438406454, 36.15044574144105],
[-86.7992112393866, 36.14801580890686],
[-86.80075254366587, 36.13742787171793],
[-86.81087733379613, 36.13868784177623],
[-86.8098680396668, 36.14635011068731]]

const CreateARun = () => {
  const mapRef = useRef()
  const tagsRef = useRef()
  const [routeDrawn, setDrawn] = useState(true); //indicates if route has been drawn
  const [mapContext, setMapContext] = useState({
    name: "",
    distance: 0,
    tags: [],
    coordinates: [],
  })
  const handleChange = (event) => {

    if (routeDrawn) {
      setMapContext({ ...mapContext, [event.target.name]: event.target.value });
    }
    else {
      //mapContext.name= "Please Draw a Route";
      console.log("draw route first");
      setMapContext({ ...mapContext, [event.target.name]: "Please Draw a Route" });
    }
  };


  // useEffect(()=>{
  //   drawnRoute = mapContext.coordinates.length > 0
  // }, [mapContext]);

  const updateMap = (runData, distance) => {
    setDrawn(true);
    console.log(mapContext.name);
    let tmp = mapContext;
    tmp.name = mapContext.name;
    tmp.coordinates = runData;
    tmp.distance = distance;
    setMapContext(tmp);
    console.log("updateMap");
  }

  //Why are these the same?
  const updateTags = (tags_) => {
    console.log(mapContext.name);
    let tmp = mapContext;
    tmp.tags = tags_;
    setMapContext(tmp);
    console.log("updateTags");
  }


  const uploadMap = () => {
    mapRef.current.reset()
    tagsRef.current.submit()
    let runMeta = { name: mapContext.name, distance: mapContext.distance, tags: mapContext.tags }
    let run = {
      meta: runMeta,
      data: { coordinates: mapContext.coordinates.map(String) }
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
    console.log(mapContext);
    setMapContext({
      // name: mapContext.name,
      name: "Please Draw a Route",
      distance: 0,
      tags: [],
      coordinates: [],
    })
    //setMapContext({ ...mapContext, [event.target.name]: "Please Draw a Route" });
    setDrawn(false);
  };

  const removeLines = () => {
    console.log(mapContext.name);
    mapRef.current.reset();
    tagsRef.current.clear();
    setDrawn(false);
    //setMapContext({ ...mapContext, name: "Please Draw a Route" });
    setMapContext({
      // name: mapContext.name,
      name: "Please Draw a Route",
      distance: 0,
      tags: [],
      coordinates: [],
    })
  };

  return (

    <div >
      <div className="main-wrapper-create">
        <div className="createFeatures">

          <div className='tagButtons'>
            <h1 id="tagsText">Select the tags that apply to your run</h1>
            <Tags ref={tagsRef} updateTags={updateTags} />
          </div>
          <div className='map'>
            <div className ='mapBox'>
            <MapComponent
              ref={mapRef}
              updateMap={updateMap}
              points={defaultRun} />
              </div>
            <div className="name">
              {/* placeholder='Name Your Run' */}
              <input id="namebox" type='text' name='name' placeholder='Name Your Run' value={mapContext.name} onChange={handleChange} />
            </div>
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