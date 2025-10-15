import { useAtom } from "jotai";
import { categoriesAtom, selectedCatIdAtom } from "../atoms";

function CategorySelect() {
  const [categories] = useAtom(categoriesAtom);
  const [selectedCatId, setSelectedCatId] = useAtom(selectedCatIdAtom);

  return (
    <select
      value={selectedCatId}
      onChange={(e) => setSelectedCatId(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "3px",
        border: "1px solid #ddd",
        width: "100%",
        cursor: "pointer",
      }}
    >
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;
