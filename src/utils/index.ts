import jwt from 'jsonwebtoken'

export type payload = {
    user_id: string
}

type json_value = string | number | boolean | { [key: string]: json_value } | json_value[]

export type json = { [key: string]: json_value }

export const tokenize = (load: payload): string => {
    return jwt.sign(load, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

class Validator {
    is_email(email: string): boolean {
        const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        return regex.test(email)
    }

    is_empty(value: unknown): boolean {
        if (value) {
            if (typeof value === 'string') {
                return value.length === 0 || !value.trim()
            }
    
            if (typeof value === 'object') {
                return Object.keys(value).length === 0
            }
    
            return false
        }

        if (value === undefined || value === null) {
            return true
        }

        return false
    }

    is_length(value: unknown, min: number, max: number): boolean {
        if (min < 0) {
            throw new Error('Minimum cannot be less than zero')
        }

        if (min > max) {
            throw new Error('Minimum cannot be greater than maximum')
        }

        if (!this.is_empty(value)) {
            if (typeof value === 'string') {
                return value.length >= min && value.length <= max
            }

            if (typeof value === 'object' && !!value) {
                return Object.keys(value).length >= min && Object.keys(value).length <= max
            }
        }

        return min === 0
    }

    is_equal(value: string, compare: string): boolean {
        return value === compare
    }

    clean_string(value: string | null | undefined): string {
        return value ? value.trim() : ''
    }
}

export const validator = new Validator()
