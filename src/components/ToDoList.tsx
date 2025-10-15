import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { toDoAtom } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

/*
export const addToDoAtom = atom(null, (get, set, text: string) => {
  const prev = get(toDoAtom);
  set(toDoAtom, [{ text, category: "TO_DO" }, ...prev]);
});
*/

function ToDoList() {
  const toDos = useAtomValue(toDoAtom);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
