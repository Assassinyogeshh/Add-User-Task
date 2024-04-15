import { createSlice } from "@reduxjs/toolkit";
import { addUserTask, handleLocalStorage, updateUserTask } from "./taskService";




const initialState={
    isLoading:false,
    isSuccess:false,
    isError:false,
    tasks:handleLocalStorage(),
}


 const userTaskSlice= createSlice({
    name:'userTask',
    initialState,
     reducers:{
     addTask : (state, action)=>{
     state.tasks.push(action.payload);
     addUserTask(state.tasks);

        },

      updateTask:(state, action)=>{

        const {id, updatedTask }= action.payload 
        

        const foundUser= state.tasks.find(task=> task.id === id);


         if (foundUser) {
            
            foundUser.task= updatedTask

         }

         updateUserTask(state.tasks)
         
      },

      completeTask:(state, action)=>{

        try {
            
      
         const {id} = action.payload;

         const getUser= state.tasks.find(task=> task.id === id);

         if (getUser) {

           getUser.completed = !getUser.completed

            localStorage.setItem(`userTasks`, JSON.stringify(state.tasks));
         }

        } catch (error) {
            console.log(error);
        }

      },

      deleteTask:(state, action)=>{

        try {
            const {id}= action.payload;


            state.tasks = state.tasks.filter(task => task.id !== id);

        localStorage.setItem('userTasks', JSON.stringify(state.tasks))
            
        } catch (error) {
            console.log(error);
        }

      },



      setLoading: (state, action) => {
        state.isLoading = action.payload;
      },

      setSuccess: (state, action) => {
        state.isSuccess = action.payload;
      },

      setError: (state, action) => {
        state.isError = action.payload;
      },  
     }
})


export const {setLoading, setError, setSuccess, addTask, updateTask, completeTask, deleteTask} = userTaskSlice.actions

export default userTaskSlice;