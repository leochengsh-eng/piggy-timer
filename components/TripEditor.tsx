"use client";

import { useEffect, useMemo, useState } from "react";
import { addDay, createDefaultTripPlan, createItineraryItem, deleteDay, duplicateDay, loadTripPlan, saveTripPlan, sortItems } from "@/lib/tripPlan";
import { HotelInfo, ItineraryItem, MealInfo, TripDay, TripPlan } from "@/lib/types";
import { DaySection } from "./DaySection";
import { DaySidebar } from "./DaySidebar";
import { ExportButtons } from "./ExportButtons";
import { ItemInspector } from "./ItemInspector";
import { TripOverview } from "./TripOverview";

function updateDay(plan: TripPlan, dayId: string, updater: (day: TripDay) => TripDay): TripPlan {
  return { ...plan, days: plan.days.map((day) => (day.id === dayId ? updater(day) : day)) };
}

export function TripEditor() {
  const [plan, setPlan] = useState<TripPlan>(() => createDefaultTripPlan());
  const [selectedDayId, setSelectedDayId] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadTripPlan();
    setPlan(stored);
    setSelectedDayId(stored.days[0]?.id ?? "");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveTripPlan(plan);
  }, [hydrated, plan]);

  const selectedDay = useMemo(
    () => plan.days.find((day) => day.id === selectedDayId) ?? plan.days[0],
    [plan.days, selectedDayId],
  );
  const selectedItem = useMemo(
    () => selectedDay?.items.find((item) => item.id === selectedItemId) ?? null,
    [selectedDay, selectedItemId],
  );

  function replaceSelectedDay(updater: (day: TripDay) => TripDay) {
    if (!selectedDay) return;
    setPlan((current) => updateDay(current, selectedDay.id, updater));
  }

  function handleAddDay() {
    setPlan((current) => {
      const next = addDay(current);
      setSelectedDayId(next.days[next.days.length - 1].id);
      setSelectedItemId(null);
      return next;
    });
  }

  function handleDeleteDay(dayId: string) {
    setPlan((current) => {
      const next = deleteDay(current, dayId);
      if (dayId === selectedDayId) {
        setSelectedDayId(next.days[0].id);
        setSelectedItemId(null);
      }
      return next;
    });
  }

  function handleDuplicateDay(dayId: string) {
    setPlan((current) => {
      const next = duplicateDay(current, dayId);
      const sourceIndex = current.days.findIndex((day) => day.id === dayId);
      const copy = next.days[sourceIndex + 1];
      setSelectedDayId(copy.id);
      setSelectedItemId(null);
      return next;
    });
  }

  function handleAddItem() {
    const item = createItineraryItem();
    replaceSelectedDay((day) => ({ ...day, items: sortItems([...day.items, item]) }));
    setSelectedItemId(item.id);
  }

  function handleDeleteItem(itemId: string) {
    replaceSelectedDay((day) => ({ ...day, items: day.items.filter((item) => item.id !== itemId) }));
    if (selectedItemId === itemId) setSelectedItemId(null);
  }

  function handleUpdateItem(patch: Partial<ItineraryItem>) {
    if (!selectedItemId) return;
    replaceSelectedDay((day) => ({
      ...day,
      items: sortItems(day.items.map((item) => (item.id === selectedItemId ? { ...item, ...patch } : item))),
    }));
  }

  function handleMealChange(mealKey: keyof TripDay["meals"], patch: Partial<MealInfo>) {
    replaceSelectedDay((day) => ({ ...day, meals: { ...day.meals, [mealKey]: { ...day.meals[mealKey], ...patch } } }));
  }

  function handleHotelChange(patch: Partial<HotelInfo>) {
    replaceSelectedDay((day) => ({ ...day, hotel: { ...day.hotel, ...patch } }));
  }

  function handleReset() {
    const defaultPlan = createDefaultTripPlan();
    setPlan(defaultPlan);
    setSelectedDayId(defaultPlan.days[0].id);
    setSelectedItemId(null);
  }

  if (!selectedDay) return null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fff7ed,transparent_36%),linear-gradient(135deg,#f8fafc,#eef6f5)] text-slate-900">
      <DaySidebar
        days={plan.days}
        selectedDayId={selectedDay.id}
        onSelectDay={(id) => {
          setSelectedDayId(id);
          setSelectedItemId(null);
        }}
        onAddDay={handleAddDay}
        onDeleteDay={handleDeleteDay}
        onDuplicateDay={handleDuplicateDay}
      />
      <ItemInspector item={selectedItem} onChange={handleUpdateItem} onDelete={() => selectedItemId && handleDeleteItem(selectedItemId)} />
      <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 lg:px-8 xl:px-0 xl:pl-80 xl:pr-80">
        <header className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-600">Local Trip Planner</p>
            <h1 className="mt-1 text-2xl font-black text-slate-950">旅行计划书编辑器</h1>
          </div>
          <ExportButtons plan={plan} onReset={handleReset} />
        </header>
        <div className="paper mx-auto rounded-[2.2rem] bg-white px-6 py-8 shadow-2xl shadow-slate-200/70 md:px-10 md:py-12">
          <TripOverview plan={plan} onChange={(patch) => setPlan((current) => ({ ...current, ...patch }))} />
          <DaySection
            key={selectedDay.id}
            day={selectedDay}
            dayIndex={plan.days.findIndex((day) => day.id === selectedDay.id)}
            selectedItemId={selectedItemId}
            onDayChange={(patch) => replaceSelectedDay((day) => ({ ...day, ...patch }))}
            onMealChange={handleMealChange}
            onHotelChange={handleHotelChange}
            onSelectItem={setSelectedItemId}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      </div>
    </main>
  );
}
