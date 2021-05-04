import { Request, Response, NextFunction } from "express";
import HttpException from "../Exceptions/http.exception";

export const errorHandler = (
  error: Error | HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
    let status = 500
    if (error instanceof HttpException){
        status = error.statusCode || error.status || 500;
    }

  response.status(status).send(error);
};