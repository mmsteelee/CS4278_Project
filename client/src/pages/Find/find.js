import React, { useEffect, useRef, useState } from 'react'
import { search as searchAPI } from '../../api/runs';
import PropTypes from "prop-types";
import LoadingAnimation from '../../components/loading-animation/loading-animation';
import RunDescription from '../../components/RunDescription/run-description';
import Tags from '../../components/Tags/TagComponent';
import MultiRangeSlider from '../../components/rangeSlider/MultiRangeSlider';
import "./find.css";

const FindARun = () => {


  const [minValue, setMinValue] = useState(0);
  const [runFindError, setFindText] = useState('Fill all required fields before submitting')

  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(false)
  //controll if search should be an option
  const [searchable, setSearchable] = useState(false)
  const [query, setQuery] = useState({
    minDistance: 0,
    maxDistance: 100,
    //distance: 5,
    tags: []
  })


  const tagsRef = useRef()



  const validate = () => {
    return query.maxDistance !== 0 && !isNaN(query.maxDistance) && !isNaN(query.minDistance) && query.tags.length > 0
  }

  async function search() {
    console.log(query)
    if (validate()) {
      setLoading(true)
      await searchAPI(query)
        .then(res => {
          setLoading(false)
          setFindText(`Found ${runs.length} runs`)
          setRuns(res.data)
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
  return (
    <div>
      <div className='main-wrapper-find'>

        <h1 id="title">Find a run </h1>

        <div className='tags-find'>

          <Tags ref={tagsRef} updateTags={updateTags} />
        </div>
        {/* <input
          type="text"
          placeholder={query.distance}
          onChange={handleChange}
        /> */}
        

          <div className='slider'>
            <MultiRangeSlider
              min={0}
              max={100}
              onChange={({ min, max }) => {
                //console.log(`min = ${min}, max = ${max}`);

                let tmp = query;
                tmp.minDistance = parseFloat(min);
                tmp.maxDistance = parseFloat(max);
                setQuery(tmp);
                //console.log(query);
              }} />
          </div>
          <div className='search'>
          <button
            onClick={search}
          >Search
          </button>
          <h1 disabled={!searchable} id="findErrText">{runFindError}</h1>
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