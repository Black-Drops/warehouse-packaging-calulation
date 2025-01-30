import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { warehouseRepository } from "@modules/warehouse/warehouseRepository";
import { TypePayloadWarehouse } from "@modules/warehouse/warehouseModel";
import { warehouse, zone } from "@prisma/client";

export const warehouseService = {
    findAll: async () => {
        const warehouses = await warehouseRepository.findAllAsync();
        return new ServiceResponse(
            ResponseStatus.Success,
            "Get all warehouses success",
            warehouses,
            StatusCodes.OK
        );
    },

    findById: async (warehouse_id: string) => {
        const warehouse = await warehouseRepository.findById(warehouse_id);
        if (!warehouse) {
            return new ServiceResponse(
                ResponseStatus.Failed,
                "Warehouse not found",
                null,
                StatusCodes.NOT_FOUND
            );
        }
        return new ServiceResponse(
            ResponseStatus.Success,
            "Get warehouse success",
            warehouse,
            StatusCodes.OK
        );
    },

    create: async (payload: TypePayloadWarehouse) => {
        try {
            const checkWarehouse = await warehouseRepository.findByName(payload.warehouse_name);
            if (checkWarehouse) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Warehouse name already taken",
                    null,
                    StatusCodes.BAD_REQUEST
                );
            }
            const newWarehouse = await warehouseRepository.create(payload);
            return new ServiceResponse<warehouse>(
                ResponseStatus.Success,
                "Create warehouse success",
                newWarehouse,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error creating warehouse: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    update: async (warehouse_id: string, payload: Partial<TypePayloadWarehouse>) => {
        try {
            const updatedWarehouse = await warehouseRepository.update(warehouse_id, payload);
            return new ServiceResponse<warehouse>(
                ResponseStatus.Success,
                "Update warehouse success",
                updatedWarehouse,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error updating warehouse: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    delete: async (warehouse_id: string) => {
        try {
            await warehouseRepository.delete(warehouse_id);
            return new ServiceResponse(
                ResponseStatus.Success,
                "Delete warehouse success",
                null,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error deleting warehouse: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    findZonesByWarehouse: async (warehouse_id: string) => {
        try {
            const zones = await warehouseRepository.findZonesByWarehouse(warehouse_id);
            return new ServiceResponse<zone[]>(
                ResponseStatus.Success,
                "Get zones for warehouse success",
                zones,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error retrieving zones: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
};

