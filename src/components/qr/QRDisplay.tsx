import QRCode from "react-qr-code";

type Props = {
  value: string;
  size?: number;
};

export default function QRDisplay({ value, size = 96 }: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: "0.5rem",
        borderRadius: "8px",
        display: "inline-block",
      }}
    >
      <QRCode value={value} size={size} />
    </div>
  );
}
