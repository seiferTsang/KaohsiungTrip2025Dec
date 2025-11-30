
export interface ItineraryItem {
  id: string;
  time: string;
  name: string;
  address: string;
  hours: string;
  description: string;
  imageUrl: string; // URL for the attraction image
  locationQuery: string; // For Google Maps
}

export interface DaySchedule {
  date: string;
  dayLabel: string; // e.g., "Day 1"
  items: ItineraryItem[];
}

export interface NoteData {
  content: string;
  timestamp: number;
}

export interface WeatherData {
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}
