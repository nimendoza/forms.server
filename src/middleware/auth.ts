import { Request, Response, NextFunction } from 'express'

import { User } from '@types'
import { users } from 'orm'
import { validator } from 'utils'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as User

    if (!validator.is_email(body.email)) {
        return res.status(400).json({ message: 'A valid email is required' }).end()
    }

    if (validator.is_empty(body.password)) {
        return res.status(400).json({ message: 'The password field is required' }).end()
    }

    const user = await users.findOneBy({ email: body.email })

    if (!user) {
        return res.status(400).json({ message: 'Email does not exist' }).end()
    }

    if (!user.check_password(body.password)) {
        return res.status(400).json({ message: 'Password is incorrect' }).end()
    }

    return next()
}
