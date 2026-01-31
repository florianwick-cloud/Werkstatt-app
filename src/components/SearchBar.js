import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function SearchBar({ placeholder = "Suchen …", onSearch, }) {
    const [value, setValue] = useState("");
    function handleChange(e) {
        const newValue = e.target.value;
        setValue(newValue);
        onSearch(newValue);
    }
    function clearSearch() {
        setValue("");
        onSearch("");
    }
    return (_jsxs("div", { style: {
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            marginBottom: "1rem",
        }, children: [_jsx("input", { type: "text", value: value, onChange: handleChange, placeholder: placeholder, style: {
                    flex: 1,
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                } }), value && (_jsx("button", { onClick: clearSearch, style: {
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: "none",
                    background: "#ff7a00",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 600,
                }, children: "\u2715" }))] }));
}
