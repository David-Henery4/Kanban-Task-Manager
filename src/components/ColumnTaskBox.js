import React from 'react'
import { useDispatch } from 'react-redux';
import { openViewTaskModal } from '../features/modals/modals.Slice';
import { openOverlay } from '../features/overlay/overlaySlice';

const ColumnTaskBox = () => {
  const dispatch = useDispatch()
  const handleViewTask = () => {
    dispatch(openViewTaskModal());
    dispatch(openOverlay())
  }
  return (
    <div className="column-task" onClick={handleViewTask}>
      <h3 className="column-task__title heading-m">
        Build UI for onboarding flow
      </h3>
      <p className="column-task__status basicTextMedium">0 of 3 subtasks</p>
    </div>
  );
}

export default ColumnTaskBox