import React, { useState } from 'react'
import { search } from '../api/runs';
import RunDescription from '../components/RunDescription/run-description';

const FindARun = () => {
  const [runs, setRuns] = useState([]);

  async function search(query) {
    await search(query)
      .then(res => setRuns(res))
      .catch(err => console.log(err))
  }
  
  return (
      <div>
       
    
      <div className='container'>
        
        <h1>Find a run </h1>
        {runs.map(run => <RunDescription
          description={run}
        />)}
      </div>
      </div>
    );
  };
    
  export default FindARun;