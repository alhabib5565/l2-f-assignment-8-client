export type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

export type ResponseSuccessType = {
  data: any;
  meta?: TMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
