import { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  categoriesAtom,
  addCategoryAtom,
  renameCategoryAtom,
  removeCategoryAtom,
} from "../atoms";

function CategoryManager() {
  const [categories] = useAtom(categoriesAtom);
  const addCategory = useSetAtom(addCategoryAtom);
  const removeCategory = useSetAtom(removeCategoryAtom);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleAddCategory = () => {
    try {
      addCategory(newCategoryName);
      setNewCategoryName("");
      setError("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    const fallbackCategory = categories.find((cat) => cat.id !== categoryId);
    if (!fallbackCategory) return;

    removeCategory(categoryId, fallbackCategory.id);
  };

  return (
    <div
      style={{
        padding: "15px",
        background: "#f5f5f5",
        borderRadius: "5px",
        marginBottom: "15px",
      }}
    >
      <h3 style={{ marginBottom: "10px", color: "#000" }}>Categories</h3>

      {error && (
        <div
          style={{
            padding: "8px",
            background: "#ff4444",
            color: "white",
            borderRadius: "3px",
            marginBottom: "10px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category"
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={handleAddCategory}
          style={{
            padding: "8px 12px",
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

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              background: "white",
              borderRadius: "3px",
              marginBottom: "5px",
            }}
          >
            <span style={{ flex: 1, color: "#000" }}>{category.name}</span>
            <button
              onClick={() => handleRemoveCategory(category.id)}
              disabled={categories.length <= 1}
              style={{
                padding: "4px 8px",
                background: categories.length <= 1 ? "#ddd" : "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: categories.length <= 1 ? "not-allowed" : "pointer",
                fontSize: "12px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;
