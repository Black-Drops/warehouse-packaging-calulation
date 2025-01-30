import { warehouse } from "@prisma/client";
import prisma from "@src/db";
import { TypePayloadWarehouse } from "@modules/warehouse/warehouseModel";

export const WarehouseKeys = [
    "warehouse_id",
    "warehouse_name",
    "location",
    "capacity",
    "update_by",
    "update_date",
    "description",
];

export const warehouseRepository = {
    findAllAsync: async () => {
        return prisma.warehouse.findMany({
            select: {
                warehouse_id: true,
                warehouse_name: true,
                location: true,
                capacity: true,
                update_by: true,
                update_date: true,
                description: true,
            },
        });
    },

    findByName: async <Key extends keyof warehouse>(
        warehouse_name: string,
        keys = WarehouseKeys as Key[]
    ): Promise<Pick<warehouse, Key> | null> => {
        const selectedFields = keys.reduce(
            (obj, k) => ({ ...obj, [k]: true }),
            {} as Record<Key, true>
        );

        const result = await prisma.warehouse.findFirst({
            where: { warehouse_name: warehouse_name },
            select: selectedFields,
        });

        return result as Pick<warehouse, Key> | null;
    },

    create: async (payload: TypePayloadWarehouse) => {
        const warehouse_name = payload.warehouse_name.trim();
        const setPayload = {
            warehouse_name: warehouse_name,
            location: payload.location,
            capacity: payload.capacity,
            description: payload.description,
        };

        return await prisma.warehouse.create({
            data: setPayload,
        });
    },

    update: async (warehouse_id: string, payload: Partial<TypePayloadWarehouse>) => {
        return await prisma.warehouse.update({
            where: { warehouse_id: warehouse_id },
            data: payload,
        });
    },

    delete: async (warehouse_id: string) => {
        return await prisma.warehouse.delete({
            where: { warehouse_id: warehouse_id },
        });
    },
};
