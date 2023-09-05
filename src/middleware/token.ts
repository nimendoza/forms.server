import jwt from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express'

import { payload, tokenize } from 'utils'

const strict = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization
    
    if (!auth || Object.keys(auth).length === 0) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET!) as payload
        req.payload = decoded

        const token = tokenize(decoded)
        res.setHeader('authorization', token)

        return next()
    } catch (error) {
        return res.status(500).end()
    }
}

const optional = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization

    if (!auth || Object.keys(auth).length === 0) {
        req.payload = undefined
        
        return next()
    }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET!) as payload
        req.payload = decoded

        const token = tokenize(decoded)
        res.setHeader('authorization', token)
    } catch (error) {
        req.payload = undefined
    }

    return next()
}

export const check_token = (is_strict: boolean) => {
    return is_strict ? strict : optional
}
