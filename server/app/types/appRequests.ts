import { Request } from 'express'

export declare interface AuthenticatedRequest extends Request {
    user?: any;
}
