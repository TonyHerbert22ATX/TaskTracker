import { useState, useEffect } from 'react'
import Header from './componets/Header'
import Tasks from './componets/Tasks'
import AddTask from './componets/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    // !These objects are in the db.json to send to mock server
    // {
    //     id: 1,
    //     text: "Doctors Appointment",
    //     day: "Feb 5th at 2:30pm",
    //     reminder: true,
    // },
    // {
    //     id: 2,
    //     text: "Meeting at School",
    //     day: "Feb 6th at 1:30pm",
    //     reminder: true,
    // },
    // {
    //     id: 3,
    //     text: "Food Shopping",
    //     day: "Feb 5th at 2:30pm",
    //     reminder: false,
    // },
])

useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

  getTasks()
}, [])

// * Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

// * Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

// * Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  console.log(task);
  // ? This is if we do not use a server. This just created an unqiue id. 
  // const id = Math.floor(Math.random()*10000)+ 1
  // console.log(id)
  // const newTask = { id, ...task }
  // setTasks([...tasks,newTask])
}

// * Delete Task
const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }


// * Toggle Reminder
const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <div className="container">
    <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} />
    {showAddTask && <AddTask onAdd={addTask} />}
    {tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
    </div>

  );
}

// ? This is how to do a class component 
// import React from 'react'
// class App extends React.Component {
//   render(){
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
