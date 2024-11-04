import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

export type Refetch = <TPageData>(
  options?: RefetchOptions & RefetchQueryFilters<TPageData>
) => Promise<QueryObserverResult<unknown, unknown>>;
