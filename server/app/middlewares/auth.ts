import { Request, Response, NextFunction } from 'express';
import * as tokenService from '../services/tokenService';
import { AuthenticatedRequest } from '../types/appRequests';

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    //Auth Logic Here
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            console.log("🔴NO ACCESS TOKEN")
            return res.status(401).json({ msg: "You are not authenticated!" })
        }
        const userData = tokenService.verifyAccessToken(accessToken);
        if (!userData) {
            console.log("🔴NO USER DATA | TOKEN NOT VERIFIED")
            return res.status(401).json({ msg: "You are not authenticated to aceess!!" })
        }
        console.log("PASSED MIDDLEWARE");
        console.log(userData);
        (req as any).user = userData;
        next();

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err })
    }
}