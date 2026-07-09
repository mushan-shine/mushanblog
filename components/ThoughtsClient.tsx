"use client";
import { useState } from "react";
import { Lunar, Solar } from "lunar-javascript";
import { type ThoughtEntry } from "@/lib/thoughts";

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

type Entry = ThoughtEntry;
type EntryMap = Record<string, Entry>;

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
const monthNames = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

function toKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function toMap(entries: Entry[]): EntryMap {
  const map: EntryMap = {};
  entries.forEach((e) => { map[e.date] = e; });
  return map;
}

export default function ThoughtsClient({ initialEntries }: { initialEntries: Entry[] }) {
  const today = new Date();
  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  const entryMap = toMap(initialEntries);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(todayKey);
  const [itemIndex, setItemIndex] = useState(0);

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
    <div className="max-w-[960px] mx-auto px-6 pb-4">
      <section className="pt-6 pb-4 flex items-baseline gap-3">
        <h1 className="text-2xl font-semibold tracking-tight flex-shrink-0" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>一闪而过的感触</h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>记录那些突然冒出来、不想忘记的想法。</p>
      </section>

      {/* 日历 */}
      <div className="bg-white rounded-xl border border-neutral-200/80 p-3 mb-3 mt-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={prevMonth} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 text-base">‹</button>
          <span className="font-semibold text-neutral-800 text-sm">{viewYear} 年 {monthNames[viewMonth]}</span>
          <button onClick={nextMonth} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 text-base">›</button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-[10px] text-neutral-400 py-0.5">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-0.5">
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
                onClick={() => { setSelected(isSelected ? null : key); setItemIndex(0); }}
                className="relative flex flex-col items-center justify-center rounded-xl transition-all"
                style={{ background: isSelected ? "#1a1a1a" : isToday ? "rgba(0,0,0,0.06)" : "transparent", cursor: "pointer", padding: "1px", minHeight: "22px" }}
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

        return (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
              {total > 0 && <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{cur + 1} / {total}</span>}
            </div>

            {total === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 flex items-start gap-3">
                <button disabled className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-lg" style={{ color: "#e5e7eb", cursor: "default" }}>‹</button>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-neutral-300">这一天还没有记录</p>
                </div>
                <span className="w-7 h-7 flex-shrink-0" />
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
                <button
                  onClick={() => setItemIndex(i => Math.min(total - 1, i + 1))}
                  disabled={cur >= total - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5 text-lg transition-colors"
                  style={{ color: cur >= total - 1 ? "#e5e7eb" : "#9ca3af", cursor: cur >= total - 1 ? "default" : "pointer" }}
                >›</button>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
