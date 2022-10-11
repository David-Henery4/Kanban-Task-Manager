import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EditDelete } from "../modal-components";
import { TickMark, DownArrow, EditDeleteIcon } from "../../assets";

const ViewTask = () => {
  const [isTaskView, setIsTaskView] = useState(false)
  const { isViewTaskActive } = useSelector((store) => store.modals);
  // view-task-active
  return (
    <div
      className={isViewTaskActive ? "view-task-active view-task" : "view-task"}
    >
      <div className="view-task-desc-container">
        <div className="view-task-heading">
          <h4 className="view-task__title heading-l">
            Research pricing points of various competitors and trial different
            business models
          </h4>
          <div className="view-task-heading__icon">
            <EditDeleteIcon onClick={() => setIsTaskView(!isTaskView)} />
          </div>
          {isTaskView && <EditDelete isViewTaskActive={isViewTaskActive} />}
        </div>
        <p className="view-task__text basicTextMedium">
          We know what we're planning to build for version one. Now we need to
          finalise the first pricing model we'll use. Keep iterating the
          subtasks until we have a coherent proposition.
        </p>
      </div>
      <div className="view-task-subtasks">
        <h5 className="view-task-subtasks__status">Subtasks (2 of 3)</h5>
        {/* SUBTASK #1 */}
        <div className="view-task-subtasks-container">
          <div className="view-task-subtask">
            <div className="view-task-subtask-checkbox">
              <TickMark className="view-task-subtask-checkbox__icon" />
            </div>
            <p className="view-task-subtask__text">
              Research competitor pricing and business models
            </p>
          </div>
          {/* SUBTASK #2 */}
          <div className="view-task-subtask">
            <div className="view-task-subtask-checkbox">
              <TickMark className="view-task-subtask-checkbox__icon" />
            </div>
            <p className="view-task-subtask__text">
              Outline a business model that works for our solution
            </p>
          </div>
          {/* SUBTASK #3 */}
          <div className="view-task-subtask">
            <div className="view-task-subtask-checkbox">
              <TickMark className="view-task-subtask-checkbox__icon" />
            </div>
            <p className="view-task-subtask__text">Surveying and testing</p>
          </div>
        </div>
      </div>
      <div className="view-task-overall-status">
        <h5 className="view-task-overall-status__title">Current Status</h5>
        {/* MIGHT CHANGE TO INPUT SELECT */}
        <div className="view-task-overall-status-select flex-cen-cen">
          <p className="view-task-overall-status__text basicTextMedium">
            Doing
          </p>
          <DownArrow className="view-task-overall-status__icon" />
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
