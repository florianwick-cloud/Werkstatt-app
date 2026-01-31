import { jsx as _jsx } from "react/jsx-runtime";
import QRCode from "react-qr-code";
export default function BoxInfo({ box }) {
    return (_jsx("section", { style: { marginBottom: "1.5rem" }, children: _jsx(QRCode, { value: box.id, size: 72 }) }));
}
