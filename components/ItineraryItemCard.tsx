import { ItineraryItem } from "@/lib/types";

const categoryColors: Record<string, string> = {
  交通: "bg-sky-50 text-sky-700 ring-sky-100",
  景点: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  餐饮: "bg-orange-50 text-orange-700 ring-orange-100",
  住宿: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  购物: "bg-pink-50 text-pink-700 ring-pink-100",
  温泉: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  徒步: "bg-lime-50 text-lime-700 ring-lime-100",
  休息: "bg-violet-50 text-violet-700 ring-violet-100",
  备用方案: "bg-stone-100 text-stone-700 ring-stone-200",
  其他: "bg-slate-100 text-slate-700 ring-slate-200",
};

type Props = {
  item: ItineraryItem;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export function ItineraryItemCard({ item, selected, onSelect, onDelete }: Props) {
  return (
    <article
      className={`group relative rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${selected ? "border-amber-300 ring-4 ring-amber-100" : "border-slate-100"}`}
    >
      <button className="absolute inset-0 rounded-3xl" aria-label={`编辑 ${item.title}`} onClick={onSelect} type="button" />
      <div className="relative flex items-start gap-4">
        <div className="w-20 shrink-0 text-sm font-bold text-slate-500">
          <p>{item.startTime}</p>
          <p className="text-slate-300">↓</p>
          <p>{item.endTime}</p>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${categoryColors[item.category] ?? categoryColors.其他}`}>{item.category}</span>
            {item.location ? <span className="text-sm text-slate-400">{item.location}</span> : null}
          </div>
          <h4 className="mt-3 text-lg font-black text-slate-950">{item.title}</h4>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.details || "点击后在右侧补充详细说明。"}</p>
        </div>
        <button className="relative z-10 rounded-full px-3 py-1 text-xs font-bold text-rose-500 opacity-0 transition hover:bg-rose-50 group-hover:opacity-100" onClick={onDelete} type="button">
          删除
        </button>
      </div>
    </article>
  );
}
