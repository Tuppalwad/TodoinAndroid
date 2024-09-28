import { create } from 'zustand';

export const useStore = create((set) => ({
  baseURL: "http://192.168.1.102:3000/api/",
  todoList: [],
  token: null,
  user: null,
  openModel: false,
  editTodoId: null,
  refresh:false,
  setRefresh:(refresh) => set(()=>{refresh}),
  setEditTodoId: (editTodoId) => set(() => ({ editTodoId })),
  setOpenModel: (openModel) => set(() => ({ openModel })),
  setToken: (token) => set(() => ({ token })),
  setUser: (user) => set(() => ({ user })),
  setTodoList: (todoList) => set(() => ({ todoList })),
  removeTodo: (id) => set((state) => ({ todoList: state.todoList.filter((todo) => todo.id !== id) })),
  setStatus: (id) => set((state) => ({ todoList: state.todoList.map((todo) => (todo.id === id ? { ...todo, status: !todo.status } : todo) ) })),

}));



import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import appReducer from '../reducers'
const store = createStore(appReducer, {}, applyMiddleware(thunk));

export default store ;