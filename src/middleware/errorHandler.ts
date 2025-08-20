import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = typeof err?.status === 'number' ? err.status : 500
  const message = typeof err?.message === 'string' ? err.message : 'Internal Server Error'

  if (status >= 500) {
    console.error('Unhandled error:', err)
  } else {
    console.warn('Request error:', err)
  }

  res.status(status).json({
    error: status === 500 ? 'Internal server error' : 'Request error',
    message
  })
}

