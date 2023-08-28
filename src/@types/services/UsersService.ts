/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Get all users
     * Get all users
     * @returns User OK
     * @throws ApiError
     */
    public static getAllUsers(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a user
     * Create a user
     * @param requestBody User object that needs to be added
     * @returns User Created
     * @throws ApiError
     */
    public static createUser(
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users',
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
     * Delete a user
     * Delete a user
     * @param email User email
     * @returns void
     * @throws ApiError
     */
    public static deleteUser(
        email: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{email}',
            path: {
                'email': email,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get a user
     * Get a user
     * @param email User email
     * @returns User OK
     * @throws ApiError
     */
    public static getUser(
        email: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{email}',
            path: {
                'email': email,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update a user
     * Update a user
     * @param email User email
     * @param requestBody User object that needs to be updated
     * @returns User OK
     * @throws ApiError
     */
    public static updateUser(
        email: string,
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/users/{email}',
            path: {
                'email': email,
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
