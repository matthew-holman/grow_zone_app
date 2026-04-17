/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck — generated method names contain hyphens (code-gen bug); use src/lib/adminApi.ts instead
import type { Crop } from '../models/Crop';
import type { CropMethod } from '../models/CropMethod';
import type { CropWithMethods } from '../models/CropWithMethods';
import type { Deleted } from '../models/Deleted';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminCropsService {
  /**
   * List all crops with their methods
   * @returns CropWithMethods All crops with their methods
   * @throws ApiError
   */
  public static getAdminCrops(): CancelablePromise<Array<CropWithMethods>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/crops',
    });
  }
  /**
   * Create a crop
   * @returns Crop Crop created
   * @throws ApiError
   */
  public static postAdminCrops({
    requestBody,
  }: {
    requestBody: {
      id: string;
      nameSv: string;
      nameEn: string;
      lifecycle: 'annual' | 'overwintered' | 'biennial' | 'perennial';
      frostTolerance: 'none' | 'light' | 'hard';
      minNightTempC: number | null;
      daylengthRequirement: 'neutral' | 'long' | 'short';
      notesSv?: string | null;
      notesEn?: string | null;
    },
  }): CancelablePromise<Crop> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/admin/crops',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Validation error`,
        409: `A crop with this id already exists`,
      },
    });
  }
  /**
   * Get a single crop with its methods
   * @returns CropWithMethods Crop with its methods
   * @throws ApiError
   */
  public static getAdminCrops-:id({
    id,
  }: {
    id: string,
  }): CancelablePromise<CropWithMethods> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/crops/:id',
      path: {
        'id': id,
      },
      errors: {
        404: `Crop not found`,
      },
    });
  }
  /**
   * Update a crop
   * @returns Crop Updated crop
   * @throws ApiError
   */
  public static putAdminCrops-:id({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: {
      nameSv: string;
      nameEn: string;
      lifecycle: 'annual' | 'overwintered' | 'biennial' | 'perennial';
      frostTolerance: 'none' | 'light' | 'hard';
      minNightTempC: number | null;
      daylengthRequirement: 'neutral' | 'long' | 'short';
      notesSv?: string | null;
      notesEn?: string | null;
    },
  }): CancelablePromise<Crop> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/admin/crops/:id',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Validation error`,
        404: `Crop not found`,
      },
    });
  }
  /**
   * Delete a crop and cascade its methods
   * @returns Deleted Crop deleted
   * @throws ApiError
   */
  public static deleteAdminCrops-:id({
    id,
  }: {
    id: string,
  }): CancelablePromise<Deleted> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/admin/crops/:id',
      path: {
        'id': id,
      },
      errors: {
        404: `Crop not found`,
      },
    });
  }
  /**
   * List a crop's methods
   * @returns CropMethod Methods for the crop
   * @throws ApiError
   */
  public static getAdminCrops-:idMethods({
    id,
  }: {
    id: string,
  }): CancelablePromise<Array<CropMethod>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin/crops/:id/methods',
      path: {
        'id': id,
      },
      errors: {
        404: `Crop not found`,
      },
    });
  }
  /**
   * Add a method to a crop
   * cropId is taken from the URL — do not include it in the request body.
   * @returns CropMethod Method created
   * @throws ApiError
   */
  public static postAdminCrops-:idMethods({
    id,
    requestBody,
  }: {
    id: string,
    requestBody: {
      id: string;
      labelSv: string;
      labelEn: string;
      germinationMinSoilTempC: number | null;
      germinationOptSoilTempC: number | null;
      daysToGerminationMin: number | null;
      daysToGerminationMax: number | null;
      daysToMaturityMin: number | null;
      daysToMaturityMax: number | null;
      transplantTolerance: 'good' | 'poor' | 'none' | 'direct-only';
      gddRequired: number | null;
      plantBeforeFirstFrostDays: number | null;
      sortOrder?: number;
    },
  }): CancelablePromise<CropMethod> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/admin/crops/:id/methods',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Validation error`,
        404: `Crop not found`,
        409: `A method with this id already exists`,
      },
    });
  }
  /**
   * Update a crop method
   * @returns CropMethod Updated method
   * @throws ApiError
   */
  public static putAdminCrops-:idMethods-:mid({
    id,
    mid,
    requestBody,
  }: {
    id: string,
    mid: string,
    requestBody: {
      labelSv: string;
      labelEn: string;
      germinationMinSoilTempC: number | null;
      germinationOptSoilTempC: number | null;
      daysToGerminationMin: number | null;
      daysToGerminationMax: number | null;
      daysToMaturityMin: number | null;
      daysToMaturityMax: number | null;
      transplantTolerance: 'good' | 'poor' | 'none' | 'direct-only';
      gddRequired: number | null;
      plantBeforeFirstFrostDays: number | null;
      sortOrder?: number;
    },
  }): CancelablePromise<CropMethod> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/admin/crops/:id/methods/:mid',
      path: {
        'id': id,
        'mid': mid,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Validation error`,
        404: `Crop or method not found`,
      },
    });
  }
  /**
   * Delete a crop method
   * @returns Deleted Method deleted
   * @throws ApiError
   */
  public static deleteAdminCrops-:idMethods-:mid({
    id,
    mid,
  }: {
    id: string,
    mid: string,
  }): CancelablePromise<Deleted> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/admin/crops/:id/methods/:mid',
      path: {
        'id': id,
        'mid': mid,
      },
      errors: {
        404: `Crop or method not found`,
      },
    });
  }
}
