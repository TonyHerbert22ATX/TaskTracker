import { useState } from 'react'
import Header from './componets/Header'
import Tasks from './componets/Tasks'

const App = () => {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: "Doctors Appointment",
        day: "Feb 5th at 2:30pm",
        remainder: true,
    },
    {
        id: 2,
        text: "Meeting at School",
        day: "Feb 6th at 1:30pm",
        remainder: true,
    },
    {
        id: 3,
        text: "Food Shopping",
        day: "Feb 5th at 2:30pm",
        remainder: false,
    },
])

  return (
    <div className="container">
    <Header />
    <Tasks tasks={tasks} />
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
