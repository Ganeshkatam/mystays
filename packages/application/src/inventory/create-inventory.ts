import type { InventoryRepositoryPort } from './ports';
import { ApplicationError } from '../shared/errors';

export interface InventoryInput {
  propertyId: string;
  inventoryType: string;
  parentInventoryId?: string;
  label: string;
  occupancyCapacity: number;
  furnishing?: string;
}

export async function createInventory(repo: InventoryRepositoryPort, input: InventoryInput): Promise<unknown> {
  if (!input.propertyId || !input.inventoryType.trim() || !input.label.trim() ||
      !Number.isInteger(input.occupancyCapacity) || input.occupancyCapacity < 1 || input.occupancyCapacity > 100) {
    throw new ApplicationError('INVALID_INVENTORY', 'Inventory input is invalid.');
  }
  return repo.create({
    property_id: input.propertyId,
    inventory_type: input.inventoryType,
    ...(input.parentInventoryId ? { parent_inventory_id: input.parentInventoryId } : {}),
    label: input.label.trim(),
    occupancy_capacity: input.occupancyCapacity,
    ...(input.furnishing?.trim() ? { furnishing: input.furnishing.trim() } : {}),
  });
}
