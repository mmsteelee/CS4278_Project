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

  const validate = () => {
    return query.maxDistance !== 0 && !isNaN(query.maxDistance) && !isNaN(query.minDistance) && query.tags.length > 0
  } 

  async function search() {
    setSearchable(validate)
    if (searchable) {
      setLoading(true)
      await searchAPI(query)
        .then(res => {
          setRuns(res.data)
          setLoading(false)
          setFindText(`Found ${runs.length} runs`)
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

  const handleMin = (event) => {
    const result = event.target.value

    let tmp = query
    tmp.minDistance = parseFloat(result)
    setQuery(tmp)
  };

  const handleMax = (event) => {
    const result = event.target.value

    let tmp = query
    tmp.maxDistance = parseFloat(result)
    setQuery(tmp)
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
          placeholder='0'
          onChange={handleMin}
        />
        Max Distance:
         <input
          type="text"
          placeholder='inf'
          onChange={handleMax}
        />

        <button 
          onClick={search} 
          >Search
        </button>
        <h1 disabled ={!searchable} id="findErrText">{runFindError}</h1>
        </div>
        <div>
        {loading ? 
        <LoadingAnimation />
        :
        runs.map(run => <RunDescription
          description={run}
          key={run.data_id}
        />)
        }
        </div>
      </div>
      </div>
    );
  };
    
  export default FindARun;