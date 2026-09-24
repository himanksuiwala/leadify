import { Response } from 'express';

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, any>;
};

export const sendSuccess = <T>(res: Response, data: T, meta?: Record<string, any>, status = 200) => {
  const response: ApiResponse<T> = { data };
  if (meta) {
    response.meta = meta;
  }
  return res.status(status).json(response);
};
