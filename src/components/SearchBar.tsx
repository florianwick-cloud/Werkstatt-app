import { useState } from "react";

type Props = {
  placeholder?: string;
  onSearch: (value: string) => void;
};

export default function SearchBar({
  placeholder = "Suchen …",
  onSearch,
}: Props) {
  const [value, setValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  }

  function clearSearch() {
    setValue("");
    onSearch("");
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: "0.5rem 0.75rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "1rem",
        }}
      />

      {value && (
        <button
          onClick={clearSearch}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            border: "none",
            background: "#ff7a00",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
