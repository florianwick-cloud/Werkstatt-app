import QRCode from "react-qr-code";
import type { Box } from "../../types/models";

type Props = {
  box: Box;
};

export default function BoxInfo({ box }: Props) {
  return (
    <section style={{ marginBottom: "1.5rem" }}>
      <QRCode value={box.id} size={72} />
    </section>
  );
}
