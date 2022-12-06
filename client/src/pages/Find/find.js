import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { search as searchAPI } from '../../api/runs';
import LoadingAnimation from '../../components/loading-animation/loading-animation';
import RunDescription from '../../components/RunDescription/run-description';
import MultiRangeSlider from '../../components/rangeSlider/MultiRangeSlider'
import Dropdown from '../../components/Dropdown/DropdownComponent';
import { Avatar, Button, Paper, Typography, Container } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import Create from '@material-ui/icons/Create';
import Search from '@material-ui/icons/Search';

import "./find.css";

const FindARun = () => {
  const [runFindError, setFindText] = useState('*Fill all required fields before searching')

  const [runs, setRuns] = useState([]);
  const [runIndex, setRunIndex] = useState(0)
  const [curRun, setCurRun] = useState()
  const [loading, setLoading] = useState(false)
  //controll if search should be an option
  const [searchable, setSearchable] = useState(false)
  const [query, setQuery] = useState({
    minDistance: 0,
    maxDistance: 100,
    //distance: 5,
    tags: []
  })

  useEffect(() => {
    if (runs.length) {
      setCurRun(runs[0])
      setRunIndex(0)
    }
  }, [runs])

  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate('/create');
  }

  const navigateToFind = () => {
    navigate('/find');
  }

  const tagsRef = useRef()

  const validate = () => {
    return query.maxDistance !== 0 && !isNaN(query.maxDistance) && !isNaN(query.minDistance) && query.tags.length > 0
  }

  async function search() {
    if (validate()) {
      setLoading(true)
      await searchAPI(query)
        .then(res => {
          setLoading(false)
          setRuns(res.data)
          //setFindText(`Found ${res.data.length} runs`)
        })
        .catch(err => {
          setFindText('Error Finding Run: ' + err.message)
          setLoading(false)
        })
    } else {
      // TODO prompt why not seqarchable
      setFindText('Please input distances and tags before searching')
    }
  }

  const updateTags = (tags) => {
    let tmp = query
    tmp.tags = tags
    setQuery(tmp)
  }

  const changeRun = (next) => {
    if (next) {
      if (runIndex < runs.length - 1) {

        setRunIndex(runIndex + 1)
        console.log("nextRun");
        setCurRun(runs[runIndex + 1])

      } else {
        setRunIndex(0)
        setCurRun(runs[0])
      }
    } else {
      if (runIndex > 0) {
        setRunIndex(runIndex - 1)
        setCurRun(runs[runIndex - 1])
      } else {
        setRunIndex(runs.length - 1)
        setCurRun(runs[runs.length - 1])
      }
    }
    console.log(runIndex);
    //setCurRun(runs[runIndex + 1])
  }

  // const handleChange = event => {
  //   const result = event.target.value

  //   if (!result || result.match(/^\d{1,}(\.\d{0,4})?$/)) {
  //     let tmp = query
  //     tmp.distance = parseFloat(result)
  //     setQuery(tmp)
  //   } else {
  //     // TODO prompt user to input numbers only
  //   }
  // };
  return (


    <div className='main-wrapper'>
      <div className='white-background'>
        <div className='find-header'>
          <h1 id="lets-find">FIND A RUN</h1>
        </div>
        <div className='row'>
          <div className="column-find left-find">


            <div className='returned-runs'>
              {loading ?
                <LoadingAnimation />
                :
                <RunDescription
                  description={curRun}
                />
              }
            </div>

            <div className='zero'>
              {runs.length &&
                <div className='run-arrows'>

                  <IconButton id="back" aria-label="delete" enabled={runs.length} onClick={() => changeRun(false)}>
                    <ArrowBack />
                  </IconButton>
                  <p id="run-info"> [ Showing run {runIndex + 1} of {runs.length} ] </p>
                  <IconButton id="next" aria-label="delete" enabled={runs.length} onClick={() => changeRun(true)}>
                    <ArrowForward />
                  </IconButton>

                </div>
              }
            </div>
          </div>
          <div className="column-find right-find">
            <div className='navButtons-find'>
              <button id="create-find" onClick={navigateToCreate}>
                <Create />Create A Run
              </button>
              <button id="find-find" onClick={navigateToFind}>
                <Search />Find A Run
              </button>
            </div>
            <div className='dropdown'>
              <Dropdown
                ref={tagsRef} updateTags={updateTags}
              />
            </div>

            <div className='slider'>
              <MultiRangeSlider
                min={0}
                max={30}
                onChange={({ min, max }) => {
                  let tmp = query;
                  tmp.minDistance = parseFloat(min);
                  tmp.maxDistance = parseFloat(max);
                  setQuery(tmp);
                  //console.log(query);
                }} />

            </div>

            <div className='search'>
              <button id='search-button'
                onClick={search}
              ><Search />Search
              </button>
            </div>
            <div className='error'>
              <h1 disabled={!searchable} id="findErrText">{runFindError}</h1>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

          </div>

        </div>
      </div>
      <div className="hidden-when-big-find">
        {/*           HEADER DIV             */}
        <div className="find-header-hidden">
          <h1 className='lets-find-hidden'>Find Your Run</h1>
          {/* <h1 className='start-tracing'>Click anywhere on the map to start tracing your route.</h1> */}
        </div>

        {/*            NAVBUTTONS DIV          */}
        <div className='navButtons-hidden-find'>
          <button id="create-hidden-find" onClick={navigateToCreate}><Create /> Create A Run</button>
          <button id="find-hidden-find" onClick={navigateToFind}><Search /> Find A Run</button>
        </div>



        {/*             DROPDOWN COMPONENT         */}
        <div className='dropdown-hidden-find'>
          <Dropdown
            ref={tagsRef} updateTags={updateTags}
          />
        </div>

        {/*           Distance Slider          */}
        <div className='slider-hidden'>
          <MultiRangeSlider
            min={0}
            max={30}
            onChange={({ min, max }) => {
              let tmp = query;
              tmp.minDistance = parseFloat(min);
              tmp.maxDistance = parseFloat(max);
              setQuery(tmp);
              //console.log(query);
            }} />

        </div>
        {/*           ERROR MESSAGES          */}
        <div className='error-msg-find'>
          <h1 id="routeErrText-hidden-find">{runFindError}</h1>
        </div>

        {/* search */}
        <div className="search-hidden">
          <button className="search-button-hidden" onClick={search}> Search</button>
        </div>
        <div className='zero-hidden'>
              {runs.length &&
                <div className='run-arrows-hidden'>

                  <IconButton id="back-hidden"  enabled={runs.length} onClick={() => changeRun(false)}>
                    <ArrowBack />
                  </IconButton>
                  <p id="run-info-hidden"> [ Showing run {runIndex + 1} of {runs.length} ] </p>
                  <IconButton id="next-hidden"  enabled={runs.length} onClick={() => changeRun(true)}>
                    <ArrowForward />
                  </IconButton>

                </div>
              }
            </div>
        <div className='returned-runs-hidden'>
          {loading ?
            <LoadingAnimation />
            :
            <RunDescription
              description={curRun}
            />
          } 
        </div>
   <br></br>

      </div>
    </div >

  );
};

export default FindARun;