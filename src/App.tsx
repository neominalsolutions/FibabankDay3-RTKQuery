import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Todo from "./features/todos/Todo";
import TodoItem from "./features/todos/TodoItem";

function App() {
  return (
    <div className="App">
      <TodoItem />
      <Todo />
    </div>
  );
}

export default App;
