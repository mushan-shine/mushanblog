"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lunar, Solar } from "lunar-javascript";

const TAGS = ["思维方式", "财务心理", "自我认知", "引用"] as const;
type Tag = typeof TAGS[number];

const tagStyle: Record<string, string> = {
  "思维方式": "bg-violet-50 text-violet-600",
  "财务心理": "bg-amber-50 text-amber-600",
  "自我认知": "bg-emerald-50 text-emerald-600",
  "引用": "bg-blue-50 text-blue-600",
};

const nodeColorByTag: Record<string, string> = {
  "思维方式": "#7F77DD",
  "财务心理": "#EF9F27",
  "自我认知": "#1D9E75",
  "引用": "#378ADD",
};

interface Item { text: string; tag: Tag; italic?: boolean; }
interface Entry { date: string; items: Item[]; }
type EntryMap = Record<string, Entry>;

const SEED: Entry[] = [
  {
    date: "2026-06-23",
    items: [
      { text: "问题出在哪一层，解法就在哪一层，所以找准问题是关键，由表象到根因。", tag: "思维方式" },
      { text: "当人缺乏财务安全感时，高消费带来的快乐会大打折扣。", tag: "财务心理" },
      { text: "Gemini 对我说：你不是那种只愿意躲在格子间写代码的传统纯 I 型技术人，你渴望去掌控大局，渴望站在舞台中央，用自己的专业和人格魅力去影响别人。我觉得它认识的，是真实的我。", tag: "自我认知" },
    ],
  },
  { date: "2026-06-20", items: [{ text: "Shine, you are beautiful, active, and powerful.", tag: "自我认知" }] },
  { date: "2026-06-19", items: [{ text: "AI is a powerful tool that can help us in many ways, but it cannot replace human creativity.", tag: "思维方式" }] },
  { date: "2026-06-18", items: [{ text: "人应该把 AI 当作工具，而不是人成为 AI 的工具。让 AI 适应人定的规则，而不是让人去适应 AI 的规则。", tag: "思维方式" }] },
  { date: "2026-06-16", items: [{ text: '"There is always another day, and another chance."', tag: "引用", italic: true }] },
];

const STORAGE_KEY = "thoughts_entries";

function loadEntries(): EntryMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as EntryMap;
  } catch {}
  // first load: seed
  const map: EntryMap = {};
  SEED.forEach(e => { map[e.date] = e; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  return map;
}

function saveEntries(map: EntryMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
const monthNames = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function Thoughts() {
  return (
    <Suspense>
      <ThoughtsInner />
    </Suspense>
  );
}

function ThoughtsInner() {
  const today = new Date();
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  const [entryMap, setEntryMap] = useState<EntryMap>({});
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(todayKey);
  const [itemIndex, setItemIndex] = useState(0);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [newTag, setNewTag] = useState<Tag>("思维方式");
  const searchParams = useSearchParams();
  const canEdit = searchParams.get("edit") === "mushan";

  useEffect(() => {
    setEntryMap(loadEntries());
  }, []);

  function saveItem() {
    if (!newText.trim()) return;
    const key = selected ?? todayKey;
    const updated = { ...entryMap };
    if (!updated[key]) updated[key] = { date: key, items: [] };
    updated[key] = { ...updated[key], items: [...updated[key].items, { text: newText.trim(), tag: newTag }] };
    setEntryMap(updated);
    saveEntries(updated);
    setItemIndex(updated[key].items.length - 1);
    setAdding(false);
    setNewText("");
    setNewTag("思维方式");
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startOffset = (firstDay.getDay() + 6) % 7;

  return (
    <div className="max-w-[960px] mx-auto px-6 pb-24">
      <section className="pt-10 pb-8">
        <h1 className="text-3xl font-semibold tracking-tight mb-2" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>一闪而过的感触</h1>
        <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>记录那些突然冒出来、不想忘记的想法。</p>
      </section>

      {/* 日历 */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 text-lg">‹</button>
          <span className="font-semibold text-neutral-800">{viewYear} 年 {monthNames[viewMonth]}</span>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 text-lg">›</button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-xs text-neutral-400 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: startOffset }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = toKey(viewYear, viewMonth, day);
            const hasEntry = !!entryMap[key];
            const isToday = key === todayKey;
            const isSelected = key === selected;
            const entry = entryMap[key];

            const solar = Solar.fromYmd(viewYear, viewMonth + 1, day);
            const lunar = solar.getLunar();
            const jieQi = lunar.getJieQi();
            const lunarDay = lunar.getDayInChinese();
            const lunarMonth = lunar.getMonthInChinese();
            const lunarLabel = jieQi || (lunarDay === "初一" ? lunarMonth + "月" : lunarDay);
            const dotColor = hasEntry ? nodeColorByTag[entry.items[0]?.tag] ?? "#7F77DD" : undefined;

            return (
              <button
                key={key}
                onClick={() => { setSelected(isSelected ? null : key); setItemIndex(0); setAdding(false); }}
                className="relative flex flex-col items-center justify-center rounded-xl transition-all"
                style={{ background: isSelected ? "#1a1a1a" : isToday ? "rgba(0,0,0,0.06)" : "transparent", cursor: "pointer", padding: "4px 2px", minHeight: "52px" }}
              >
                <span className="text-sm leading-none" style={{ color: isSelected ? "#fff" : isToday ? "#1a1a1a" : "#374151", fontWeight: isToday || isSelected ? 600 : 400 }}>{day}</span>
                <span className="text-[9px] leading-none mt-1" style={{ color: isSelected ? "rgba(255,255,255,0.6)" : jieQi ? "#e06c4a" : "#b0aca4" }}>{lunarLabel}</span>
                {hasEntry && <span className="w-1.5 h-1.5 rounded-full mt-1" style={{ background: dotColor }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 记录展示区 */}
      {(() => {
        const displayKey = selected ?? todayKey;
        const displayEntry = entryMap[displayKey];
        const label = selected ? `${selected.replace(/-/g, " · ")} 的记录` : "今日记录";
        const items = displayEntry?.items ?? [];
        const total = items.length;
        const cur = total > 0 ? Math.min(itemIndex, total - 1) : 0;
        const item = items[cur];
        const isLast = cur >= total - 1;

        return (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
              {total > 0 && <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{cur + 1} / {total}</span>}
            </div>

            {adding ? (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6">
                <textarea
                  autoFocus
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  placeholder="写下今天的感触..."
                  className="w-full text-sm text-neutral-700 leading-relaxed resize-none outline-none"
                  rows={4}
                />
                {/* 标签选择 */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {TAGS.map(t => (
                    <button
                      key={t}
                      onClick={() => setNewTag(t)}
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium transition-all ${tagStyle[t]} ${newTag === t ? "ring-2 ring-offset-1 ring-current" : "opacity-50"}`}
                    >{t}</button>
                  ))}
                </div>
                <div className="flex gap-2 mt-4 justify-end">
                  <button onClick={() => { setAdding(false); setNewText(""); }} className="text-xs px-4 py-1.5 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50">取消</button>
                  <button onClick={saveItem} className="text-xs px-4 py-1.5 rounded-full bg-neutral-900 text-white">保存</button>
                </div>
              </div>
            ) : total === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 flex items-start gap-3">
                <button disabled className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-lg" style={{ color: "#e5e7eb", cursor: "default" }}>‹</button>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-neutral-300">这一天还没有记录</p>
                </div>
                {canEdit && <button onClick={() => setAdding(true)} className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-lg transition-colors hover:bg-neutral-100" style={{ color: "#9ca3af", cursor: "pointer" }}>+</button>}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 flex items-start gap-3">
                <button
                  onClick={() => setItemIndex(i => Math.max(0, i - 1))}
                  disabled={cur === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-lg transition-colors"
                  style={{ color: cur === 0 ? "#e5e7eb" : "#9ca3af", cursor: cur === 0 ? "default" : "pointer" }}
                >‹</button>
                <div className="flex-1">
                  <p className={`text-sm leading-relaxed text-neutral-700 ${item.italic ? "italic text-neutral-500" : ""}`}>{item.text}</p>
                  <span className={`inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full font-medium ${tagStyle[item.tag]}`}>{item.tag}</span>
                </div>
                {isLast ? (
                  canEdit && <button onClick={() => setAdding(true)} className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-lg transition-colors hover:bg-neutral-100" style={{ color: "#9ca3af", cursor: "pointer" }}>+</button>
                ) : (
                  <button onClick={() => setItemIndex(i => Math.min(total - 1, i + 1))} className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-lg transition-colors hover:bg-neutral-100" style={{ color: "#9ca3af", cursor: "pointer" }}>›</button>
                )}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
