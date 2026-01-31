import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
const SIZE_MAP = {
    small: 354, // 3 cm @ 300 DPI
    medium: 591, // 5 cm
    large: 945, // 8 cm
};
export default function QRLabel({ boxId, boxName, location, size = "medium", }) {
    const ref = useRef(null);
    // ------------------------------------------------------------
    // EXPORT ALS PNG + SHARE SHEET (iPhone)
    // ------------------------------------------------------------
    const exportLabel = async () => {
        if (!ref.current)
            return;
        const canvas = await html2canvas(ref.current, {
            backgroundColor: "#ffffff",
            scale: 3, // gestochen scharf
        });
        const dataUrl = canvas.toDataURL("image/png");
        // iPhone Share Sheet
        if (navigator.share) {
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], `${boxName}.png`, { type: "image/png" });
            try {
                await navigator.share({
                    title: boxName,
                    files: [file],
                });
                return;
            }
            catch (err) {
                console.log("Share failed, fallback to download");
            }
        }
        // Fallback: Download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${boxName}.png`;
        link.click();
    };
    // ------------------------------------------------------------
    // OFFLINE-MODUS: QR-CODE ENTHÄLT NUR DIE BOX-ID
    // Beispiel: "box:123"
    // Deine App erkennt das und navigiert offline zu /box/123
    // ------------------------------------------------------------
    const qrValue = `box:${boxId}`;
    // ------------------------------------------------------------
    // DESIGN: Professionelles Mini-Label
    // ------------------------------------------------------------
    return (_jsxs("div", { style: {
            width: SIZE_MAP[size],
            background: "white",
            padding: "1.25rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
        }, children: [_jsxs("div", { ref: ref, children: [_jsx("div", { style: {
                            background: "white",
                            padding: "1rem",
                            borderRadius: "12px",
                            border: "1px solid #eee",
                            display: "inline-block",
                        }, children: _jsx(QRCode, { value: qrValue, size: SIZE_MAP[size] * 0.75 }) }), _jsx("div", { style: {
                            marginTop: "0.75rem",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "#222",
                        }, children: boxName }), location && (_jsx("div", { style: {
                            marginTop: "0.25rem",
                            fontSize: "0.95rem",
                            color: "#666",
                        }, children: location }))] }), _jsx("button", { onClick: exportLabel, style: {
                    marginTop: "1rem",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "8px",
                    border: "none",
                    background: "#ff7a00",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                }, children: "Als PNG exportieren / teilen" })] }));
}
