export interface ValidationIssue {
  readonly field: string;
  readonly code: string;
  readonly message: string;
}
export interface ListingInput {
  title: string;
  description: string;
  monthlyRent: number;
  deposit: number;
}
export function validateListingInput(input: unknown): ValidationIssue[] {
  if (!input || typeof input !== "object")
    return [
      {
        field: "body",
        code: "INVALID_BODY",
        message: "Request body must be an object.",
      },
    ];
  const x = input as Record<string, unknown>;
  const issues: ValidationIssue[] = [];
  if (
    typeof x.title !== "string" ||
    x.title.trim().length < 10 ||
    x.title.trim().length > 160
  )
    issues.push({
      field: "title",
      code: "INVALID_TITLE",
      message: "Title must contain 10-160 characters.",
    });
  if (
    typeof x.description !== "string" ||
    x.description.trim().length < 20 ||
    x.description.trim().length > 10000
  )
    issues.push({
      field: "description",
      code: "INVALID_DESCRIPTION",
      message: "Description must contain 20-10000 characters.",
    });
  for (const f of ["monthlyRent", "deposit"])
    if (typeof x[f] !== "number" || !Number.isFinite(x[f]) || x[f] < 0)
      issues.push({
        field: f,
        code: "INVALID_MONEY",
        message: "Value must be a finite non-negative number.",
      });
  return issues;
}
