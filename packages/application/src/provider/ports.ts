export interface ProviderRepositoryPort {
  create(userId: string, providerType: string): Promise<unknown>;
  getOwn(userId: string): Promise<unknown>;
}
