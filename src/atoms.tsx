import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Category interface
export interface Category {
  id: string;
  name: string;
  color?: string;
}

// ToDo interface with categoryId
export interface IToDo {
  text: string;
  id: number;
  categoryId: string;
}

// Default categories
const defaultCategories: Category[] = [
  { id: "TO_DO", name: "To Do", color: "#3498db" },
  { id: "DOING", name: "Doing", color: "#f39c12" },
  { id: "DONE", name: "Done", color: "#2ecc71" },
];

// Persistent atoms
export const categoriesAtom = atomWithStorage<Category[]>(
  "categories",
  defaultCategories
);

export const toDoAtom = atomWithStorage<IToDo[]>("toDoList", []);

export const selectedCatIdAtom = atomWithStorage<string>(
  "selectedCategoryId",
  "TO_DO"
);

// Derived atom: filtered todos by selected category
export const filteredToDosAtom = atom((get) => {
  const toDos = get(toDoAtom);
  const selectedCatId = get(selectedCatIdAtom);
  return toDos.filter((toDo) => toDo.categoryId === selectedCatId);
});

// Write-only atom: add a new category
export const addCategoryAtom = atom(
  null,
  (get, set, name: string, color?: string) => {
    const categories = get(categoriesAtom);

    // Validate: no empty or duplicate names
    const trimmedName = name.trim();
    if (!trimmedName) {
      throw new Error("Category name cannot be empty");
    }
    if (categories.some((cat) => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      throw new Error("Category name already exists");
    }

    const newCategory: Category = {
      id: `cat_${Date.now()}`,
      name: trimmedName,
      color: color || "#95a5a6",
    };

    set(categoriesAtom, [...categories, newCategory]);
  }
);

// Write-only atom: rename a category
export const renameCategoryAtom = atom(
  null,
  (get, set, categoryId: string, newName: string) => {
    const categories = get(categoriesAtom);
    const trimmedName = newName.trim();

    if (!trimmedName) {
      throw new Error("Category name cannot be empty");
    }
    if (categories.some((cat) => cat.id !== categoryId && cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      throw new Error("Category name already exists");
    }

    set(
      categoriesAtom,
      categories.map((cat) =>
        cat.id === categoryId ? { ...cat, name: trimmedName } : cat
      )
    );
  }
);

// Write-only atom: remove a category
export const removeCategoryAtom = atom(
  null,
  (get, set, categoryId: string, fallbackCategoryId: string) => {
    const categories = get(categoriesAtom);
    const toDos = get(toDoAtom);
    const selectedCatId = get(selectedCatIdAtom);

    // Prevent removing if it's the last category
    if (categories.length <= 1) {
      throw new Error("Cannot delete the last category");
    }

    // Move all todos from deleted category to fallback
    set(
      toDoAtom,
      toDos.map((todo) =>
        todo.categoryId === categoryId
          ? { ...todo, categoryId: fallbackCategoryId }
          : todo
      )
    );

    // Remove the category
    set(
      categoriesAtom,
      categories.filter((cat) => cat.id !== categoryId)
    );

    // If we're viewing the deleted category, switch to fallback
    if (selectedCatId === categoryId) {
      set(selectedCatIdAtom, fallbackCategoryId);
    }
  }
);

// Write-only atom: add a new todo
export const addToDoAtom = atom(
  null,
  (get, set, text: string, categoryId: string) => {
    const toDos = get(toDoAtom);
    const trimmedText = text.trim();

    if (!trimmedText) {
      throw new Error("Todo text cannot be empty");
    }

    const newToDo: IToDo = {
      text: trimmedText,
      id: Date.now(),
      categoryId,
    };

    set(toDoAtom, [...toDos, newToDo]);
  }
);

// Write-only atom: move a todo to another category
export const moveToDoAtom = atom(
  null,
  (get, set, todoId: number, newCategoryId: string) => {
    const toDos = get(toDoAtom);
    set(
      toDoAtom,
      toDos.map((todo) =>
        todo.id === todoId ? { ...todo, categoryId: newCategoryId } : todo
      )
    );
  }
);

// Write-only atom: delete a todo
export const deleteToDoAtom = atom(null, (get, set, todoId: number) => {
  const toDos = get(toDoAtom);
  set(
    toDoAtom,
    toDos.filter((todo) => todo.id !== todoId)
  );
});
