import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from "../../components/Map/MapComponent";
import Dropdown from '../../components/Dropdown/DropdownComponent';
import "ol/ol.css";
import "./create.css";
import { makeRun } from '../../api/runs';
import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';






const CreateARun = () => {
  const mapRef = useRef()
  const tagsRef = useRef()
  //declare a run route handler
  const [runRouteError, setRouteText] = useState('Fill all required fields before submitting')
  const [routeDrawn, setDrawn] = useState(true); //indicates if route has been drawn
  const [mapContext, setMapContext] = useState({
    name: "",
    distance: 0,
    tags: [],
    data: null,
  })

  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate('/create');
  }

  const navigateToFind = () => {
    navigate('/find');
  }
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

  const validate = () => {
    if (!mapContext.data?.route.length) {
      setRouteText('Please draw a route on the map')
      return false
    }
    if (!mapContext.tags.length) {
      setRouteText('Please select tags')
      return false
    }
    if (!mapContext.name.length) {
      setRouteText('Please name your route')
      return false
    }
    return true
  }


  const updateMap = (route, waypoints, distance) => {
    setDrawn(true);

    let tmp = mapContext;
    tmp.name = mapContext.name;
    tmp.data = {
      route: route,
      waypoints: waypoints
    }
    tmp.distance = distance;
    setMapContext(tmp);
  }

  //Why are these the same?
  const updateTags = (tags_) => {
    console.log(mapContext.name);
    let tmp = mapContext;
    tmp.tags = tags_;
    setMapContext(tmp);
    console.log(tags_);
    console.log("updateTags");
  }


  const uploadMap = () => {
    tagsRef.current.submit()
    let runMeta = { name: mapContext.name, distance: mapContext.distance, tags: mapContext.tags }
    let run = {
      meta: runMeta,
      data: mapContext.data
    }

    if (validate()) {
      makeRun(run)
        .then(console.log('Successfull upload'),
          setRouteText('Successfully uploaded run!')
        )
        .catch(err => console.log(err))

      mapRef.current.reset();
      setMapContext({
        // name: mapContext.name,
        name: '',
        distance: 0,
        tags: [],
        coordinates: [],
      })
    }
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

  const undoLines = () => {
    console.log(mapContext.name);
    mapRef.current.undoLine();

  };

  return (

    <div >
      <div className="main-wrapper-create">
        <div className='row'>

          <div className="column left">
            <MapComponent
              ref={mapRef}
              updateMap={updateMap} />

            <div className="mapButtons">
              <button className="undo-button" onClick={undoLines}>
                Undo
              </button>
              <button className="reset-button" onClick={removeLines}>
                Start Over
              </button>
            </div>

          </div>
          <div className="column right">
            <div className='navButtons'>
              <button id="create" onClick={navigateToCreate}>
                Create A Run
              </button>
              <button id="find" onClick={navigateToFind}>
                Find A Run
              </button>
            </div>
            <Dropdown
              ref={tagsRef} updateTags={updateTags}
            />

            <div className="name">
              <input id="namebox" type='text' name='name' placeholder='Name Your Run' value={mapContext.name} onChange={handleChange} />
            </div>
            <div className="measuring-tool">

              <button className="upload-button" onClick={uploadMap}>
                Upload Route
              </button>

            </div>
            <div className='error'>
              <h1 id="routeErrText">{runRouteError}</h1>
            </div>
          </div>


        </div>
      </div>
    </div>

  );
}
export default CreateARun;