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

import "./find.css";

const FindARun = () => {
  const [runFindError, setFindText] = useState('Fill all required fields before searching')

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
          setFindText(`Found ${res.data.length} runs`)
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
      } else {
        setRunIndex(0)
      }
    } else {
      if (runIndex > 0) {
        setRunIndex(runIndex - 1)
      } else {
        setRunIndex(runs.length - 1)
      }
    }
    setCurRun(runs[runIndex])
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
      <div className='row'>
        <div className="column-find left-find">
          <h1 id="title">Find a run </h1>
          {runs.length &&
            <div>
              <h2 id="run-info"> Showing run {runIndex + 1} of {runs.length} </h2>
              <IconButton id = "back" aria-label="delete" enabled={runs.length} onClick={() => changeRun(false)}>
                <ArrowBack />
              </IconButton>
              <IconButton id = "next" aria-label="delete" enabled={runs.length} onClick={() => changeRun(true)}>
                <ArrowForward/>
              </IconButton>
            </div>
          }
        </div>
        <div className="column-find right-find">
          <div className='navButtons-find'>
            <button id="create-find" onClick={navigateToCreate}>
              Create A Run
            </button>
            <button id="find-find" onClick={navigateToFind}>
              Find A Run
            </button>
          </div>

          <Dropdown
            ref={tagsRef} updateTags={updateTags}
          />

          <div className='slider'>
            <MultiRangeSlider
              min={0}
              max={100}
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
            >Search
            </button>
          </div>
          <div className='error'>
            <h1 disabled={!searchable} id="findErrText">{runFindError}</h1>
          </div>

        </div>
        <div>
          {loading ?
            <LoadingAnimation />
            :
            <RunDescription
              description={curRun}
            />
          }
        </div>
      </div>
    </div>

  );
};

export default FindARun;