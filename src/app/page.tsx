'use client';

import { useNetWorth } from '@/hooks/useNetWorth';
import Header from '@/components/Header';
import EducationCards from '@/components/EducationCards';
import AssetInput from '@/components/AssetInput';
import LiabilityInput from '@/components/LiabilityInput';
import NetWorthDisplay from '@/components/NetWorthDisplay';
import Milestones from '@/components/Milestones';
import Insights from '@/components/Insights';
import GoalSetting from '@/components/GoalSetting';
import HistoryChart from '@/components/HistoryChart';
import BudgetRecommendations from '@/components/BudgetRecommendations';
import ExportButtons from '@/components/ExportButtons';

export default function Home() {
  const nw = useNetWorth();

  if (!nw.loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pb-16">
      <Header />
      <EducationCards />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <AssetInput
          assets={nw.assets}
          totalAssets={nw.totalAssets}
          onAdd={nw.addAsset}
          onRemove={nw.removeAsset}
        />
        <LiabilityInput
          liabilities={nw.liabilities}
          totalLiabilities={nw.totalLiabilities}
          onAdd={nw.addLiability}
          onRemove={nw.removeLiability}
        />
      </div>

      <div className="mb-6">
        <NetWorthDisplay
          netWorth={nw.netWorth}
          totalAssets={nw.totalAssets}
          totalLiabilities={nw.totalLiabilities}
          healthLevel={nw.healthLevel}
          healthPercent={nw.healthPercent}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <GoalSetting goal={nw.goal} netWorth={nw.netWorth} onSetGoal={nw.setGoal} />
        <Insights insights={nw.insights} />
      </div>

      <div className="mb-6">
        <HistoryChart history={nw.history} onSaveSnapshot={nw.saveSnapshot} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Milestones milestones={nw.milestones} />
        <BudgetRecommendations totalAssets={nw.totalAssets} totalLiabilities={nw.totalLiabilities} />
      </div>

      <div className="flex justify-center">
        <ExportButtons
          assets={nw.assets}
          liabilities={nw.liabilities}
          history={nw.history}
          netWorth={nw.netWorth}
          totalAssets={nw.totalAssets}
          totalLiabilities={nw.totalLiabilities}
        />
      </div>
    </main>
  );
}
