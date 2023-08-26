import styles from './App.module.css';
import { Header } from './components/Header';
import { PlusCircle, ClipboardText } from 'phosphor-react';

import './global.css';
import { Task } from './components/Task';
import { useEffect, useRef, useState } from 'react';
import { api } from "./lib/axios";

interface Task {
  id: string;
  name: string;
  description: string;
  type: string;
  label?: string;
  due: string;
  isDone: boolean;
}

export function App() {
  const fetchAPIUseEffect = useRef(true)

  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState('personal');
  const [newTaskDue, setNewTaskDue] = useState('');

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddNewTask() {
    console.log(newTaskName, newTaskDescription, newTaskType, newTaskType)
    if(newTaskName === '' || newTaskDescription === '' || newTaskType === ''){
      // use a lib to show toast.
      return window.alert('Fill form in a task to add')
    }

    api.post<{ task: Task }>('/tasks', {
      name: newTaskName,
      description: newTaskDescription,
      type: newTaskType,
      due: newTaskDue
    }).then(({ data, status }) => {
      if (status === 201) {
        setTasks(state => [...state, data.task])
      }
    })
  }

  async function fetchTasks() {
    await api.get<{ tasks: Task[] }>('/tasks')
      .then(({ data, status }) => {
        if (status === 200) {
          setTasks(data.tasks)
        }
      })
  }

  function updateTask(id: string) {
    const tasksArr = [...tasks]
    const taskIndex = tasksArr.findIndex(task => task.id === id)
    api.patch(`/tasks/${id}`, { isDone: !tasksArr[taskIndex].isDone })
      .then(({ status }) => {
        if (status === 200) {
          tasksArr[taskIndex].isDone = !tasksArr[taskIndex].isDone
          setTasks(tasksArr)
        }
      })
  }

  function deleteTask(id: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => task.id !== id)
    setTasks(tasksWithoutDeleteOne)
    api.delete(`/tasks/${id}`)
      .then(({ status }) => {
        if (status === 200) {
          setTasks(state => state.filter(task => task.id !== id))
        }
      })
  }

  useEffect(() => {
    if (fetchAPIUseEffect.current) {
      fetchAPIUseEffect.current = false
      fetchTasks()
    }
  }, [])


  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.newTask}>
          <input 
            type="text" 
            placeholder='Task name'
            value={newTaskName}
            onChange={e => setNewTaskName(e.target.value)}
          />

          <input 
            type="text" 
            placeholder='Task description'
            value={newTaskDescription}
            onChange={e => setNewTaskDescription(e.target.value)}
          />

          <select
            value={newTaskType} // ...force the select's value to match the state variable...
            onChange={e => setNewTaskType(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>

          <input 
            type="date" 
            value={newTaskDue}
            onChange={e => setNewTaskDue(e.target.value)}
          />

          <button
            type='button'
            onClick={handleAddNewTask}
          >
            Add
            <PlusCircle/>
          </button>
        </div>

        <main className={styles.main}>
          <div className={styles.header}>
            <span className={styles.allTasks}>Created tasks <span className={styles.badget}>{tasks.length}</span></span>
            <span className={styles.doneTasks}>Completed <span className={styles.badget}>{tasks.length > 0 ? `${tasks.filter(task => task.isDone).length} of ${tasks.length}` : '0'}</span></span>
          </div>

          <div className={styles.content}>
            {
              tasks.length === 0 ? 
              <div className={styles.emptyContent}>
                <ClipboardText size={56} />
                <p>You don't have tasks registered yet</p>
                <span>Create tasks and organize your to-do items</span>
              </div> 
              : 
              tasks.map(task => (
                <Task 
                  key={task.id} 
                  task={task}
                  onDeleteTask={deleteTask}
                  onUpdateTask={updateTask}
                />
              ))
            }
          </div>
        </main>
      </div>

    </div>
  )
}

