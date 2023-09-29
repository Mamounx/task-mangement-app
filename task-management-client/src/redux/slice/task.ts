import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
// @types
import { Task, TaskState } from '../../@types/task';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState: TaskState = {
    isLoading: false,
  error: null,
  tasks: null,
  task: null,
};

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET Tasks
    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.tasks = action.payload;
    },

    // GET Task
    getTaskSuccess(state, action) {
      state.isLoading = false;
      state.task = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
// export const { getMorePosts } = slice.actions;

// ----------------------------------------------------------------------

export function createTask(task: Task) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/tasks', task);
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

export function getAllTasks() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/tasks');
      dispatch(slice.actions.getTasksSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
    dispatch(slice.actions.stopLoading())
  };
}

// ----------------------------------------------------------------------

export function getTaskById(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/tasks/${id}`);
      dispatch(slice.actions.getTaskSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
    dispatch(slice.actions.stopLoading())
  };
}

// ----------------------------------------------------------------------

export function updateTaskById(task: Task) {
  return async () => {
    dispatch(slice.actions.startLoading());
    console.log(task)
    try {
      await axios.patch(`/tasks/${task.id}`, task);
      
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteTaskById(id: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/tasks/${id}`);
      
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
    dispatch(slice.actions.stopLoading())
  };
}