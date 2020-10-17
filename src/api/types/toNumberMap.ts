import { NumberMap } from "./NumberMap";

export function toNumberMap<T extends { readonly id: number }>(
    array: T[]
  ): NumberMap<T> {
    return array.reduce((result, item) => ({ ...result, [item.id]: item }), {});
  }