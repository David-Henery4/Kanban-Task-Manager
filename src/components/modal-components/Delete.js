import React from 'react'

const Delete = () => {
  return (
    <div className="delete">
      <h4 className="heading-l delete__title">Delete this board</h4>
      <p className="basicTextMedium delete__text">
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="delete-btns">
        <button className="btn-sml btn-destructive-color delete-btns__btn">Delete</button>
        <button className="btn-sml btn-secondary-color delete-btns__btn">Cancel</button>
      </div>
    </div>
  );
}

export default Delete