import { createSlice } from "@reduxjs/toolkit";
import InitialTaskData from "../../data.json";

const initialState = {
  overallData: InitialTaskData.boards,
  activeBoardIndex: 0,
  activeBoardData: {},
  selectedTask: {},
  emptyTaskInputValues: {
    id: +new Date(),
    title: "",
    description: "",
    status: "",
    subtasks: [
      {
        id: +new Date(),
        title: "",
        isCompleted: false,
      },
    ],
  },
  emptyBoardInputValues: {
    id: +new Date(),
    name: "",
    columns: [
      {
        id: +new Date(),
        name: "",
        tasks: [],
      },
    ],
  },
  itemCoords: 0,
  itemNode: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateTaskStatusToNewColTitle: (state, {payload}) => {
      state.overallData[state.activeBoardIndex].columns.map(col => col.tasks.map(task => task.status = col.name))
    },
    //
    updateTaskTargetStatus: (state, { payload }) => {
      const { colIndex } = state.itemCoords;
      state.overallData[state.activeBoardIndex].columns.map((col, i) => {
        if (i === colIndex) {
          col.tasks.map((task,i) => {
            if (task.status !== col.name){
              task.status = col.name
            }
            return task
          })
        }
        return col
      });
    },
    //
    checkNode: (state, { payload }) => {
      state.itemNode = payload;
    },
    //
    handleItemCoords: (state, { payload }) => {
      state.itemCoords = payload;
    },
    //
    handleDropInfo: (state, { payload }) => {
      state.overallData[state.activeBoardIndex].columns = payload;
    },
    //
    resetBoardInputValues: (state, { payload }) => {
      state.emptyBoardInputValues = {
        id: +new Date(),
        name: "",
        columns: [
          {
            id: +new Date(),
            name: "",
            tasks: [],
          },
        ],
      };
    },
    //
    addNewBoard: (state, { payload }) => {
      const newBoards = [...state.overallData, payload];
      state.overallData = newBoards;
    },
    //
    deleteBoard: (state, { payload }) => {
      const updatedBoards = state.overallData.filter(
        (board) => board.id !== state.activeBoardData.id
      );
      state.overallData = updatedBoards;
    },
    //
    editBoard: (state, { payload }) => {
      const updatedBoards = state.overallData.map((board) => {
        if (board.id !== payload.id) return board;
        return (board = payload);
      });
      state.overallData = updatedBoards;
    },
    //
    resetTaskInputValues: (state, { payload }) => {
      state.emptyTaskInputValues = {
        id: +new Date(),
        title: "",
        description: "",
        status:
          state.activeBoardData.columns &&
          state.activeBoardData.columns[0].name,
        subtasks: [
          {
            id: +new Date(),
            title: "",
            isCompleted: false,
          },
        ],
      };
    },
    //
    editTask: (state, { payload }) => {
      const update = state.overallData[state.activeBoardIndex].columns
        .find((col) => {
          return col.id === state.selectedTask.colId;
        })
        .tasks.map((task) => {
          if (task.id === payload.id) {
            task = payload;
            return task;
          }
          return task;
        });
      //
      state.overallData[state.activeBoardIndex].columns.find((col) => {
        return col.id === state.selectedTask.colId;
      }).tasks = update;
    },
    //
    deleteTask: (state, { payload }) => {
      const updatedTasks = state.overallData[state.activeBoardIndex].columns
        .find((col) => {
          return col.id === state.selectedTask.colId;
        })
        .tasks.filter((task) => task.id !== state.selectedTask.id);
      //
      state.overallData[state.activeBoardIndex].columns.find((col) => {
        return col.id === state.selectedTask.colId;
      }).tasks = updatedTasks;
    },
    //
    addNewTask: (state, { payload }) => {
      const activeCol = state.overallData[state.activeBoardIndex].columns.find(
        (col) => {
          return col.name === payload.status;
        }
      );
      state.overallData[state.activeBoardIndex].columns.find((col) => {
        return col.name === payload.status;
      }).tasks = [...activeCol.tasks, payload];
    },
    //
    changeActiveBoard: (state, { payload }) => {
      let newIndex = payload;
      if (state.overallData.length - 1 < payload) {
        newIndex = payload - 1;
      }
      if (newIndex < 0) {
        newIndex = 0;
      }
      state.activeBoardIndex = newIndex;
    },
    //
    changeToNewBoard: (state, { payload }) => {
      state.activeBoardIndex = state.overallData.length;
    },
    //
    setActiveBoardData: (state, { payload }) => {
      state.activeBoardData = payload;
    },
    //
    selectTask: (state, { payload }) => {
      state.selectedTask = payload;
    },
    //
    updateStatusFromViewTask: (state, { payload }) => {
      const { colId, taskId, newStatus } = payload;
      state.overallData[state.activeBoardIndex].columns
        .find((col) => col.id === colId)
        .tasks.find((task) => task.id === taskId).status = newStatus;
      state.selectedTask.status = newStatus;
    },
    //
    toggleSubTaskStatus: (state, { payload }) => {
      const { sub } = payload;
      state.selectedTask.subtasks.find((st) => {
        return st.id === sub.id;
      }).isCompleted = !state.selectedTask.subtasks.find((st) => {
        return st.id === sub.id;
      }).isCompleted;
      //
      state.overallData
        .find((b, bIndex) => {
          return b.id === state.activeBoardData.id;
        })
        .columns.find((col) => {
          return col.id === state.selectedTask.colId;
        })
        .tasks.find((task) => {
          // was on title
          return task.id === state.selectedTask.id;
        })
        .subtasks.find((st) => {
          return st.id === sub.id;
        }).isCompleted = state.selectedTask.subtasks.find((st) => {
        return st.id === sub.id;
      }).isCompleted;
    },
    //
  },
});

export const {
  changeActiveBoard,
  setActiveBoardData,
  selectTask,
  toggleSubTaskStatus,
  addNewTask,
  deleteTask,
  resetTaskInputValues,
  editTask,
  addNewBoard,
  editBoard,
  deleteBoard,
  resetBoardInputValues,
  handleDropInfo,
  handleItemCoords,
  checkNode,
  changeToNewBoard,
  updateStatusFromViewTask,
  updateTaskTargetStatus,
  updateTaskStatusToNewColTitle,
} = dataSlice.actions;

export default dataSlice.reducer;
