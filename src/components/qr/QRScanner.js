import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
export default function QRScanner({ onScan, onClose }) {
    const scannerRef = useRef(null);
    useEffect(() => {
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;
        const config = { fps: 10, qrbox: 250 };
        const onSuccess = (decodedText) => {
            onScan(decodedText);
            stopScanner();
        };
        const startScanner = async () => {
            try {
                await scanner.start({ facingMode: "environment" }, // Kamera
                config, // Scan-Konfiguration
                onSuccess, // Erfolgs-Callback
                (errorMessage) => {
                    console.warn("QR scan error:", errorMessage);
                });
            }
            catch (err) {
                console.error("QRScanner start failed:", err);
            }
        };
        const stopScanner = async () => {
            try {
                if (scannerRef.current?.isScanning) {
                    await scannerRef.current.stop();
                }
            }
            catch (err) {
                console.error("QRScanner stop failed:", err);
            }
        };
        startScanner();
        return () => {
            stopScanner();
        };
    }, [onScan]);
    return (_jsxs("div", { style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            flexDirection: "column",
        }, children: [_jsx("div", { id: "qr-reader", style: { width: "300px" } }), _jsx("button", { onClick: onClose, style: {
                    marginTop: "20px",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#fff",
                    cursor: "pointer",
                }, children: "Schlie\u00DFen" })] }));
}
