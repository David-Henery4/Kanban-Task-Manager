import { createSlice } from "@reduxjs/toolkit";
import InitialTaskData from "../../data.json";

const initialState = {
  overallData: InitialTaskData.boards,
  activeBoardIndex: 0,
  activeBoardData: {},
  selectedTask: {},
  checkValues: [],
  emptyTaskInputValues: {
    id: +new Date(),
    title: "",
    description: "",
    status: "",
    subtasks: [
      {
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
    updateTaskStatus: (state, {payload}) => {
      const {id, name} = payload
      state.overallData[state.activeBoardIndex].columns.find((col) => col.id === id).tasks.map((task) => task.status = name)
    },
    checkNode: (state,{payload}) => {
      state.itemNode = payload
    },
    handleItemCoords: (state, {payload}) => {
      state.itemCoords = payload
    },
    handleDropInfo: (state, {payload}) => {
      state.overallData[state.activeBoardIndex].columns = payload
      // const {colIndex, taskIndex, currentItem} = payload
      // console.log(currentItem)
      // console.log(state.overallData[state.activeBoardIndex])
      // const cols = state.overallData[state.activeBoardIndex].columns
      // const newCols = cols[colIndex].tasks.splice(taskIndex, 0, cols[currentItem.colIndex].tasks.splice(currentItem.taskIndex, 1)[0])
      //
      // state.overallData[state.activeBoardIndex].columns = newCols
      //
      // const {e,colName} = payload
      // const id = e.dataTransfer.getData("id")
      // const newCols = state.overallData[state.activeBoardIndex].columns.map((col) => {
      //   const newTasks = col.tasks.filter((task) => {
      //     if(task.id === +id){
      //       task.status = colName
      //     }
      //     return task
      //   })
      //   return {...col, tasks: newTasks}
      // })
      // state.checkValues = newCols
      // state.overallData[state.activeBoardIndex].columns = newCols
    },
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
    addNewBoard: (state, { payload }) => {
      const newBoards = [...state.overallData, payload];
      state.overallData = newBoards;
    },
    deleteBoard: (state, { payload }) => {
      const updatedBoards = state.overallData.filter(
        (board) => board.id !== state.activeBoardData.id
      );
      state.overallData = updatedBoards;
    },
    editBoard: (state, { payload }) => {
      const updatedBoards = state.overallData.map((board) => {
        if (board.id !== payload.id) return board;
        return (board = payload);
      });
      state.overallData = updatedBoards;
    },
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
            title: "",
            isCompleted: false,
          },
        ],
      };
    },
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
    changeActiveBoard: (state, { payload }) => {
      let newIndex = payload
      if (state.overallData.length - 1 < payload) {
        newIndex = payload - 1
      }
      if (newIndex < 0){
        newIndex = 0
      }
      state.activeBoardIndex = newIndex;
    },
    changeToNewBoard: (state, {payload}) => {
      console.log(state.overallData.length - 1);
      state.activeBoardIndex = state.overallData.length - 1
    },
    setActiveBoardData: (state, { payload }) => {
      state.activeBoardData = payload;
    },
    selectTask: (state, { payload }) => {
      state.selectedTask = payload;
    },
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
  updateTaskStatus,
  changeToNewBoard
} = dataSlice.actions;

export default dataSlice.reducer;
