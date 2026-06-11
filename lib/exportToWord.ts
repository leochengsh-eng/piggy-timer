import { saveAs } from "file-saver";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { TripDay, TripPlan } from "./types";
import { sortItems } from "./tripPlan";

const cell = (text: string, bold = false) =>
  new TableCell({
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: text || "—", bold })] })],
  });

const infoLine = (label: string, value: string) =>
  new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: `${label}：`, bold: true }), new TextRun(value || "—")],
  });

function timelineTable(day: TripDay) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "D8DEE9" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "D8DEE9" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "D8DEE9" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "D8DEE9" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "E5E7EB" },
      insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "E5E7EB" },
    },
    rows: [
      new TableRow({
        children: ["时间", "类型", "标题", "地点", "详情", "交通 / 花费 / 预订"].map((header) => cell(header, true)),
      }),
      ...sortItems(day.items).map(
        (item) =>
          new TableRow({
            children: [
              cell(`${item.startTime}-${item.endTime}`),
              cell(item.category),
              cell(item.title),
              cell(item.location),
              cell(item.details),
              cell([item.transport, item.cost, item.bookingInfo].filter(Boolean).join(" / ")),
            ],
          }),
      ),
    ],
  });
}

function daySections(day: TripDay, index: number) {
  const mealRows: Array<[string, TripDay["meals"][keyof TripDay["meals"]]]> = [
    ["早餐", day.meals.breakfast],
    ["午餐", day.meals.lunch],
    ["晚餐", day.meals.dinner],
  ];

  return [
    new Paragraph({ text: `Day ${index + 1} · ${day.title}`, heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 120 } }),
    infoLine("日期", day.date),
    infoLine("城市", day.city),
    infoLine("主题", day.theme),
    infoLine("今日概览", day.summary),
    new Paragraph({ text: "时间线", heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 120 } }),
    timelineTable(day),
    new Paragraph({ text: "三餐安排", heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: ["餐次", "名称", "时间", "地点", "预算", "备注"].map((header) => cell(header, true)) }),
        ...mealRows.map(
          ([label, meal]) =>
            new TableRow({
              children: [cell(label), cell(meal.name), cell(meal.time), cell(meal.location), cell(meal.budget), cell(meal.notes)],
            }),
        ),
      ],
    }),
    new Paragraph({ text: "住宿信息", heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } }),
    infoLine("酒店名称", day.hotel.name),
    infoLine("地址", day.hotel.address),
    infoLine("预订平台", day.hotel.bookingPlatform),
    infoLine("预订号", day.hotel.confirmationNumber),
    infoLine("住宿备注", day.hotel.notes),
    infoLine("当天备注", day.notes),
  ];
}

export async function exportToWord(plan: TripPlan) {
  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Microsoft YaHei", size: 22 } } },
    },
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: plan.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
          }),
          new Paragraph({ text: plan.subtitle, alignment: AlignmentType.CENTER, spacing: { after: 280 } }),
          infoLine("目的地", plan.destination),
          infoLine("日期", `${plan.startDate} 至 ${plan.endDate}`),
          infoLine("旅行人数", plan.travelers),
          infoLine("旅行风格", plan.style),
          infoLine("总备注", plan.overviewNotes),
          ...plan.days.flatMap(daySections),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${plan.title || "旅行计划书"}.docx`);
}
