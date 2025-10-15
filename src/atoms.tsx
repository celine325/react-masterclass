import { atom } from "jotai";

export interface IToDo {
  text: string;
  id: number;
  category: Category;
}

export const toDoAtom = atom<IToDo[]>([]);

type Category = "TO_DO" | "DOING" | "DONE";
