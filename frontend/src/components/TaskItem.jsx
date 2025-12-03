import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/tasksSlice";

export default function TaskItem({ task, compact = false }) {
  const dispatch = useDispatch();
  if (!task) return null;

  const status = task.status || "todo";

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(task._id));
    }
  };

  const cycleStatus = () => {
    // todo -> in-progress -> done -> todo
    let next = "todo";
    if (status === "todo" || status === "pending") next = "in-progress";
    else if (status === "in-progress") next = "done";
    else if (status === "done") next = "todo";

    dispatch(
      updateTask({
        id: task._id,
        data: { status: next },
      })
    );
  };

  return (
    <div className={compact ? "task-card" : "task-item"}>
      <div className="task-card-main">
        <div className="task-card-title">{task.title}</div>
        {task.description && (
          <div className="task-card-desc">{task.description}</div>
        )}
      </div>

      <div className="task-card-footer">
        <span
          className={
            status === "done"
              ? "badge-done"
              : status === "in-progress"
              ? "badge-progress"
              : "badge-pending"
          }
        >
          {status === "done"
            ? "Done"
            : status === "in-progress"
            ? "In progress"
            : "To do"}
        </span>

        <div className="task-card-actions">
          <button className="task-complete" onClick={cycleStatus}>
            Next
          </button>
          <button className="task-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
