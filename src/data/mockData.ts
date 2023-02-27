import { StageEnum } from "../types/StageEnum";
import { TaskType } from "../types/TaskType";
import { v4 as uuid } from "uuid";

export const mockData: TaskType[] = [
  { id: uuid(), text: "todo", stage: StageEnum.Todo, priority: 0 },
  { id: uuid(), text: "todo2", stage: StageEnum.Todo, priority: 1 },
  { id: uuid(), text: "todo3", stage: StageEnum.Todo, priority: 2 },
  { id: uuid(), text: "todo4", stage: StageEnum.Todo, priority: 3 },
  {
    id: uuid(),
    text: "InProgress",
    stage: StageEnum.InProgress,
    priority: 0,
  },
  {
    id: uuid(),
    text: "InProgress2",
    stage: StageEnum.InProgress,
    priority: 1,
  },
];

export const mockPriorityCount: {
  [StageEnum.Todo]: number;
  [StageEnum.InProgress]: number;
  [StageEnum.ToBeReview]: number;
  [StageEnum.Done]: number;
} = {
  [StageEnum.Todo]: mockData.filter((task) => task.stage === StageEnum.Todo)
    .length,
  [StageEnum.InProgress]: mockData.filter(
    (task) => task.stage === StageEnum.InProgress
  ).length,
  [StageEnum.ToBeReview]: mockData.filter(
    (task) => task.stage === StageEnum.ToBeReview
  ).length,
  [StageEnum.Done]: mockData.filter((task) => task.stage === StageEnum.Done)
    .length,
};
