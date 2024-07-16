import { Request, Response, NextFunction } from "express"
import * as yup from "yup"

const errorHandlerYup = (
  schema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.validateSync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorsYup = error as yup.ValidationError
    const validationErrors: Record<string, string> = {}
    errorsYup.inner.forEach((error) => {
      if (error.path) {
        validationErrors[error.path] = error.message
      }
    })
    res.status(400).json({ error: validationErrors })
  }
}

export default errorHandlerYup