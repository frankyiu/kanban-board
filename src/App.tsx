import React, { useState } from "react";
import { TaskType } from "./types/TaskType";
import { StageEnum } from "./types/StageEnum";
import Stage from "./component/Stage";
import Task from "./component/Task";
import { v4 as uuid } from "uuid";
import "./App.css";
import { mockData, mockPriorityCount } from "./data/mockData";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(mockData);
  const [priorityCount, setPriorityCount] = useState(mockPriorityCount);

  const changeStage = (
    taskId: string,
    newStage: StageEnum,
    newPriority?: number
  ) => {
    const priority = priorityCount[newStage];
    if (newPriority !== undefined) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === taskId // change target task
            ? { ...task, stage: newStage, priority: newPriority }
            : task.stage === newStage && task.priority >= newPriority // change after task priority
            ? { ...task, priority: task.priority + 1 }
            : task
        )
      );
    } else {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === taskId ? { ...task, stage: newStage, priority } : task
        )
      );
    }

    setPriorityCount({
      ...priorityCount,
      [newStage]: priority + 1,
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  };

  const addTask = (text: string, stage: StageEnum) => {
    const priority = priorityCount[stage];

    setTasks([...tasks, { id: uuid(), text, stage, priority }]);
    setPriorityCount({
      ...priorityCount,
      [stage]: priority + 1,
    });
  };

  const TaskList = ({ stage }: { stage: StageEnum }) => {
    return (
      <>
        {tasks
          .filter((task) => task.stage === stage)
          .sort((a, b) => a.priority - b.priority)
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              changeStage={changeStage}
            ></Task>
          ))}
      </>
    );
  };

  return (
    <div className="App">
      <h1>Kanban-board</h1>
      <div className="Container">
        <Stage
          stage={StageEnum.Todo}
          title={"Todo"}
          changeStage={changeStage}
          addTask={addTask}
        >
          <TaskList stage={StageEnum.Todo} />
        </Stage>
        <Stage
          stage={StageEnum.InProgress}
          title={"In Progress"}
          changeStage={changeStage}
          addTask={addTask}
        >
          <TaskList stage={StageEnum.InProgress} />
        </Stage>
        <Stage
          stage={StageEnum.ToBeReview}
          title={"To Be Review"}
          changeStage={changeStage}
          addTask={addTask}
        >
          <TaskList stage={StageEnum.ToBeReview} />
        </Stage>
        <Stage
          stage={StageEnum.Done}
          title={"Done"}
          changeStage={changeStage}
          addTask={addTask}
        >
          <TaskList stage={StageEnum.Done} />
        </Stage>
      </div>
    </div>
  );
}

export default App;
