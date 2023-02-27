import React, { useState } from "react";
import { StageEnum } from "../types/StageEnum";

type Props = {
  open: boolean;
  stage: StageEnum;
  addTask: (text: string, stage: StageEnum) => void;
  setOpen: (open: boolean) => void;
};

export default function Dialog({ open, stage, addTask, setOpen }: Props) {
  const [taskText, setTaskText] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    addTask(taskText, stage);
    setOpen(false);
    setTaskText("");
  };

  const handleCancel = (e: React.MouseEvent) => {
    setOpen(false);
    setTaskText("");
  };

  return (
    <dialog open={open}>
      <div>Add a task</div>
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      ></input>
      <button onClick={handleCancel}>cancel</button>
      <input type={"submit"} value="Submit" onClick={handleSubmit} />
    </dialog>
  );
}
