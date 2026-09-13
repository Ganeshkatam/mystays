export type InventoryType='unit'|'room'|'bed';
export type InventoryStatus='available'|'occupied'|'inactive';
export interface Inventory { readonly id:string; readonly propertyId:string; readonly inventoryType:InventoryType; readonly parentInventoryId:string|null; readonly label:string; readonly occupancyCapacity:number; readonly status:InventoryStatus; }