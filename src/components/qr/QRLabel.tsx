import { useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

type Props = {
  boxId: string;
  boxName: string;
  location?: string;
  size?: "small" | "medium" | "large";
};

// 300 DPI Umrechnung: cm → Pixel
const CM_TO_PX = (cm: number) => Math.round(cm * (300 / 2.54));

// Exakte Druckgrößen
const SIZE_MAP = {
  small: CM_TO_PX(3),   // 3 cm
  medium: CM_TO_PX(5),  // 5 cm
  large: CM_TO_PX(8),   // 8 cm
};

export default function QRLabel({
  boxId,
  boxName,
  location,
  size = "medium",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------
  // EXPORT ALS DRUCKFÄHIGES PNG (300 DPI)
  // ------------------------------------------------------------
  const exportLabel = async () => {
    if (!ref.current) return;

    // 1. Hochauflösend rendern (für Schärfe)
    const canvas = await html2canvas(ref.current, {
      backgroundColor: "#ffffff",
      scale: 3,
    });

    // 2. Zielbreite für exakte Druckgröße (z. B. 5 cm = 591 px)
    const targetWidth = SIZE_MAP[size];
    const scaleFactor = targetWidth / canvas.width;

    // 3. Neues Canvas in exakter Druckgröße
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = targetWidth;
    outputCanvas.height = canvas.height * scaleFactor;

    const ctx = outputCanvas.getContext("2d")!;
    ctx.drawImage(canvas, 0, 0, outputCanvas.width, outputCanvas.height);

    // 4. Finales PNG
    const dataUrl = outputCanvas.toDataURL("image/png");

    // 5. iPhone Share Sheet
    if (navigator.share) {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${boxName}.png`, { type: "image/png" });

      try {
        await navigator.share({
          title: boxName,
          files: [file],
        });
        return;
      } catch (err) {
        console.log("Share failed, fallback to download");
      }
    }

    // 6. Fallback: Download
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${boxName}.png`;
    link.click();
  };

  const qrValue = `box:${boxId}`;

  return (
    <div
      style={{
        width: SIZE_MAP[size],
        background: "white",
        padding: "1.25rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div ref={ref}>
        {/* QR-Code */}
        <div
          style={{
            background: "white",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid #eee",
            display: "inline-block",
          }}
        >
          <QRCode value={qrValue} size={SIZE_MAP[size] * 0.75} />
        </div>

        {/* Box-Name */}
        <div
          style={{
            marginTop: "0.75rem",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#222",
          }}
        >
          {boxName}
        </div>

        {/* Standort */}
        {location && (
          <div
            style={{
              marginTop: "0.25rem",
              fontSize: "0.95rem",
              color: "#666",
            }}
          >
            {location}
          </div>
        )}
      </div>

      {/* Export-Button */}
      <button
        onClick={exportLabel}
        style={{
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
        }}
      >
        Als PNG exportieren / teilen
      </button>
    </div>
  );
}
