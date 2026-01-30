import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

type Props = {
  onScan: (value: string) => void;
  onClose: () => void;
};

export default function QRScanner({ onScan, onClose }: Props) {
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      // iPhone Safari braucht manchmal einen kleinen Delay
      await new Promise((res) => setTimeout(res, 150));

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            if (!isMounted) return;

            // Vibrationsfeedback (iPhone unterstützt das)
            if (navigator.vibrate) navigator.vibrate(50);

            onScan(decodedText);

            // Scanner sauber stoppen
            scanner.stop().catch(() => {});
          }
        );
      } catch (err) {
        console.error("Scanner start failed", err);
      }
    };

    init();

    return () => {
      isMounted = false;
      scannerRef.current?.stop().catch(() => {});
    };
  }, [onScan]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        id="qr-reader"
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {/* Scan-Overlay */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 250,
            height: 250,
            transform: "translate(-50%, -50%)",
            border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: "12px",
          }}
        />
      </div>

      <button
        onClick={onClose}
        style={{
          padding: "1rem",
          background: "#ff7a00",
          color: "white",
          border: "none",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Abbrechen
      </button>
    </div>
  );
}
