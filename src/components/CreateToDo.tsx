import { useAtom } from "jotai";
import { toDoAtom } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}
function CreateToDo() {
  const [toDos, setToDos] = useAtom(toDoAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
