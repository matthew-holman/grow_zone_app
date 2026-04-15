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
   * Get growing calendar for a Swedish postcode
   * Resolves the nearest SMHI weather stations for the postcode, derives a climate profile via inverse distance weighting, and returns a structured growing calendar for all crops in the database.
   * @returns CalendarResponse Growing calendar for the given postcode
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
        404: `Postcode not found in the database`,
        503: `Not enough weather station data for this location`,
      },
    });
  }
}
