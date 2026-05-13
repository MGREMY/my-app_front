export interface AdditionalFlagsRequest {
  includeDeletedItems: boolean;
}

export function additionalFlagsToURLSearchParams(request: AdditionalFlagsRequest) {
  const urlSearchParams = new URLSearchParams({
    includeDeletedItems: request.includeDeletedItems.toString(),
  });

  return urlSearchParams;
}
