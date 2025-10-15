import { atom } from "jotai";

export interface IToDo {
  text: string;
  id: number;
  category: Category;
}

export const toDoAtom = atom<IToDo[]>([]);

type Category = "TO_DO" | "DOING" | "DONE";

export const toDoSelector = atom((get) => {
  const toDos = get(toDoAtom);
  return [
    toDos.filter((t) => t.category === "TO_DO"),
    toDos.filter((t) => t.category === "DOING"),
    toDos.filter((t) => t.category === "DONE"),
  ] as const;
});
