import { useAtom, useSetAtom } from "jotai";
import {
  IToDo,
  categoriesAtom,
  moveToDoAtom,
  deleteToDoAtom,
} from "../atoms";

function ToDo({ text, categoryId, id }: IToDo) {
  const [categories] = useAtom(categoriesAtom);
  const moveToDo = useSetAtom(moveToDoAtom);
  const deleteToDo = useSetAtom(deleteToDoAtom);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    moveToDo(id, e.target.value);
  };

  const handleDelete = () => {
    deleteToDo(id);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px",
        background: "#f9f9f9",
        borderRadius: "3px",
        marginBottom: "5px",
      }}
    >
      <span style={{ flex: 1, color: "#000" }}>{text}</span>
      <select
        value={categoryId}
        onChange={handleCategoryChange}
        style={{
          padding: "4px 8px",
          borderRadius: "3px",
          border: "1px solid #ddd",
          fontSize: "12px",
          cursor: "pointer",
        }}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleDelete}
        style={{
          padding: "4px 8px",
          background: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default ToDo;
