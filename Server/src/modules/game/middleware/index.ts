import { NextFunction, Request, Response } from 'express'
import { randomUUID } from 'node:crypto'

export function createIdGame(request: Request, response: Response, next: NextFunction) {
    const { body } = request
    console.log(body);
    // @ts-ignore
    body.idGame = randomUUID()
    request.body = body
    next()
}