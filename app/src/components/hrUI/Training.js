import React from 'react'
import ViewTrainings from './ViewTainings'

const Training = ({trainings,setTrainings}) => {
      return (
    <div>
        <ViewTrainings trainings={trainings} setTrainings={setTrainings}/>
       
    </div>
  )
}

export default Training
