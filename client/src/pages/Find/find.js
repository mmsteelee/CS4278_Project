import React, { useEffect, useRef, useState } from 'react'
import { search as searchAPI } from '../../api/runs';
import LoadingAnimation from '../../components/loading-animation/loading-animation';
import RunDescription from '../../components/RunDescription/run-description';
import Tags from '../../components/Tags/TagComponent';
import "./find.css";

const FindARun = () => {

 
const [minValue, setMinValue] = useState(0);
const [runFindError, setFindText] = useState('Fill all required fields before submitting')

  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false)
  //controll if search should be an option
  const  [searchable , setSearchable ] = useState(false)
  const [query, setQuery] = useState({
    minDistance:0,
    maxDistance:100,
    //distance: 5,
    tags: []
  })

  
  const tagsRef = useRef()

  async function search() {
    console.log(query);
    setLoading(true)
    tagsRef.current.submit()
    setSearchable = query.maxDistance !== 0 && !isNaN(query.maxDistance) && !isNaN(query.minDistance) && query.tags.length > 0
    if (searchable) {
      await searchAPI(query)
        .then(res => {
          setRuns(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
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

  const handleMin = event => {
    const result = event.target.value

    if (result.match(/^\d{1,}(\.\d{0,4})?$/)) {
      let tmp = query
      tmp.minDistance = parseFloat(result)
      setQuery(tmp)
    } else {
      // TODO prompt user to input numbers only
      setFindText('Please input ONLY numbers for the distance field')
    }
  };

  const handleMax = event => {
    const result = event.target.value

    if (result.match(/^\d{1,}(\.\d{0,4})?$/)) {
      let tmp = query
      tmp.maxDistance = parseFloat(result)
      setQuery(tmp)
    } else {
      // TODO prompt user to input numbers only
      setFindText('Please input ONLY numbers for the distance field')
    }
  };




  return (
      <div>
      <div className='main-wrapper-find'>
        
        <h1 id ="title">Find a run </h1>

<div className='tags-find'>
        <Tags ref={tagsRef} updateTags={updateTags}/>
        </div>
        {/* <input
          type="text"
          placeholder={query.distance}
          onChange={handleChange}
        /> */}
        <div className='distance-range'>
          Min Distance:
         <input
          type="text"
          placeholder={query.minDistance}
          onChange={handleMin}
        />
        Max Distance:
         <input
          type="text"
          placeholder={query.maxDistance}
          onChange={handleMax}
        />

        <button 
          onClick={search} 
          disabled={searchable ? true : false}
          >Search
        </button>
        <h1 id="findErrText">{runFindError}</h1>
        </div>
        <div>
        {loading ? 
        <LoadingAnimation />
        :
        runs.map(run => <RunDescription
          description={run}
          key={run.name}
        />)
        }
        </div>
      </div>
      </div>
    );
  };
    
  export default FindARun;