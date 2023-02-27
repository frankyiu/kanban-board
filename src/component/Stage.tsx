import React, { useState } from "react";
import { StageEnum } from "../types/StageEnum";
import { GrAdd } from "react-icons/gr";
import Dialog from "./Dialog";

type Props = {
  stage: StageEnum;
  title: string;
  children?: JSX.Element | JSX.Element[];
  changeStage: (taskId: string, newStage: StageEnum) => void;
  addTask: (text: string, stage: StageEnum) => void;
};

export default function Stage({
  stage,
  title,
  children,
  changeStage,
  addTask,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent) => {
    changeStage(e.dataTransfer.getData("id"), stage);
  };

  const handleAdd = (e: React.MouseEvent) => {
    setOpen(true);
  };
  return (
    <>
      <Dialog open={open} setOpen={setOpen} stage={stage} addTask={addTask} />
      <div
        className="Stage"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <div className={`title stage-${stage}`}>{title}</div>
        <div className="new-task-btn" onClick={handleAdd}>
          <GrAdd />
        </div>
        {children}
      </div>
    </>
  );
}
