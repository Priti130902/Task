import React from "react";
import { useSelector } from "react-redux";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const tasks = useSelector((s) => s.tasks.items || []);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const todo = tasks.filter(
    (t) =>
      t.status === "todo" ||
      !t.status ||
      t.status === "pending" // purane data ke liye
  ).length;

  const todoTasks = tasks.filter(
    (t) =>
      t.status === "todo" ||
      !t.status ||
      t.status === "pending"
  );
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="dashboard-title">Task Dashboard</h1>
        <p className="dashboard-subtitle">
          Organise your work into To do, In progress and Done.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="card">
          <div className="card-label">Total tasks</div>
          <div className="card-value">{total}</div>
        </div>
        <div className="card">
          <div className="card-label">To do</div>
          <div className="card-value amber">{todo}</div>
        </div>
        <div className="card">
          <div className="card-label">In progress</div>
          <div className="card-value">{inProgress}</div>
        </div>
        <div className="card">
          <div className="card-label">Done</div>
          <div className="card-value green">{done}</div>
        </div>
      </div>

      {/* Top: Add new task panel */}
      <div className="panel" style={{ marginBottom: 22 }}>
        <h2 className="panel-title">Add new task</h2>
        <TaskForm />
      </div>

           {/* KANBAN BOARD */}
      <div style={{ marginTop: 24 }} className="kanban-board">
        {/* To do column */}
        <div className="kanban-column">
          <div className="kanban-column-header todo">
            <div>
              <span className="kanban-dot" />
              <span className="kanban-title">To do</span>
            </div>
            <span className="kanban-count">{todoTasks.length}</span>
          </div>

          <div className="kanban-column-body">
            {todoTasks.length === 0 ? (
              <p className="task-list-empty">No tasks here</p>
            ) : (
              todoTasks.map((task) => (
                <TaskItem key={task._id} task={task} compact />
              ))
            )}
          </div>
        </div>

        {/* In progress column */}
        <div className="kanban-column">
          <div className="kanban-column-header progress">
            <div>
              <span className="kanban-dot" />
              <span className="kanban-title">In progress</span>
            </div>
            <span className="kanban-count">{inProgressTasks.length}</span>
          </div>

          <div className="kanban-column-body">
            {inProgressTasks.length === 0 ? (
              <p className="task-list-empty">No tasks here</p>
            ) : (
              inProgressTasks.map((task) => (
                <TaskItem key={task._id} task={task} compact />
              ))
            )}
          </div>
        </div>

        {/* Done column */}
        <div className="kanban-column">
          <div className="kanban-column-header done">
            <div>
              <span className="kanban-dot" />
              <span className="kanban-title">Done</span>
            </div>
            <span className="kanban-count">{doneTasks.length}</span>
          </div>

          <div className="kanban-column-body">
            {doneTasks.length === 0 ? (
              <p className="task-list-empty">No tasks here</p>
            ) : (
              doneTasks.map((task) => (
                <TaskItem key={task._id} task={task} compact />
              ))
            )}
          </div>
        </div>
      </div>

   </div>
  );
}
