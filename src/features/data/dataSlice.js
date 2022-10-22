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
        title: "",
        isCompleted: false,
      },
    ],
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addNewBoard: (state, {payload}) => {
      const newBoards = [...state.overallData, payload]
      state.overallData = newBoards
    },
    editBoard: (state, {payload}) => {
      console.log(payload)
    },
    deleteBoard: (state, {payload}) => {
      console.log(payload)
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
      }).tasks = update
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
      state.activeBoardIndex = payload;
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
  deleteBoard,
  editBoard,
} = dataSlice.actions;

export default dataSlice.reducer;
