import { async } from "../utils";
import axiosInstance from "./axios.services";


export const setTodo = async ({title,description,imageUrl,status,reminder})=>{
    const userid = await async.getJsonAsync('user'); 
    const user = "664f09254768c0258f5413f1" 
    const body={title,description,imageUrl,status,reminder,user}
    
    return axiosInstance
        .post('/todo/set-todo',body)
        .then((res)=> res.data)
        .catch(err=>console.log(err))
}

export const getTodo = async ()=>{
    const userid = await async.getJsonAsync('user'); 

    return axiosInstance
        .post('/todo/get-todo',{user})
        .then(res=>res.data)
        .catch(err=>console.log(err))
}


export const update = async ({title,discription,imageurl,status,reminder,editTodoId})=>{
    const userid = await async.getJsonAsync('user'); 

    const body={title,discription,imageurl,status,reminder,userid,todoid:editTodoId}

    return axiosInstance
        .post('/todo/update-todo',body)
        .then((res)=>res.data)
        .catch(err=>console.log(err))

}


export const deleteTodo = async ({todoid})=>{
    const userid = await async.getJsonAsync('user'); 
    
    return axiosInstance
        .post('/todo/delete-todo',{userid,todoid})
        .then((res)=>res.data)
        .catch((err)=>console.log(err))
}