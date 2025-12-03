import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/tasksSlice";

export default function TaskForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await dispatch(
      createTask({
        title,
        description,
        status,
      })
    );

    setTitle("");
    setDescription("");
    setStatus("todo");
  };

  return (
    <form onSubmit={submit}>
      {/* Title */}
      <input
        className="task-input"
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description */}
      <textarea
        className="task-input"
        style={{ marginTop: 10, minHeight: 70, resize: "vertical" }}
        placeholder="Description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Status select */}
      <select
        className="task-input"
        style={{ marginTop: 10 }}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>

      <button type="submit" className="btn-primary">
        Add Task
      </button>
    </form>
  );
}
