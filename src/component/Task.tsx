import React from "react";
import { TaskType } from "../types/TaskType";
import { MdDeleteForever } from "react-icons/md";
import { StageEnum } from "../types/StageEnum";

type Props = {
  task: TaskType;
  deleteTask: (taskId: string) => void;
  changeStage: (taskId: string, newStage: StageEnum, priority: number) => void;
};

export default function Task({ task, deleteTask, changeStage }: Props) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "copyMove";
    e.dataTransfer.setData("id", task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    deleteTask(task.id);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.stopPropagation();
    changeStage(e.dataTransfer.getData("id"), task.stage, task.priority);
  };

  return (
    <div
      className="task"
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    >
      <div>{task.text}</div>
      <MdDeleteForever size={20} onClick={handleDelete} />
    </div>
  );
}
