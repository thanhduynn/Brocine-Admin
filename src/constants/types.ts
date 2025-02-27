export const GLOBAL_WORK_TYPES = {
  mv: "Music Video",
  talkshow: "Talkshow",
  docs: "Documentary Film",
  tvc: "TVC",
  brandingFilm: "Branding Film",
  event: "Event Video",
} as const;

export type WorkType = typeof GLOBAL_WORK_TYPES[keyof typeof GLOBAL_WORK_TYPES];