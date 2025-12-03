import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// ✅ FETCH TASKS
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await API.get("/tasks");
  return res.data;
});

// ✅ CREATE TASK
export const createTask = createAsyncThunk("tasks/create", async (payload) => {
  const res = await API.post("/tasks", payload);
  return res.data;
});

// ✅ UPDATE TASK
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }) => {
    const res = await API.put(`/tasks/${id}`, data);
    return res.data;
  }
);

// ✅ ✅ ✅ DELETE TASK — YEHI MISSING THA TUMHARE PROJECT ME
export const deleteTask = createAsyncThunk("tasks/delete", async (id) => {
  await API.delete(`/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })

      // ✅ CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // ✅ UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.items = state.items.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
      })

      // ✅ ✅ ✅ DELETE REDUCER
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (t) => t._id !== action.payload
        );
      });
  },
});

export default tasksSlice.reducer;
