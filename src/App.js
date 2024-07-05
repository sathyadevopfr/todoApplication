import "./App.css";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";

function App() {
  const [isCompleteScreen, setCompleteScreen] = useState(false);
  const [allToDo, setToDo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Handler to add a new task
  const handleAddTo = () => {
    if (!newTitle || !newDescription) return; // Prevent adding empty tasks

    let newToDo = {
      title: newTitle,
      description: newDescription,
      completed: false, // Adding a flag for task completion
    };

    setToDo([...allToDo, newToDo]);
    setNewTitle(""); // Clear the title input
    setNewDescription(""); // Clear the description input
  };

  // Handler to delete a task
  const handleDelete = index => {
    let updatedToDo = [...allToDo];
    updatedToDo.splice(index, 1);
    setToDo(updatedToDo);
  };

  // Handler to mark a task as done
  const handleComplete = index => {
    let updatedToDo = [...allToDo];
    updatedToDo[index].completed = !updatedToDo[index].completed;
    setToDo(updatedToDo);
  };

  // Filter tasks based on the `isCompleteScreen` state
  const filteredToDo = allToDo.filter(todo =>
    isCompleteScreen ? todo.completed : !todo.completed
  );

  return (
    <div className="App">
      <h1>My ToDo's</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="What's the task title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder="What's the task description"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button type="button" className="pbutton" onClick={handleAddTo}>
              Add Task
            </button>
          </div>
        </div>

        <div className="btn">
          <button
            className={`sbtn ${!isCompleteScreen && "active"}`}
            onClick={() => setCompleteScreen(false)}
          >
            ToDo
          </button>
          <button
            className={`sbtn ${isCompleteScreen && "active"}`}
            onClick={() => setCompleteScreen(true)}
          >
            Done
          </button>
        </div>

        <div className="list-todo">
          {filteredToDo.map((x, index) => (
            <div className="list-todoin" key={index}>
              <div>
                <h3>{x.title}</h3>
                <p>{x.description}</p>
              </div>
              <div className="ic">
                <MdDeleteOutline
                  className="ico"
                  onClick={() => handleDelete(index)}
                />
                <MdOutlineDoneOutline
                  className={`ico-done ${x.completed ? "completed" : ""}`}
                  onClick={() => handleComplete(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
