'use client';

import { useState } from 'react';
import { educationTopics } from '@/utils/education';
import { EducationTopic } from '@/types';

function TopicPanel({ topic, onClose }: { topic: EducationTopic; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-800 border-l border-slate-700 overflow-y-auto p-6 animate-slide-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl">
          &times;
        </button>
        <div className="text-3xl mb-3">{topic.icon}</div>
        <h2 className="text-xl font-bold text-white mb-4">{topic.title}</h2>
        <p className="text-slate-300 mb-6 leading-relaxed">{topic.content}</p>
        <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">Key Takeaways</h3>
        <ul className="space-y-2">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300">
              <span className="text-emerald-400 mt-1">&#10003;</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function EducationCards() {
  const [activeTopic, setActiveTopic] = useState<EducationTopic | null>(null);

  return (
    <>
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>📚</span> Learn the Basics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {educationTopics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic)}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-emerald-500/50 hover:bg-slate-800 transition-all"
            >
              <div className="text-2xl mb-2">{topic.icon}</div>
              <div className="text-sm text-slate-300">{topic.title}</div>
            </button>
          ))}
        </div>
      </section>
      {activeTopic && <TopicPanel topic={activeTopic} onClose={() => setActiveTopic(null)} />}
    </>
  );
}
