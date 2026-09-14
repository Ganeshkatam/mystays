import type { PropertyRepositoryPort } from "./ports";
import { ApplicationError } from "../shared/errors";

export interface PropertyInput {
  providerId: string;
  name: string;
  propertyType: string;
  description: string;
  addressLine1: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export async function createProperty(
  repo: PropertyRepositoryPort,
  input: PropertyInput,
): Promise<unknown> {
  if (
    !input.providerId ||
    !input.name.trim() ||
    !input.propertyType.trim() ||
    !input.addressLine1.trim() ||
    !input.locality.trim() ||
    !input.city.trim() ||
    !input.state.trim() ||
    !input.postalCode.trim() ||
    !/^[A-Z]{2}$/.test(input.countryCode)
  ) {
    throw new ApplicationError(
      "INVALID_PROPERTY",
      "Property input is invalid.",
    );
  }
  return repo.create({
    provider_id: input.providerId,
    name: input.name.trim(),
    property_type: input.propertyType,
    description: input.description.trim(),
    address_line1: input.addressLine1.trim(),
    locality: input.locality.trim(),
    city: input.city.trim(),
    state: input.state.trim(),
    postal_code: input.postalCode.trim(),
    country_code: input.countryCode,
  });
}
