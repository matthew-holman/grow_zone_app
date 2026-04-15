/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarWindow } from './CalendarWindow';
export type MethodCalendar = {
  methodId: string;
  methodLabelSv: string;
  methodLabelEn: string;
  feasibility: MethodCalendar.feasibility;
  feasibilityReason: string | null;
  sowIndoors: CalendarWindow;
  directSow: CalendarWindow;
  transplant: CalendarWindow;
  harvest: CalendarWindow;
};
export namespace MethodCalendar {
  export enum feasibility {
    FEASIBLE = 'feasible',
    MARGINAL = 'marginal',
    INFEASIBLE = 'infeasible',
  }
}

