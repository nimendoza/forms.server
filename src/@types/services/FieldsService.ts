/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Field } from '../models/Field';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FieldsService {

    /**
     * Get all fields
     * Get all fields
     * @returns Field OK
     * @throws ApiError
     */
    public static getAllFields(): CancelablePromise<Array<Field>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/fields',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a field
     * Create a field
     * @param requestBody Field object that needs to be added
     * @returns Field Created
     * @throws ApiError
     */
    public static createField(
        requestBody: Field,
    ): CancelablePromise<Field> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/fields',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete a field
     * Delete a field
     * @param slug Field slug
     * @returns void
     * @throws ApiError
     */
    public static deleteField(
        slug: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/fields/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get a field
     * Get a field
     * @param slug Field slug
     * @returns Field OK
     * @throws ApiError
     */
    public static getField(
        slug: string,
    ): CancelablePromise<Field> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/fields/{slug}',
            path: {
                'slug': slug,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update a field
     * Update a field
     * @param slug Field slug
     * @param requestBody Field object that needs to be updated
     * @returns Field OK
     * @throws ApiError
     */
    public static updateField(
        slug: string,
        requestBody: Field,
    ): CancelablePromise<Field> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/fields/{slug}',
            path: {
                'slug': slug,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }

}
