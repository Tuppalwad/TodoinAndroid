import { act } from "../utils"
const BASE_URL = act.BASE_URL
const INITIAL_STATE = {
    todolist :'',
    editTodoId :null,
    refresh:false,
    openModel:false,
}

export default  (state = INITIAL_STATE, action)=>{
    switch (action.type) {
        case act.SET_TODO_LIST:
            return {
                ...state,
                todoList:action.payload
            }
        case act.SET_EDIT_TODO_ID:
            return {
                ...state,
                editTodoId:action.payload
            }

        case act.SET_OPEN_MODEL:
            return {
                ...state,
                openModel:action.payload
            }
        case act.SET_REFRESH:
            return {
                ...state,
                refresh:action.payload
            }
        default:
            return state
    }
}
