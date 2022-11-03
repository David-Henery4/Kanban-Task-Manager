import React from 'react'
import { useDispatch } from 'react-redux';
import { openViewTaskEditDelete } from '../../../features/modals/modalsSlice';
import { EditDeleteIcon,  } from '../../../assets';
import { EditDelete } from "../../modal-components";

const DescContainer = ({descContainerData}) => {
  const dispatch = useDispatch()
  const {selectedTask, isViewTaskActive, isViewTaskEditDeleteActive} = descContainerData
  //
  return (
    <div className="view-task-desc-container">
      <div className="view-task-heading">
        <h4 className="view-task__title heading-l">
          {selectedTask ? selectedTask.title : ""}
        </h4> 
        <div className="view-task-heading__icon">
          <EditDeleteIcon
            className="view-task-heading__icon--icon"
            onClick={() => dispatch(openViewTaskEditDelete())}
          />
        </div>
        {isViewTaskEditDeleteActive && (
          <EditDelete isViewTaskActive={isViewTaskActive} />
        )}
      </div>
      <p className="view-task__text basicTextMedium">
        {selectedTask.description}
      </p>
    </div>
  );
}

export default DescContainer