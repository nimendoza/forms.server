import { Request, Response } from 'express'

import { users } from 'orm'
import { tokenize } from 'utils'

export const login = async (req: Request, res: Response) => {
    const user = await users.findOneBy({ email: req.body.email })
    const token = tokenize({ user_id: user!.id })

    return res.status(200).json({ token }).end()
}

export const verify = async (req: Request, res: Response) => {
    const user = await users.findOneBy({ id: req.payload!.user_id })

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' }).end()
    }

    return res.status(200).json(user!.to_JSON()).end()
}
