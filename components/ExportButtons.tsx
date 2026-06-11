import { TripPlan } from "@/lib/types";
import { exportToWord } from "@/lib/exportToWord";

export function ExportButtons({ plan, onReset }: { plan: TripPlan; onReset: () => void }) {
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button className="btn btn-primary" onClick={() => window.print()} type="button">
        导出 PDF
      </button>
      <button className="btn btn-secondary" onClick={() => exportToWord(plan)} type="button">
        导出 Word
      </button>
      <button className="btn btn-ghost" onClick={onReset} type="button">
        重置示例数据
      </button>
    </div>
  );
}
