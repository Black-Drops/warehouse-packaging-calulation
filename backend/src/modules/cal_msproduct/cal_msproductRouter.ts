import { cal_msproductService } from '@modules/cal_msproduct/cal_msproductService';
import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest, } from "@common/utils/httpHandlers";
import { CreateCal_msproductSchema, DeleteCal_msproductSchema, UpdateCal_msproductSchema, } from "@modules/cal_msproduct/cal_msproductModel";
import authAdmin from "@common/middleware/AuthAll";
import authToken from "@common/middleware/AuthToken";

export const cal_msproductRouter = (() => {
    const router = express.Router();

    router.get("/get", authAdmin, authToken, async (req: Request, res: Response) => {
        const ServiceResponse = await cal_msproductService.findAll();
        handleServiceResponse(ServiceResponse, res);
    });

    router.post("/create", authAdmin, authToken, validateRequest(CreateCal_msproductSchema),
        async (req: Request, res: Response) => {
            const payload = req.body;
            const ServiceResponse = await cal_msproductService.create(payload);
            handleServiceResponse(ServiceResponse, res);
            //   console.log(payload);
        }
    );

    router.put("/update", authAdmin, authToken, validateRequest(UpdateCal_msproductSchema),
        async (req: Request, res: Response) => {
            const { cal_product_id } = req.body;
            const payload = req.body;
            const ServiceResponse = await cal_msproductService.update(cal_product_id, payload);
            handleServiceResponse(ServiceResponse, res);
        }
    );

    router.delete("/delete/:cal_product_id", authAdmin, authToken, validateRequest(DeleteCal_msproductSchema),
        async (req: Request, res: Response) => {
            const { cal_product_id } = req.params;
            const ServiceResponse = await cal_msproductService.delete(cal_product_id);
            handleServiceResponse(ServiceResponse, res);
        }
    );


    return router;
})();
