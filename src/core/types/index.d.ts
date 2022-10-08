export {};

declare global {
  namespace Express {
    export interface Request {
      premadeResponse: {
        responseObj: Record<string, unknown> | undefined;
        moduleFunctionPath: string;
      };
    }
  }
}
