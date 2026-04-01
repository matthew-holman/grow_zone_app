/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarResponse } from '../models/CalendarResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CalendarService {
  /**
   * Get crop calendar for a Swedish postcode
   * Resolves the growing zone for a 5-digit Swedish postcode and returns a month-by-month sow/plant/harvest calendar for each supported crop.
   * @returns CalendarResponse Crop calendar for the given postcode
   * @throws ApiError
   */
  public static getCalendar({
    postcode,
  }: {
    postcode: string,
  }): CancelablePromise<CalendarResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/calendar',
      query: {
        'postcode': postcode,
      },
      errors: {
        400: `Invalid or missing postcode`,
        404: `Postcode not found in the Swedish postcode database`,
        500: `Internal server error`,
      },
    });
  }
}
