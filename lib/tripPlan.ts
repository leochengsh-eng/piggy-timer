import { TripDay, TripPlan, ItineraryItem } from "./types";

export const STORAGE_KEY = "trip-plan-editor-v1";

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const emptyMeal = (name = "") => ({
  name,
  time: "",
  location: "",
  mapUrl: "",
  budget: "",
  notes: "",
});

const emptyHotel = () => ({
  name: "",
  address: "",
  mapUrl: "",
  bookingPlatform: "",
  confirmationNumber: "",
  notes: "",
});

export function createEmptyDay(dayNumber: number, date = ""): TripDay {
  return {
    id: makeId(),
    date,
    city: "待定城市",
    title: `Day ${dayNumber}`,
    theme: "轻松探索",
    summary: "写下今天的主要安排、节奏和重点。",
    items: [],
    meals: {
      breakfast: emptyMeal(),
      lunch: emptyMeal(),
      dinner: emptyMeal(),
    },
    hotel: emptyHotel(),
    notes: "",
  };
}

export function createDefaultTripPlan(): TripPlan {
  return {
    title: "2026 西澳 Perth 11日旅行计划",
    subtitle: "自然风光、海岸、美食与轻松自驾",
    destination: "Perth / Fremantle / Pinnacles / Margaret River",
    startDate: "2026-09-25",
    endDate: "2026-10-05",
    travelers: "2 人",
    style: "轻松自驾 · 海岸风光 · 美食咖啡 · 自然探索",
    overviewNotes:
      "建议提前确认租车、国家公园门票与热门餐厅预订。每天保留弹性时间，适合根据天气微调海边与户外安排。",
    days: [
      {
        id: makeId(),
        date: "2026-09-25",
        city: "Perth",
        title: "Day 1：抵达 Perth",
        theme: "抵达、取车与市区轻松适应",
        summary: "抵达珀斯后完成入境、取车和入住，下午以轻松散步和早晚餐为主，尽快适应时差。",
        items: [
          {
            id: makeId(),
            startTime: "10:30",
            endTime: "12:00",
            title: "抵达 Perth Airport",
            category: "交通",
            location: "Perth Airport",
            transport: "飞机 / 机场租车",
            details: "完成入境、领取行李，并在机场租车柜台办理取车。检查车辆外观、油量和保险文件。",
            cost: "按机票与租车订单",
            bookingInfo: "保留机票、租车确认邮件和驾照翻译件。",
            mapUrl: "https://maps.google.com/?q=Perth+Airport",
            notes: "如航班延误，午餐和入住时间顺延。",
          },
          {
            id: makeId(),
            startTime: "14:30",
            endTime: "16:30",
            title: "Kings Park 轻松散步",
            category: "景点",
            location: "Kings Park and Botanic Garden",
            transport: "自驾",
            details: "从高处俯瞰 Swan River 与 Perth CBD，适合拍照、散步和恢复精神。",
            cost: "免费",
            bookingInfo: "无需预订",
            mapUrl: "https://maps.google.com/?q=Kings+Park+Perth",
            notes: "带外套，傍晚可能有风。",
          },
          {
            id: makeId(),
            startTime: "18:00",
            endTime: "20:00",
            title: "Northbridge 晚餐",
            category: "餐饮",
            location: "Northbridge",
            transport: "步行 / 短途开车",
            details: "选择亚洲餐、意餐或当地小酒馆，第一晚不安排太满。",
            cost: "AUD 35-60 / 人",
            bookingInfo: "热门餐厅建议提前订位。",
            mapUrl: "https://maps.google.com/?q=Northbridge+Perth+restaurants",
            notes: "晚餐后早点休息。",
          },
        ],
        meals: {
          breakfast: emptyMeal("飞机餐 / 机场咖啡"),
          lunch: {
            ...emptyMeal("机场简餐"),
            time: "12:30",
            location: "Perth Airport 或酒店附近",
            budget: "AUD 20 / 人",
          },
          dinner: {
            ...emptyMeal("Northbridge 晚餐"),
            time: "18:00",
            location: "Northbridge",
            budget: "AUD 35-60 / 人",
            notes: "优先选择可步行返回酒店的餐厅。",
          },
        },
        hotel: {
          name: "Perth CBD 酒店",
          address: "Perth CBD",
          mapUrl: "https://maps.google.com/?q=Perth+CBD+hotel",
          bookingPlatform: "Booking / Agoda / 酒店官网",
          confirmationNumber: "待填写",
          notes: "确认停车位、入住时间和押金政策。",
        },
        notes: "第一天以恢复体力为主，不建议安排长途驾驶。",
      },
      {
        id: makeId(),
        date: "2026-09-26",
        city: "Fremantle / Cottesloe",
        title: "Day 2：Fremantle + Cottesloe Beach",
        theme: "港口小镇、市集与海边日落",
        summary: "白天探索 Fremantle 历史街区、市场与海鲜，傍晚前往 Cottesloe Beach 看印度洋日落。",
        items: [
          {
            id: makeId(),
            startTime: "09:30",
            endTime: "11:00",
            title: "Fremantle Markets",
            category: "购物",
            location: "Fremantle Markets",
            transport: "自驾 / 火车",
            details: "逛本地摊位、咖啡、手作与小吃，适合作为当天开场。",
            cost: "按消费",
            bookingInfo: "留意市场开放日期。",
            mapUrl: "https://maps.google.com/?q=Fremantle+Markets",
            notes: "周末人较多，尽早到达。",
          },
          {
            id: makeId(),
            startTime: "11:30",
            endTime: "13:30",
            title: "Fremantle Fishing Boat Harbour 午餐",
            category: "餐饮",
            location: "Fishing Boat Harbour",
            transport: "步行",
            details: "海港边吃 fish & chips 或海鲜拼盘，餐后沿港口散步。",
            cost: "AUD 30-55 / 人",
            bookingInfo: "热门海鲜店可现场排队。",
            mapUrl: "https://maps.google.com/?q=Fremantle+Fishing+Boat+Harbour",
            notes: "注意海鸥。",
          },
          {
            id: makeId(),
            startTime: "17:00",
            endTime: "19:00",
            title: "Cottesloe Beach 日落",
            category: "景点",
            location: "Cottesloe Beach",
            transport: "自驾",
            details: "在海滩散步、拍照，选择海边餐厅或咖啡店等待日落。",
            cost: "免费",
            bookingInfo: "无需预订",
            mapUrl: "https://maps.google.com/?q=Cottesloe+Beach",
            notes: "带薄外套，日落后风大。",
          },
        ],
        meals: {
          breakfast: {
            ...emptyMeal("酒店早餐 / 咖啡店"),
            time: "08:00",
            location: "Perth CBD",
            budget: "AUD 15-25 / 人",
          },
          lunch: {
            ...emptyMeal("海港海鲜午餐"),
            time: "12:00",
            location: "Fremantle Fishing Boat Harbour",
            budget: "AUD 30-55 / 人",
          },
          dinner: {
            ...emptyMeal("Cottesloe 海边晚餐"),
            time: "19:00",
            location: "Cottesloe Beach 周边",
            budget: "AUD 35-70 / 人",
          },
        },
        hotel: {
          name: "Perth CBD 酒店",
          address: "Perth CBD",
          mapUrl: "https://maps.google.com/?q=Perth+CBD+hotel",
          bookingPlatform: "同 Day 1",
          confirmationNumber: "待填写",
          notes: "可继续住同一家，减少搬运行李。",
        },
        notes: "如果 Fremantle Markets 未开放，可替换为 Fremantle Prison 或 WA Maritime Museum。",
      },
      {
        id: makeId(),
        date: "2026-09-27",
        city: "Pinnacles Desert",
        title: "Day 3：Pinnacles Desert 一日游",
        theme: "沙漠奇景、海岸公路与星空备选",
        summary: "安排较长车程前往 Nambung National Park，欣赏 Pinnacles Desert 石灰岩地貌，沿途可加入海岸小镇停留。",
        items: [
          {
            id: makeId(),
            startTime: "08:00",
            endTime: "10:30",
            title: "Perth 自驾前往 Pinnacles",
            category: "交通",
            location: "Perth → Nambung National Park",
            transport: "自驾",
            details: "提前加满油，准备水和零食。沿 Indian Ocean Drive 北上，注意限速与休息。",
            cost: "油费 + 国家公园门票",
            bookingInfo: "可提前查询 WA Parks Pass。",
            mapUrl: "https://maps.google.com/?q=Pinnacles+Desert",
            notes: "长途驾驶建议两人轮换。",
          },
          {
            id: makeId(),
            startTime: "10:45",
            endTime: "13:00",
            title: "Pinnacles Desert 游览",
            category: "景点",
            location: "Pinnacles Desert",
            transport: "自驾园区环线 + 步行",
            details: "沿园区道路慢速游览，在指定区域停车拍照，观察独特石灰岩柱群。",
            cost: "按国家公园门票",
            bookingInfo: "无需单独预订",
            mapUrl: "https://maps.google.com/?q=Pinnacles+Desert+Discovery+Centre",
            notes: "防晒、帽子、墨镜必备。",
          },
          {
            id: makeId(),
            startTime: "14:00",
            endTime: "15:30",
            title: "Cervantes 午餐与休息",
            category: "餐饮",
            location: "Cervantes",
            transport: "自驾",
            details: "在海边小镇用午餐，短暂休整后返回 Perth。",
            cost: "AUD 25-45 / 人",
            bookingInfo: "无需预订",
            mapUrl: "https://maps.google.com/?q=Cervantes+Western+Australia+restaurants",
            notes: "如体力充足可顺路看 Lake Thetis。",
          },
        ],
        meals: {
          breakfast: {
            ...emptyMeal("酒店早餐 / 外带咖啡"),
            time: "07:00",
            location: "Perth CBD",
            budget: "AUD 15-25 / 人",
          },
          lunch: {
            ...emptyMeal("Cervantes 午餐"),
            time: "14:00",
            location: "Cervantes",
            budget: "AUD 25-45 / 人",
          },
          dinner: {
            ...emptyMeal("返回 Perth 后简餐"),
            time: "19:30",
            location: "Perth CBD",
            budget: "AUD 25-45 / 人",
            notes: "当天车程较长，晚餐建议简单。",
          },
        },
        hotel: {
          name: "Perth CBD 酒店",
          address: "Perth CBD",
          mapUrl: "https://maps.google.com/?q=Perth+CBD+hotel",
          bookingPlatform: "同 Day 1",
          confirmationNumber: "待填写",
          notes: "提前确认酒店停车场夜间入口。",
        },
        notes: "若想拍星空，可将返程推迟，但需确认驾驶安全和夜间回程体力。",
      },
    ],
  };
}

export function loadTripPlan(): TripPlan {
  if (typeof window === "undefined") return createDefaultTripPlan();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createDefaultTripPlan();
  try {
    return JSON.parse(raw) as TripPlan;
  } catch {
    return createDefaultTripPlan();
  }
}

export function saveTripPlan(plan: TripPlan) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  }
}

export function sortItems(items: ItineraryItem[]) {
  return [...items].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function addDay(plan: TripPlan): TripPlan {
  const day = createEmptyDay(plan.days.length + 1);
  return { ...plan, days: [...plan.days, day] };
}

export function deleteDay(plan: TripPlan, dayId: string): TripPlan {
  const nextDays = plan.days.filter((day) => day.id !== dayId);
  return { ...plan, days: nextDays.length ? nextDays : [createEmptyDay(1)] };
}

export function duplicateDay(plan: TripPlan, dayId: string): TripPlan {
  const index = plan.days.findIndex((day) => day.id === dayId);
  if (index < 0) return plan;
  const source = plan.days[index];
  const copy: TripDay = {
    ...JSON.parse(JSON.stringify(source)),
    id: makeId(),
    title: `${source.title} 副本`,
    items: source.items.map((item) => ({ ...item, id: makeId() })),
  };
  const days = [...plan.days];
  days.splice(index + 1, 0, copy);
  return { ...plan, days };
}

export function createItineraryItem(): ItineraryItem {
  return {
    id: makeId(),
    startTime: "09:00",
    endTime: "10:00",
    title: "新的行程安排",
    category: "其他",
    location: "待定地点",
    transport: "",
    details: "补充这个时间段的详细说明。",
    cost: "",
    bookingInfo: "",
    mapUrl: "",
    notes: "",
  };
}
