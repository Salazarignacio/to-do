import { ITask } from "../../models";

export type PropsTypes = {
  close: () => void;
  task?: ITask
};
