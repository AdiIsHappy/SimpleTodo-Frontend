import exp from "constants";
import { Task } from "./components/taskListItem";
import { title } from "process";
import { error } from "console";


const API_URI: string = "http://192.168.31.135:3003"

interface ApiTask {
  title: string;
  description: string;
  active: boolean;
  id: string;
}




export const getTasksFromServer = async (): Promise<Task[]> => {
  try {
    let response = await fetch(`${API_URI}/tasks`);
    if (!response.ok) {
      throw new Error("Unable to fetch tasks");
    }
    let dataFromResponse: ApiTask[] = await response.json();
    console.log(dataFromResponse)
    let tasksData: Task[] = dataFromResponse.map((e, i) => {
      return {
        title: e.title,
        description: e.description,
        status: e.active ? "Pending" : "Completed",
        id: e.id
      }
    })
    return tasksData;
  } catch (error) {
    throw error
  }
}

export const addTaskOnServer = async (title: string, description: string): Promise<void> => {
  try {
    let data = {
      title: title,
      description: description,
      active: true
    }
    let response = await fetch(`${API_URI}/create`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error("Unable to add Task")
    }
  } catch (error) {
    throw error
  }
}

export const clearTaskFromServer = async (): Promise<void> => {
  try {
    let response = await fetch(`${API_URI}/clear`, {
      method: "DELETE"
    })
    if (!response.ok) {
      throw new Error("Unable to clear tasks")
    }
  } catch (error) {
    throw error
  }
}

export const deleteTaskFromServer = async (id: string): Promise<void> => {
  try {
    let response = await fetch(`${API_URI}/delete/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Unable to delete task ${id}`)
    }
  } catch (error) {
    throw error
  }
}


export const editTaskOnServer = async (task: Task): Promise<void> => {
  try {
    const data = {
      title: task.title,
      description: task.description,
      active: task.status === "Pending"
    }
    let response = await fetch(`${API_URI}/edit/${task.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`Unable to delete task ${task.id}`)
    }

  } catch (error) {
    throw error
  }
}
