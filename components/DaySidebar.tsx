import { TripDay } from "@/lib/types";

type Props = {
  days: TripDay[];
  selectedDayId: string;
  onSelectDay: (id: string) => void;
  onAddDay: () => void;
  onDeleteDay: (id: string) => void;
  onDuplicateDay: (id: string) => void;
};

export function DaySidebar({ days, selectedDayId, onSelectDay, onAddDay, onDeleteDay, onDuplicateDay }: Props) {
  return (
    <aside className="no-print sidebar left-0">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Trip Days</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">行程天数</h2>
      </div>
      <div className="space-y-3">
        {days.map((day, index) => {
          const active = day.id === selectedDayId;
          return (
            <div key={day.id} className={`rounded-3xl border p-3 transition ${active ? "border-amber-300 bg-amber-50 shadow-sm" : "border-white/70 bg-white/65 hover:bg-white"}`}>
              <button className="w-full text-left" onClick={() => onSelectDay(day.id)} type="button">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">Day {index + 1}</span>
                  <span className="text-xs text-slate-500">{day.date || "未定日期"}</span>
                </div>
                <p className="mt-3 line-clamp-2 font-bold text-slate-900">{day.title}</p>
                <p className="mt-1 text-sm text-slate-500">{day.city || "未定城市"}</p>
              </button>
              <div className="mt-3 flex gap-2 text-xs">
                <button className="mini-btn" onClick={() => onDuplicateDay(day.id)} type="button">复制</button>
                <button className="mini-btn text-rose-600" onClick={() => onDeleteDay(day.id)} type="button">删除</button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn btn-primary mt-5 w-full" onClick={onAddDay} type="button">新增一天</button>
    </aside>
  );
}
