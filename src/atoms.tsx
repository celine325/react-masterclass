import { atom } from "jotai";

export interface IToDo {
  text: string;
  id: number;
  category: CategoryList;
}

export const toDoAtom = atom<IToDo[]>([]);

export type CategoryList = "TO_DO" | "DOING" | "DONE";

export const categoryAtom = atom<CategoryList>("TO_DO");

export const toDoSelector = atom((get) => {
  const toDos = get(toDoAtom);
  const category = get(categoryAtom);
  return toDos.filter((toDo) => toDo.category === category);
});
