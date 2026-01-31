import { jsx as _jsx } from "react/jsx-runtime";
import QRCode from "react-qr-code";
export default function QRDisplay({ value, size = 96 }) {
    return (_jsx("div", { style: {
            background: "white",
            padding: "0.5rem",
            borderRadius: "8px",
            display: "inline-block",
        }, children: _jsx(QRCode, { value: value, size: size }) }));
}
