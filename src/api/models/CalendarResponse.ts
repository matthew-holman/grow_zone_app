/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CropCalendar } from './CropCalendar';
export type CalendarResponse = {
  postcode: string;
  location: {
    lat: number;
    lng: number;
    elevationM: number;
  };
  climate: {
    lastFrostDoy: number;
    lastFrostP90: number;
    firstFrostDoy: number;
    firstFrostP10: number;
    growingDays: number;
    gddAnnual: number;
    gddP10: number;
    gddP90: number;
    gddCv: number;
    monthlyMeanTemps: Array<number>;
  };
  crops: Array<CropCalendar>;
};

