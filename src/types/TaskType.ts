import { StageEnum } from "./StageEnum";

export type TaskType = {
  id: string;
  text: string;
  stage: StageEnum;
  priority: number;
};
