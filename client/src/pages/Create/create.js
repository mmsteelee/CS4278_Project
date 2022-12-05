import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from "../../components/Map/MapComponent";
import Dropdown from '../../components/Dropdown/DropdownComponent';
import "ol/ol.css";
import "./create.css";
import { makeRun } from '../../api/runs';
import IconButton from '@mui/material/IconButton';

import Undo from '@material-ui/icons/Undo';
import Create from '@material-ui/icons/Create';
import Search from '@material-ui/icons/Search';
import Delete from '@material-ui/icons/Delete';
import Publish from '@material-ui/icons/Publish';
// import ThreeDRotation from '@material-ui/icons/ThreeDRotation';




const CreateARun = () => {
  const mapRef = useRef()
  const tagsRef = useRef()
  //declare a run route handler
  const [showIcons, setShowIcons] = useState(false);
  const [runRouteError, setRouteText] = useState('* Fill all required fields before submitting')
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
    // make a whole new set of things and make them all hidden
    <div >
      <div className="hidden-part">
      <div className="create-header">
        <h1 className='lets-create'>Create Your Run</h1>
      </div>
      {/* end create-header */}

      <div className="main-wrapper-create">
        
          <div className='row'>
            <div className="column left">
              {/* id={showInfo ? "hidden" : ""} */}
              <div className="mapButtons">
                <button className="undo-button" onClick={undoLines}><Undo /></button>
                <button className="reset-button" onClick={removeLines}><Delete /></button>
              </div>
              {/* end map buttons */}
              <div className='map' id={showIcons ? "hidden" : ""}>
                <MapComponent
                  ref={mapRef}
                  updateMap={updateMap} /> 
              </div>
              <br></br>
              {/* end map component */}
            </div>
            {/* end left column */}

            <div className="column right">
            {/* id={showInfo ? "hidden" : ""} */}
              <div className='navButtons'>
                <button id="create" onClick={navigateToCreate}><Create /> Create A Run</button>
                <button id="find" onClick={navigateToFind}><Search /> Find A Run</button>
              </div>
              {/* end navButtons */}
              <div className='dropdown'>

              <Dropdown
                ref={tagsRef} updateTags={updateTags}
              />
              </div>
              {/* end dropdown */}
           
              <div className="name">
                <input id="namebox" type='text' name='name' placeholder='Name Your Run' value={mapContext.name} onChange={handleChange} />
              </div>
              {/* end name */}

              <div className="measuring-tool">
                <button className="upload-button" onClick={uploadMap}><Publish /> Upload Route</button>
                <div>
                  <h1 id="routeErrText">{runRouteError}</h1>
                </div>
                {/* end h1 */}
              </div>
              {/* end measuring-tool */}

            </div>
            {/* end column right */}


          </div>
          {/* end row div */}






          {/* WORK HERE */}
          


        </div>
        {/* end hidden div */}
      </div>
      {/* end main wrapper create */}
      <div className="hidden-when-big">

        {/*           HEADER DIV             */}
        <div className="create-header-hidden">
          <h1 className='lets-create-hidden'>Create Your Run</h1>
        {/* <h1 className='start-tracing'>Click anywhere on the map to start tracing your route.</h1> */}
        </div>

        {/*            NAVBUTTONS DIV          */}
        <div className='navButtons-hidden'>
          <button id="create-hidden" onClick={navigateToCreate}><Create /> Create A Run</button>
          <button id="find-hidden" onClick={navigateToFind}><Search /> Find A Run</button>
        </div>

        {/*            UNDO AND REDO BUTTONS         */}
        <div className="mapButtons-hidden">
          <button className="undo-button-hidden" onClick={undoLines}><Undo /></button>
          <button className="reset-button-hidden" onClick={removeLines}><Delete /></button>
          
        </div>

        {/*            MAP COMPONENT             */}
        <div className="hidden-map">
          <button onClick={() => setShowIcons(!showIcons)}>Calendar</button>
          {/* <MapComponent
            ref={mapRef}
            updateMap={updateMap} 
          />  */}
        </div>

        {/*           ERROR MESSAGES          */}
        <div className='error-msg'>
          <h1 id="routeErrText-hidden">{runRouteError}</h1>
        </div>

        {/*             DROPDOWN COMPONENT         */}
        <div className='dropdown-hidden'>
          <Dropdown
            ref={tagsRef} updateTags={updateTags}
          />
        </div>

        {/*             NAME AND SUBMIT            */}
        <div className='name-and-submit'>
          {/* name */}
          <div className="name-hidden">
            <input id="namebox" type='text' name='name' placeholder='Name Your Run' value={mapContext.name} onChange={handleChange} />
          </div>
          {/* submit */}
          <div className="submit-hidden">
            <button className="upload-button-hidden" onClick={uploadMap}><Publish /> Upload Route</button>
          </div>
        </div>

        



      </div>
    </div>
    // end big div

  );
}
export default CreateARun;