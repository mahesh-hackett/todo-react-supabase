import { createSlice } from "@reduxjs/toolkit";
import { _fetchTodos, _deleteTodo, _editTodo, _insertTodo } from '../api.helpers/todos';
import { _uploadImageAndGetPublicUrl } from "../api.helpers/global";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [{
            text: 'Learn Redux Toolkit',
            is_completed: false
        }],
        isLoading: false,
        fetchError: null,
        isEdit: false,
        editTodo: null,
        todoText: '',
        itemToBeDeleted: null,
        isDeleteInProgress: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(_fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.isLoading = false;
            })
            .addCase(_fetchTodos.rejected, (state, action) => {
                state.fetchError = action.payload;
            })
            .addCase(_fetchTodos.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(_deleteTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            })
            .addCase(_deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchError = action.payload;
            })

            .addCase(_editTodo.pending, (state) => {
                state.isLoading = true;
                state.previousTodos = [...state.todos];
            })
            .addCase(_editTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                );
                state.isEdit = false;
                state.todoText = '';
            })
            .addCase(_editTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchError = action.payload;
                if (state.previousTodos) {
                    state.todos = state.previousTodos;
                    delete state.previousTodos;
                }
            })

            .addCase(_insertTodo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_insertTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = [...state.todos, action.payload];
                state.todoText = '';
            })
            .addCase(_insertTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchError = action.payload;
            })

            .addCase(_uploadImageAndGetPublicUrl.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(_uploadImageAndGetPublicUrl.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log('Image uploaded, URL:', action.payload);
            })
            .addCase(_uploadImageAndGetPublicUrl.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchError = action.payload;
            })

    },
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                text: action.payload.text,
                is_completed: action.payload.is_completed
            }
            state.todos.push(newTodo)
        },
        editModeOn: (state, action) => {
            state.editTodo = action.payload.todo;
            state.isEdit = true;
        },
        setTodoText: (state, action) => {
            state.todoText = action.payload.todoText;
        },
        editTodo: (state, action) => {
            const text = action.payload.text;
            state.todos[state.editTodo].text = text;
            state.isEdit = false;
            state.todoText = '';
        },
        setItemToBeDeleted: (state, action) => {
            state.itemToBeDeleted = action.payload.todo;
        }
    }
})

export default todoSlice.reducer;
export const {
    addTodo,
    deleteTodo,
    editModeOn,
    setTodoText,
    editTodo,
    setItemToBeDeleted
} = todoSlice.actions;