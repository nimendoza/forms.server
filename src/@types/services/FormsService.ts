/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Form } from '../models/Form';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FormsService {

    /**
     * Get all forms
     * Get all forms
     * @returns Form OK
     * @throws ApiError
     */
    public static getAllForms(): CancelablePromise<Array<Form>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/forms',
            errors: {
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a form
     * Create a form
     * @param requestBody Form object that needs to be added
     * @returns Form Created
     * @throws ApiError
     */
    public static createForm(
        requestBody: Form,
    ): CancelablePromise<Form> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/forms',
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
     * Delete a form
     * Delete a form
     * @param slug Form slug
     * @returns void
     * @throws ApiError
     */
    public static deleteForm(
        slug: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/forms/{slug}',
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
     * Get a form
     * Get a form
     * @param slug Form slug
     * @returns Form OK
     * @throws ApiError
     */
    public static getForm(
        slug: string,
    ): CancelablePromise<Form> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/forms/{slug}',
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
     * Update a form
     * Update a form
     * @param slug Form slug
     * @param requestBody Form object that needs to be updated
     * @returns Form OK
     * @throws ApiError
     */
    public static updateForm(
        slug: string,
        requestBody: Form,
    ): CancelablePromise<Form> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/forms/{slug}',
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
