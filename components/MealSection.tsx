import { MealInfo, TripDay } from "@/lib/types";
import { EditableField } from "./EditableField";

const mealLabels: Array<[keyof TripDay["meals"], string]> = [
  ["breakfast", "早餐"],
  ["lunch", "午餐"],
  ["dinner", "晚餐"],
];

type Props = {
  day: TripDay;
  onChange: (mealKey: keyof TripDay["meals"], patch: Partial<MealInfo>) => void;
};

export function MealSection({ day, onChange }: Props) {
  return (
    <section className="mt-10 break-inside-avoid">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Meals</p>
      <h3 className="text-2xl font-black text-slate-950">三餐安排</h3>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {mealLabels.map(([key, label]) => {
          const meal = day.meals[key];
          return (
            <div key={key} className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4">
              <h4 className="mb-3 font-black text-slate-900">{label}</h4>
              <div className="space-y-3">
                <EditableField label="名称" value={meal.name} onChange={(event) => onChange(key, { name: event.target.value })} />
                <EditableField label="时间" value={meal.time} onChange={(event) => onChange(key, { time: event.target.value })} />
                <EditableField label="地点" value={meal.location} onChange={(event) => onChange(key, { location: event.target.value })} />
                <EditableField label="地图链接" value={meal.mapUrl} onChange={(event) => onChange(key, { mapUrl: event.target.value })} />
                <EditableField label="预算" value={meal.budget} onChange={(event) => onChange(key, { budget: event.target.value })} />
                <EditableField label="备注" multiline value={meal.notes} onChange={(event) => onChange(key, { notes: event.target.value })} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
