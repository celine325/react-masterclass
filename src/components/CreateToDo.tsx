import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { selectedCatIdAtom, addToDoAtom } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [selectedCatId] = useAtom(selectedCatIdAtom);
  const addToDo = useSetAtom(addToDoAtom);
  const [error, setError] = useState("");

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    try {
      addToDo(toDo, selectedCatId);
      setValue("toDo", "");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <form onSubmit={handleSubmit(handleValid)}>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            {...register("toDo", { required: true })}
            placeholder="Add a todo"
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "3px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>
      </form>
      {error && (
        <div
          style={{
            marginTop: "5px",
            padding: "8px",
            background: "#ff4444",
            color: "white",
            borderRadius: "3px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default CreateToDo;
