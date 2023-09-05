/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Group } from '../models/Group';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GroupsService {

    /**
     * Get group access
     * Get group access
     * @param slug Group slug
     * @returns any OK
     * @throws ApiError
     */
    public static getGroupAccess(
        slug: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/groups/{slug}/access',
            path: {
                'slug': slug,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get all group access
     * Get all group access
     * @returns any OK
     * @throws ApiError
     */
    public static getAllGroupAccess(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/groups/access',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Get all groups
     * Get all groups
     * @returns Group OK
     * @throws ApiError
     */
    public static getAllGroups(): CancelablePromise<Array<Group>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/groups',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a group
     * Create a group
     * @param requestBody Group object that needs to be added
     * @returns Group Created
     * @throws ApiError
     */
    public static createGroup(
        requestBody: Group,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/groups',
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
     * Delete a group
     * Delete a group
     * @param slug Group slug
     * @returns void
     * @throws ApiError
     */
    public static deleteGroup(
        slug: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/groups/{slug}',
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
     * Get a group
     * Get a group
     * @param slug Group slug
     * @returns Group OK
     * @throws ApiError
     */
    public static getGroup(
        slug: string,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/groups/{slug}',
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
     * Update a group
     * Update a group
     * @param slug Group slug
     * @param requestBody Group object that needs to be updated
     * @returns Group OK
     * @throws ApiError
     */
    public static updateGroup(
        slug: string,
        requestBody: Group,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/groups/{slug}',
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
