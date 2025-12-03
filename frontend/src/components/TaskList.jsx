import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/tasks/tasksSlice";
import TaskItem from "./TaskItem";



export default function TaskList() {
  const dispatch = useDispatch();
  const tasksState = useSelector((s) => s.tasks);
  const tasks = tasksState?.items || [];
  const loading = tasksState?.loading || false;

  const [filter, setFilter] = useState("all"); // all | done | pending

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = (tasks || []).filter((task) => {
    if (!task) return false; // ✅ undefined/null ignore
    if (filter === "done") return task.status === "done";
    if (filter === "pending") return task.status !== "done";
    return true;
  });

  if (loading) {
    return <p className="task-list-empty">Loading your tasks...</p>;
  }

  return (
    <div>
      {/* Filter buttons */}
      <div className="filter-bar">
        <button
          className={filter === "all" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "done" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("done")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* List */}
      {filteredTasks.length === 0 ? (
        <p className="task-list-empty">No tasks found</p>
      ) : (
        filteredTasks
          .filter(Boolean) // ✅ double safety
          .map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  );
}
