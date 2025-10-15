import { useAtomValue } from "jotai";
import { filteredToDosAtom } from "../atoms";
import CategorySelect from "./CategorySelect";
import CategoryManager from "./CategoryManager";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useAtomValue(filteredToDosAtom);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>To Do List</h1>

      <CategoryManager />

      <div style={{ marginBottom: "15px" }}>
        <CategorySelect />
      </div>

      <CreateToDo />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
