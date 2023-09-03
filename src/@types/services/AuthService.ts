/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Login } from '../models/Login';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * Login
     * @param requestBody User object that needs to be logged in
     * @returns Login OK
     * @throws ApiError
     */
    public static login(
        requestBody: User,
    ): CancelablePromise<Login> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Verify
     * Verify
     * @param requestBody User token that needs to be verified
     * @returns User OK
     * @throws ApiError
     */
    public static verify(
        requestBody: Login,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }

}
