import { ItineraryItem } from "@/lib/types";
import { sortItems } from "@/lib/tripPlan";
import { ItineraryItemCard } from "./ItineraryItemCard";

type Props = {
  items: ItineraryItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
};

export function ItineraryTimeline({ items, selectedItemId, onSelectItem, onAddItem, onDeleteItem }: Props) {
  const sortedItems = sortItems(items);
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Timeline</p>
          <h3 className="text-2xl font-black text-slate-950">时间线</h3>
        </div>
        <button className="btn btn-secondary no-print" onClick={onAddItem} type="button">新增时间段</button>
      </div>
      <div className="space-y-3">
        {sortedItems.map((item) => (
          <ItineraryItemCard
            key={item.id}
            item={item}
            selected={item.id === selectedItemId}
            onSelect={() => onSelectItem(item.id)}
            onDelete={() => onDeleteItem(item.id)}
          />
        ))}
        {sortedItems.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-400">还没有时间段，点击“新增时间段”开始规划。</div> : null}
      </div>
    </section>
  );
}
