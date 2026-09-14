import type { ProviderRepositoryPort } from "./ports";
import { ApplicationError } from "../shared/errors";
export async function createProvider(
  repo: ProviderRepositoryPort,
  userId: string,
  providerType: string,
) {
  if (!userId || !providerType)
    throw new ApplicationError(
      "INVALID_PROVIDER",
      "Provider identity and type are required.",
    );
  return repo.create(userId, providerType);
}
