import { fetchTodos, deleteTodo, editTodo, insertTodo } from "../../api/todos";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const _fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (user, { rejectWithValue }) => {
    try {

      if(!user) { return []; }

      const data = await fetchTodos(user.email);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const _deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const deletedId = await deleteTodo(todo.id);
      return deletedId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const _editTodo = createAsyncThunk(
  "todos/editTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const editedTodo = await editTodo(todo);
      return editedTodo;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  })

export const _insertTodo = createAsyncThunk(
  "todos/insertTodo",
  async ({ text, email, image_url }, { rejectWithValue }) => {
    try {

      const newTodo = await insertTodo({ text, email, image_url });
      return newTodo;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  });