import { EditableField } from "./EditableField";
import { TripPlan } from "@/lib/types";

type Props = {
  plan: TripPlan;
  onChange: (patch: Partial<TripPlan>) => void;
};

export function TripOverview({ plan, onChange }: Props) {
  return (
    <section className="paper-section border-b border-slate-100 pb-8">
      <EditableField
        aria-label="旅行标题"
        className="border-0 bg-transparent px-0 text-4xl font-black tracking-tight text-slate-950 shadow-none focus:ring-0 md:text-5xl"
        value={plan.title}
        onChange={(event) => onChange({ title: event.target.value })}
      />
      <EditableField
        aria-label="副标题"
        className="mt-3 border-0 bg-transparent px-0 text-lg text-slate-500 shadow-none focus:ring-0"
        value={plan.subtitle}
        onChange={(event) => onChange({ subtitle: event.target.value })}
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <EditableField label="目的地" value={plan.destination} onChange={(event) => onChange({ destination: event.target.value })} />
        <EditableField label="开始日期" type="date" value={plan.startDate} onChange={(event) => onChange({ startDate: event.target.value })} />
        <EditableField label="结束日期" type="date" value={plan.endDate} onChange={(event) => onChange({ endDate: event.target.value })} />
        <EditableField label="旅行人数" value={plan.travelers} onChange={(event) => onChange({ travelers: event.target.value })} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <EditableField label="旅行风格" value={plan.style} onChange={(event) => onChange({ style: event.target.value })} />
        <EditableField label="总备注" multiline value={plan.overviewNotes} onChange={(event) => onChange({ overviewNotes: event.target.value })} />
      </div>
    </section>
  );
}
