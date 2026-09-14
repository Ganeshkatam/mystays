export interface InventoryRepositoryPort {
  create(input: Record<string, unknown>): Promise<unknown>;
}
export interface InventoryStatusRepositoryPort {
  updateStatus(
    id: string,
    status: "available" | "occupied" | "inactive",
  ): Promise<unknown>;
}
