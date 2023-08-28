/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Success } from '../models/Success';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ResponsesService {

    /**
     * Get all responses
     * Get all responses
     * @returns Success OK
     * @throws ApiError
     */
    public static getAllResponses(): CancelablePromise<Array<Success>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/responses',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete a response
     * Delete a response
     * @param slug Response slug
     * @returns void
     * @throws ApiError
     */
    public static deleteResponse(
        slug: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/responses/{slug}',
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
     * Get a response
     * Get a response
     * @param slug Response slug
     * @returns Success OK
     * @throws ApiError
     */
    public static getResponse(
        slug: string,
    ): CancelablePromise<Success> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/responses/{slug}',
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
     * Update a response
     * Update a response
     * @param slug Response slug
     * @param requestBody Response object that needs to be updated
     * @returns Success OK
     * @throws ApiError
     */
    public static updateResponse(
        slug: string,
        requestBody: Success,
    ): CancelablePromise<Success> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/responses/{slug}',
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
