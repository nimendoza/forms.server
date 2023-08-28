/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Privilege } from '../models/Privilege';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PrivilegesService {

    /**
     * Get all privileges
     * Get all privileges
     * @returns Privilege OK
     * @throws ApiError
     */
    public static getAllPrivileges(): CancelablePromise<Array<Privilege>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/privileges',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a privilege
     * Create a privilege
     * @param requestBody Privilege object that needs to be added
     * @returns Privilege Created
     * @throws ApiError
     */
    public static createPrivilege(
        requestBody: Privilege,
    ): CancelablePromise<Privilege> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/privileges',
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
     * Delete a privilege
     * Delete a privilege
     * @param slug Privilege slug
     * @returns void
     * @throws ApiError
     */
    public static deletePrivilege(
        slug: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/privileges/{slug}',
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
     * Get a privilege
     * Get a privilege
     * @param slug Privilege slug
     * @returns Privilege OK
     * @throws ApiError
     */
    public static getPrivilege(
        slug: string,
    ): CancelablePromise<Privilege> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/privileges/{slug}',
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
     * Update a privilege
     * Update a privilege
     * @param slug Privilege slug
     * @param requestBody Privilege object that needs to be updated
     * @returns Privilege OK
     * @throws ApiError
     */
    public static updatePrivilege(
        slug: string,
        requestBody: Privilege,
    ): CancelablePromise<Privilege> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/privileges/{slug}',
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
