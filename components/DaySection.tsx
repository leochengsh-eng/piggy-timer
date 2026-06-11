import { HotelInfo, MealInfo, TripDay } from "@/lib/types";
import { EditableField } from "./EditableField";
import { HotelSection } from "./HotelSection";
import { ItineraryTimeline } from "./ItineraryTimeline";
import { MealSection } from "./MealSection";

type Props = {
  day: TripDay;
  dayIndex: number;
  selectedItemId: string | null;
  onDayChange: (patch: Partial<TripDay>) => void;
  onMealChange: (mealKey: keyof TripDay["meals"], patch: Partial<MealInfo>) => void;
  onHotelChange: (patch: Partial<HotelInfo>) => void;
  onSelectItem: (id: string) => void;
  onAddItem: () => void;
  onDeleteItem: (id: string) => void;
};

export function DaySection({ day, dayIndex, selectedItemId, onDayChange, onMealChange, onHotelChange, onSelectItem, onAddItem, onDeleteItem }: Props) {
  return (
    <section className="day-section paper-section pt-10">
      <div className="rounded-[2rem] bg-gradient-to-br from-amber-50 to-sky-50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-600">Day {dayIndex + 1}</p>
            <EditableField
              aria-label="Day 标题"
              className="mt-2 border-0 bg-transparent px-0 text-3xl font-black text-slate-950 shadow-none focus:ring-0"
              value={day.title}
              onChange={(event) => onDayChange({ title: event.target.value })}
            />
          </div>
          <div className="grid min-w-64 gap-3 sm:grid-cols-2">
            <EditableField label="日期" type="date" value={day.date} onChange={(event) => onDayChange({ date: event.target.value })} />
            <EditableField label="城市" value={day.city} onChange={(event) => onDayChange({ city: event.target.value })} />
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
          <EditableField label="当天主题" value={day.theme} onChange={(event) => onDayChange({ theme: event.target.value })} />
          <EditableField label="今日概览" multiline value={day.summary} onChange={(event) => onDayChange({ summary: event.target.value })} />
        </div>
      </div>
      <ItineraryTimeline items={day.items} selectedItemId={selectedItemId} onSelectItem={onSelectItem} onAddItem={onAddItem} onDeleteItem={onDeleteItem} />
      <MealSection day={day} onChange={onMealChange} />
      <HotelSection day={day} onChange={onHotelChange} />
      <section className="mt-10 break-inside-avoid">
        <EditableField label="当天备注" multiline value={day.notes} onChange={(event) => onDayChange({ notes: event.target.value })} />
      </section>
    </section>
  );
}
