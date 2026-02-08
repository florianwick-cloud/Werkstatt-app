import { jsPDF } from "jspdf";
import * as QRCode from "qrcode";
import { getAllShelves } from "../storage/shelves.storage";
import { getAllBoxes } from "../storage/boxes.storage";
import type { Shelf, Box } from "../types/models";

type QrItem = {
  id: string;
  name: string;
  type: "shelf" | "box";
  location?: string | null;
};

async function generateQrDataUrl(item: QrItem): Promise<string> {
  const url = `#/${item.type}/${item.id}`;
  return QRCode.toDataURL(url, {
    width: 512,
    margin: 1,
  });
}

async function loadQrItems(): Promise<QrItem[]> {
  const [shelves, boxes] = await Promise.all([
    getAllShelves(),
    getAllBoxes(),
  ]);

  const shelfItems: QrItem[] = (shelves as Shelf[]).map((s) => ({
    id: s.id,
    name: s.name,
    type: "shelf",
    location: null,
  }));

  const boxItems: QrItem[] = (boxes as Box[]).map((b) => ({
    id: b.id,
    name: b.name,
    type: "box",
    location: b.location ?? null,
  }));

  return [...shelfItems, ...boxItems];
}

export async function generateQrPdf() {
  const items = await loadQrItems();
  if (items.length === 0) {
    alert("Keine Regale oder Kisten gefunden.");
    return;
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;

  const cols = 2;
  const rows = 3;
  const cellWidth = pageWidth / cols;
  const cellHeight = pageHeight / rows;

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const posInPage = index % (cols * rows);

    if (index > 0 && posInPage === 0) {
      doc.addPage();
    }

    const col = posInPage % cols;
    const row = Math.floor(posInPage / cols);

    const x = col * cellWidth;
    const y = row * cellHeight;

    const qrDataUrl = await generateQrDataUrl(item);

    const qrSize = Math.min(cellWidth * 0.7, cellHeight * 0.6);
    const qrX = x + (cellWidth - qrSize) / 2;
    const qrY = y + 10;

    doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(item.name, x + cellWidth / 2, qrY + qrSize + 8, {
      align: "center",
    });

    if (item.location) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(
        item.location,
        x + cellWidth / 2,
        qrY + qrSize + 14,
        { align: "center" }
      );
    }
  }

  doc.save("workshop-qr-labels.pdf");
}
