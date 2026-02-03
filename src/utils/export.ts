import { Asset, Liability, NetWorthSnapshot } from '@/types';
import { formatCurrency } from './calculations';

export function exportCSV(assets: Asset[], liabilities: Liability[], history: NetWorthSnapshot[]): void {
  let csv = 'Category,Name,Value\n';
  assets.forEach(a => {
    csv += `Asset,${a.name.replace(/,/g, '')},${a.value}\n`;
  });
  liabilities.forEach(l => {
    csv += `Liability,${l.name.replace(/,/g, '')},${l.value}\n`;
  });

  if (history.length > 0) {
    csv += '\nDate,Total Assets,Total Liabilities,Net Worth\n';
    history.forEach(h => {
      csv += `${h.date},${h.assets},${h.liabilities},${h.netWorth}\n`;
    });
  }

  download(csv, 'net-worth-export.csv', 'text/csv');
}

export async function exportPDF(
  assets: Asset[],
  liabilities: Liability[],
  netWorth: number,
  totalAssets: number,
  totalLiabilities: number,
): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('Net Worth Report', 14, 22);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  doc.setFontSize(14);
  doc.text(`Net Worth: ${formatCurrency(netWorth)}`, 14, 44);
  doc.setFontSize(11);
  doc.text(`Total Assets: ${formatCurrency(totalAssets)}`, 14, 52);
  doc.text(`Total Liabilities: ${formatCurrency(totalLiabilities)}`, 14, 58);

  if (assets.length > 0) {
    doc.setFontSize(13);
    doc.text('Assets', 14, 72);
    autoTable(doc, {
      startY: 76,
      head: [['Name', 'Category', 'Value']],
      body: assets.map(a => [a.name, a.category, formatCurrency(a.value)]),
    });
  }

  const afterAssets = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 80;

  if (liabilities.length > 0) {
    doc.setFontSize(13);
    doc.text('Liabilities', 14, afterAssets + 12);
    autoTable(doc, {
      startY: afterAssets + 16,
      head: [['Name', 'Category', 'Value']],
      body: liabilities.map(l => [l.name, l.category, formatCurrency(l.value)]),
    });
  }

  doc.save('net-worth-report.pdf');
}

function download(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
