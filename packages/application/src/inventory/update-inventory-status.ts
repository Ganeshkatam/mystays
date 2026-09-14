import type { InventoryStatusRepositoryPort } from "./ports";

export async function updateInventoryStatus(
  repo: InventoryStatusRepositoryPort,
  id: string,
  status: "available" | "occupied" | "inactive",
): Promise<unknown> {
  if (
    !/^[0-9a-f-]{36}$/i.test(id) ||
    !["available", "occupied", "inactive"].includes(status)
  )
    throw new Error("INVALID_INVENTORY_STATUS");
  return repo.updateStatus(id, status);
}
