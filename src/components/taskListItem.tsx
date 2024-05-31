import React, { useState } from "react";
import { MdClear, MdEdit, MdDone } from "react-icons/md";

export interface Task {
  title: string,
  description: string,
  status: "Completed" | "Pending"
  id: string
}

export interface TaskItem {
  task: Task
  onDelete: (id: string) => Promise<void>
  onEditing: (task: Task) => Promise<void>
}




export const TaskListItem: React.FC<TaskItem> = ({ task, onDelete, onEditing }) => {
  const [editing, setEditing] = useState<boolean>(false)
  let [taskTitleInput, setTaskTitleInput] = useState<string>(task.title)
  let [taskDescriptionInput, setTaskDescriptionInput] = useState<string>(task.description)


  const HandelFinishEditing = () => {
    let updatedTask: Task = {
      title: taskTitleInput,
      description: taskDescriptionInput,
      id: task.id,
      status: task.status
    }
    onEditing(updatedTask)
    setEditing(false)
  }

  const HandelCompleteTask = () => {
    let updatedTask: Task = {
      title: taskTitleInput,
      description: taskDescriptionInput,
      id: task.id,
      status: "Completed"
    }
    onEditing(updatedTask)
    setEditing(false)
  }

  return (
    <div key={task.id} className="TaskItem">
      {
        !editing
          ?
          <div>
            <h3 className="TaskTitle">{task.title} {task.status === 'Completed' ? "(Completed)" : ""}</h3>
            <p className="TaskDescription">{task.description}</p>
          </div>
          :
          <div>
            <input className="TaskTitleInput" value={taskTitleInput} onChange={e => setTaskTitleInput(e.target.value)} />
            <br />
            <input className="TaskDescriptionInput" value={taskDescriptionInput} onChange={e => setTaskDescriptionInput(e.target.value)} />
          </div>
      }
      {
        !editing
          ?
          <div>
            {task.status === 'Pending' ? <MdDone className="TaskActions Done" onClick={() => HandelCompleteTask()} /> : null}
            <MdEdit className="TaskActions Edit" onClick={() => setEditing(true)} />
            <MdClear className="TaskActions Delete" onClick={() => onDelete(task.id)} />
          </div>
          :
          <div>
            <MdDone className="TaskActions Done" onClick={() => HandelFinishEditing()} />
          </div>
      }
    </div>
  )
}
