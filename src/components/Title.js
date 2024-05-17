
import { useEffect, useReducer, useState } from 'react';
import Tasks from './Tasks';

function Title() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const now = new Date();
  //geting and setting date in a format.
  const date = `${now.toLocaleString('en-us',{month:'short'})} ${now.getDate()},
  ${now.toLocaleString('en-US',{hour: 'numeric', minute: 'numeric', hour12: true})}`

  const addTask = () => {
    const task = {
      title: title,
      date : date,
      complete: false
    }
    const newTask = [...tasks];

    newTask.push(task);
    setTasks(newTask);
    localStorage.setItem('tasklist', JSON.stringify(newTask));
    setTitle('');
  }

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasklist'));
    if(savedTasks) {
      setTasks(savedTasks);
    }
  },[]);

  const deleteTask = index => {
    const reducedTask = [...tasks];
    reducedTask.splice(index, 1);
    localStorage.setItem('tasklist', JSON.stringify(reducedTask));
    setTasks(reducedTask);
  };

  const completeTask = index => {
    const taskArray = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(taskArray);
    localStorage.setItem('tasklist', JSON.stringify(taskArray));
  }

  const editTask = index => {
    setEditIndex(index);
    setEditTitle(tasks[index].title);
  };

  const handleEditTitleChange = event => {
    setEditTitle(event.target.value);
  };

  const handleEditTitleSave = index => {
    const updatedTasks = [...tasks];
    updatedTasks[index].title = editTitle;
    setTasks(updatedTasks);
    setEditIndex(null);
    localStorage.setItem('tasklist', JSON.stringify(updatedTasks));
  };

  return (
    <>
      <section className='backdrop title grid'>
        <h1>Task Notebook</h1>
        <div className='flex input'>
          <input
            type='text'
            value={title}
            placeholder='Type your tasks here...'
            onChange={event => setTitle(event.target.value)}
          />
          <input
            type='submit'
            value='Add Task'
            className='btn'
            onClick={addTask}
            disabled={title === ''}
          />
        </div>
      </section>
      <Tasks  
        tasks={tasks} 
        deleteTask={deleteTask} 
        completeTask={completeTask} 
        editTask={editTask}
        editIndex={editIndex}
        editTitle={editTitle}
        handleEditTitleChange={handleEditTitleChange}
        handleEditTitleSave={handleEditTitleSave}
      />
    </>
  );
}

export default Title;
