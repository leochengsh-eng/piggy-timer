import { CATEGORIES, ItineraryItem } from "@/lib/types";
import { EditableField } from "./EditableField";

type Props = {
  item: ItineraryItem | null;
  onChange: (patch: Partial<ItineraryItem>) => void;
  onDelete: () => void;
};

export function ItemInspector({ item, onChange, onDelete }: Props) {
  return (
    <aside className="no-print sidebar right-0">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Inspector</p>
        <h2 className="mt-2 text-xl font-black text-slate-900">详情编辑</h2>
      </div>
      {!item ? (
        <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/65 p-6 text-sm leading-7 text-slate-500">
          选择一个时间段后，可以在这里编辑详细信息。
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <EditableField label="开始时间" type="time" value={item.startTime} onChange={(event) => onChange({ startTime: event.target.value })} />
            <EditableField label="结束时间" type="time" value={item.endTime} onChange={(event) => onChange({ endTime: event.target.value })} />
          </div>
          <EditableField label="标题" value={item.title} onChange={(event) => onChange({ title: event.target.value })} />
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">类型</span>
            <select className="editable" value={item.category} onChange={(event) => onChange({ category: event.target.value })}>
              {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <EditableField label="地点" value={item.location} onChange={(event) => onChange({ location: event.target.value })} />
          <EditableField label="交通方式" value={item.transport} onChange={(event) => onChange({ transport: event.target.value })} />
          <EditableField label="详细说明" multiline value={item.details} onChange={(event) => onChange({ details: event.target.value })} />
          <EditableField label="预计花费" value={item.cost} onChange={(event) => onChange({ cost: event.target.value })} />
          <EditableField label="预订信息" multiline value={item.bookingInfo} onChange={(event) => onChange({ bookingInfo: event.target.value })} />
          <EditableField label="地图链接" value={item.mapUrl} onChange={(event) => onChange({ mapUrl: event.target.value })} />
          <EditableField label="备注" multiline value={item.notes} onChange={(event) => onChange({ notes: event.target.value })} />
          <button className="btn w-full bg-rose-50 text-rose-600 hover:bg-rose-100" onClick={onDelete} type="button">删除该时间段</button>
        </div>
      )}
    </aside>
  );
}
