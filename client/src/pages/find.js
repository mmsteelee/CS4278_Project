import React, { useEffect, useRef, useState } from 'react'
import { search as searchAPI } from '../api/runs';
import LoadingAnimation from '../components/loading-animation/loading-animation';
import RunDescription from '../components/RunDescription/run-description';
import Tags from '../components/Tags/TagComponent';

const FindARun = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    distance: 0,
    tags: []
  })
  
  const tagsRef = useRef()

  async function search() {
    setLoading(true)
    tagsRef.current.submit()
    let searchable = query.distance !== 0 && !isNaN(query.distance) && query.tags.length > 0
    if (searchable) {
      await searchAPI(query)
        .then(res => {
          setRuns(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    } else {
      // TODO prompt why not seqarchable
    }
  }
  
  const updateTags = (tags) => {
    let tmp = query
    tmp.tags = tags
    setQuery(tmp)
  }

  const handleChange = event => {
    const result = event.target.value

    if (!result || result.match(/^\d{1,}(\.\d{0,4})?$/)) {
      let tmp = query
      tmp.distance = parseFloat(result)
      setQuery(tmp)
    } else {
      // TODO prompt user to input numbers only
    }
  };


  return (
      <div>
      <div className='container'>
        <h1>Find a run </h1>
        <Tags ref={tagsRef} updateTags={updateTags}/>
        <input
          type="text"
          placeholder={query.distance}
          onChange={handleChange}
        />
        <button onClick={search} >Search</button>
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