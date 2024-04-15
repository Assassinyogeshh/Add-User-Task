
export const handleLocalStorage=()=>{
    try {
        const userTask= localStorage.getItem('userTasks');
        return userTask? JSON.parse(userTask):[];
    } catch (error) {
        return []
    }
}


export const addUserTask= (task)=>{

try {
  
    const taskJson= JSON.stringify(task)
    localStorage.setItem('userTasks', taskJson);

} catch (error) {
    console.log("Failed To Add Task",error);
}

}
export const updateUserTask= (updatedData)=>{

try {
   
         localStorage.setItem(`userTasks`, JSON.stringify(updatedData));

} catch (error) {
    console.log("Failed To Add Task",error);
}

}