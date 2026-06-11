export type TripPlan = {
  title: string;
  subtitle: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  style: string;
  overviewNotes: string;
  days: TripDay[];
};

export type TripDay = {
  id: string;
  date: string;
  city: string;
  title: string;
  theme: string;
  summary: string;
  items: ItineraryItem[];
  meals: {
    breakfast: MealInfo;
    lunch: MealInfo;
    dinner: MealInfo;
  };
  hotel: HotelInfo;
  notes: string;
};

export type ItineraryItem = {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  category: string;
  location: string;
  transport: string;
  details: string;
  cost: string;
  bookingInfo: string;
  mapUrl: string;
  notes: string;
};

export type MealInfo = {
  name: string;
  time: string;
  location: string;
  mapUrl: string;
  budget: string;
  notes: string;
};

export type HotelInfo = {
  name: string;
  address: string;
  mapUrl: string;
  bookingPlatform: string;
  confirmationNumber: string;
  notes: string;
};

export const CATEGORIES = [
  "交通",
  "景点",
  "餐饮",
  "住宿",
  "购物",
  "温泉",
  "徒步",
  "休息",
  "备用方案",
  "其他",
] as const;

export type Category = (typeof CATEGORIES)[number];
