import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { handleServiceResponse } from "@common/utils/httpHandlers";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { rolesData } from "@common/models/roleData";

function authAdmin(req: Request, res: Response, next: NextFunction): void {
    if (!req.token || !req.token.payload) { //เช็คว่า req.token มีค่าหรือไม่มี
        handleServiceResponse(
            new ServiceResponse(
                ResponseStatus.Failed,
                "Unauthorized: No token provided",
                null,
                StatusCodes.UNAUTHORIZED
            ),
            res
        );
        return;
    }
    const role = req.token?.payload?.role;

    if (!rolesData.includes(role)) { //เช็คว่า Role อยู่ใน `rolesData` หรือไม่
        handleServiceResponse(
            new ServiceResponse(
                ResponseStatus.Failed,
                "Unanthorized",
                null,
                StatusCodes.FORBIDDEN
            ),
            res
        );
        return;
    }
    next();
}

export default authAdmin;