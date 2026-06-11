import { HotelInfo, TripDay } from "@/lib/types";
import { EditableField } from "./EditableField";

type Props = {
  day: TripDay;
  onChange: (patch: Partial<HotelInfo>) => void;
};

export function HotelSection({ day, onChange }: Props) {
  return (
    <section className="mt-10 break-inside-avoid rounded-[2rem] border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Hotel</p>
      <h3 className="text-2xl font-black text-slate-950">住宿信息</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <EditableField label="酒店名称" value={day.hotel.name} onChange={(event) => onChange({ name: event.target.value })} />
        <EditableField label="地址" value={day.hotel.address} onChange={(event) => onChange({ address: event.target.value })} />
        <EditableField label="地图链接" value={day.hotel.mapUrl} onChange={(event) => onChange({ mapUrl: event.target.value })} />
        <EditableField label="预订平台" value={day.hotel.bookingPlatform} onChange={(event) => onChange({ bookingPlatform: event.target.value })} />
        <EditableField label="预订号" value={day.hotel.confirmationNumber} onChange={(event) => onChange({ confirmationNumber: event.target.value })} />
        <EditableField label="备注" multiline value={day.hotel.notes} onChange={(event) => onChange({ notes: event.target.value })} />
      </div>
    </section>
  );
}
