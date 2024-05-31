import './App.css';
import { TaskListItem, Task } from './components/taskListItem';
import { addTaskOnServer, clearTaskFromServer, deleteTaskFromServer, editTaskOnServer, getTasksFromServer } from './api';
import { useEffect, useState } from 'react';
import { title } from 'process';
import { promises } from 'dns';



function App() {

  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [intputDescription, setInputDescription] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Completed" | "Pending">("All")

  const fetchTasks = async (): Promise<void> => {
    try {
      const dataFromResponse = await getTasksFromServer()
      setTasks(dataFromResponse)
    } catch (err) {
      throw err
    }
  }

  const addNewTask = async (): Promise<void> => {
    await addTaskOnServer(inputTitle, intputDescription)
    setInputDescription("")
    setInputTitle("")
    fetchTasks()
  }

  const deleteTask = async (id: string): Promise<void> => {
    await deleteTaskFromServer(id)
    await fetchTasks()
  }

  const editTask = async (task: Task): Promise<void> => {
    await editTaskOnServer(task)
    await fetchTasks()
  }


  const clearAllTasks = async (): Promise<void> => {
    await clearTaskFromServer()
    await fetchTasks()
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
      <header>
        <h1>TODO APP USING TS</h1>
      </header>
      <div className='Wrapper'>
        <section className='Inputs'>
          <div className="InputItem">
            <label htmlFor='title'>Title</label>
            <input type='text' placeholder='Enter your task' value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></input>
          </div>
          <div className="InputItem">
            <label htmlFor="description">Description</label>
            <input type='text' placeholder='Something about task.' value={intputDescription} onChange={(e) => setInputDescription(e.target.value)}></input>
          </div>
          <button className='InputButton active' onClick={addNewTask}>Add</button>
        </section>
        <section className='Actions'>
          <div className='Filters'>
            <button className={activeFilter === "All" ? 'Active' : ""} onClick={() => setActiveFilter("All")}>All</button>
            <button className={activeFilter === "Pending" ? 'Active' : ""} onClick={() => setActiveFilter("Pending")}>Pending</button>
            <button className={activeFilter === "Completed" ? 'Active' : ""} onClick={() => setActiveFilter("Completed")}>Completed</button>
          </div>
          <button className='Clear' onClick={clearAllTasks}>Clear</button>
        </section>
        <section className='TasksList'>
          {tasks.map((item, index) => {
            if (activeFilter === "Completed" && item.status === "Pending") return null
            if (activeFilter === "Pending" && item.status === "Completed") return null
            return <TaskListItem key={item.id} task={item} onDelete={deleteTask} onEditing={editTask} />
          })}
        </section>
      </div>
    </>
  );
}

export default App;
