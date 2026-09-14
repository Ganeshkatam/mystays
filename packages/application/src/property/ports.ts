export interface PropertyRepositoryPort {
  create(input: Record<string, unknown>): Promise<unknown>;
  listOwn(providerId: string): Promise<unknown[]>;
}
