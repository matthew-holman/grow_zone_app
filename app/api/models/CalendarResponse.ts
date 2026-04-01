/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CropCalendarEntry } from './CropCalendarEntry';
export type CalendarResponse = {
  postcode: string;
  /**
   * Swedish growing zone (1–5, where 1 is southernmost)
   */
  zone: (1 | 2 | 3 | 4 | 5);
  crops: Array<CropCalendarEntry>;
};

