export type PropertyType =
  "house" | "apartment" | "pg" | "hostel" | "co_living" | "other";
export interface Property {
  readonly id: string;
  readonly providerId: string;
  readonly name: string;
  readonly propertyType: PropertyType;
  readonly city: string;
  readonly state: string;
  readonly countryCode: string;
}
