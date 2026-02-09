import { useRef, useState } from "react";
import * as QRCode from "qrcode";

type LabelSize = "small" | "medium" | "large";

type Props = {
  id: string;
  name: string;
  type: "shelf" | "box";
  location?: string;
  size?: LabelSize;
};

const CM_TO_PX = (cm: number) => Math.round(cm * (300 / 2.54));

const PRINT_SIZE_MAP: Record<LabelSize, number> = {
  small: CM_TO_PX(3),
  medium: CM_TO_PX(5),
  large: CM_TO_PX(8),
};

const SCREEN_SIZE_MAP: Record<LabelSize, number> = {
  small: 140,
  medium: 180,
  large: 240,
};

export default function QRLabel({
  id,
  name,
  type,
  location,
  size = "medium",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [qrPng, setQrPng] = useState<string | null>(null);

  // -------------------------------------------------------------
  // QR-CODE GENERIEREN (nur Hash-Link!)
  // -------------------------------------------------------------
  const generateQr = async () => {
    // Basis-URL deiner GitHub Pages App ermitteln
      const base = `${window.location.origin}${window.location.pathname.split("/").slice(0, 2).join("/")}`;

      // Absolute Hash-URL erzeugen
      const url = `${base}/#/${type}/${id}`;

    const png = await QRCode.toDataURL(url, {
      width: 1024,
      margin: 1,
    });

    setQrPng(png);
  };

  // -------------------------------------------------------------
  // PNG EXPORT
  // -------------------------------------------------------------
  const exportLabel = async () => {
    if (!ref.current || !qrPng) return;

    const targetWidth = PRINT_SIZE_MAP[size];
    const targetHeight = targetWidth * 1.2;

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const qrImg = new Image();
    qrImg.src = qrPng;

    await new Promise((resolve) => (qrImg.onload = resolve));

    const qrSize = targetWidth * 0.75;
    ctx.drawImage(qrImg, (targetWidth - qrSize) / 2, 20, qrSize, qrSize);

    ctx.fillStyle = "#222";
    ctx.font = `${Math.round(targetWidth * 0.12)}px system-ui`;
    ctx.textAlign = "center";
    ctx.fillText(name, targetWidth / 2, qrSize + 60);

    if (location) {
      ctx.fillStyle = "#666";
      ctx.font = `${Math.round(targetWidth * 0.07)}px system-ui`;
      ctx.fillText(location, targetWidth / 2, qrSize + 100);
    }

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${name}.png`;
    link.click();
  };

  if (!qrPng) generateQr();

  const screenWidth = SCREEN_SIZE_MAP[size];

  return (
    <div
      style={{
        width: screenWidth,
        background: "white",
        padding: "1.25rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div ref={ref}>
        <div
          style={{
            background: "white",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid #eee",
            display: "inline-block",
          }}
        >
          {qrPng && (
            <img
              src={qrPng}
              alt="QR Code"
              style={{
                width: screenWidth * 0.75,
                height: screenWidth * 0.75,
              }}
            />
          )}
        </div>

        <div
          style={{
            marginTop: "0.75rem",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#222",
          }}
        >
          {name}
        </div>

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
