/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Scope } from '../models/Scope';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScopesService {

    /**
     * Get scope access
     * Get scope access
     * @param slug Scope slug
     * @returns any OK
     * @throws ApiError
     */
    public static getScopeAccess(
        slug: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scopes/{slug}/access',
            path: {
                'slug': slug,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get all scope access
     * Get all scope access
     * @returns any OK
     * @throws ApiError
     */
    public static getAllScopeAccess(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scopes/access',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get all scopes
     * Get all scopes
     * @returns Scope OK
     * @throws ApiError
     */
    public static getAllScopes(): CancelablePromise<Array<Scope>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scopes',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete a scope
     * Delete a scope
     * @param slug Scope slug
     * @returns void
     * @throws ApiError
     */
    public static deleteScope(
        slug: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/scopes/{slug}',
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
     * Get a scope
     * Get a scope
     * @param slug Scope slug
     * @returns Scope OK
     * @throws ApiError
     */
    public static getScope(
        slug: string,
    ): CancelablePromise<Scope> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/scopes/{slug}',
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
     * Update a scope
     * Update a scope
     * @param slug Scope slug
     * @param requestBody Scope object that needs to be updated
     * @returns Scope OK
     * @throws ApiError
     */
    public static updateScope(
        slug: string,
        requestBody: Scope,
    ): CancelablePromise<Scope> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/scopes/{slug}',
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
