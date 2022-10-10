import React from 'react'
import {AddTaskMobile} from "../assets";

const NewColumn = () => {
  return (
    <div className='new-column'>
      <button className='new-column__btn'>
        <span><AddTaskMobile/></span>
        <p className='heading-xl'>New Column</p>
      </button>
    </div>
  )
}

export default NewColumn