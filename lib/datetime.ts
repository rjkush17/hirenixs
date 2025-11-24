export const month:string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL","AUG","SEP", "OCT", "NOV", "DEC"];

// Year boundaries
export const MIN_YEAR:number = 1925 as const;
export const MAX_YEAR:number = new Date().getFullYear();
export const FUTURE_YEAR_LIMIT:number = MAX_YEAR + 10;
