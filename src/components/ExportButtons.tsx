'use client';

import { Asset, Liability, NetWorthSnapshot } from '@/types';
import { exportCSV, exportPDF } from '@/utils/export';

interface Props {
  assets: Asset[];
  liabilities: Liability[];
  history: NetWorthSnapshot[];
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
}

export default function ExportButtons({ assets, liabilities, history, netWorth, totalAssets, totalLiabilities }: Props) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => exportCSV(assets, liabilities, history)}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors border border-slate-600"
      >
        Export CSV
      </button>
      <button
        onClick={() => exportPDF(assets, liabilities, netWorth, totalAssets, totalLiabilities)}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors border border-slate-600"
      >
        Export PDF
      </button>
    </div>
  );
}
