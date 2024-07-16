import { Request, Response, NextFunction } from "express"
import { BadRequest } from "../utils/errorHandler.js"

export const checkIdMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const params = { ...req.params }

    for (const param in params) {
        if (!Number.isInteger(Number(params[param]))) {
            return next(new BadRequest("Invalid id"))
        }
    }

    next()
}