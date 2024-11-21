export type ProgramType = {
  title: string;
  summary: string;
  rating: string;
  banner: string;
  startTime: string;
  endTime: string;
  downloadable?: boolean;
  blocked?: boolean;
  genre: string; // change to category
  availableUntil?: string;
  video: string;
  broadcaster: string;
  isLive: boolean;
  isOnAir: boolean;
  advice: string;
  icon: string;
};
