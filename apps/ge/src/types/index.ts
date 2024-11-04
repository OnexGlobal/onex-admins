import { AxiosResponse } from "axios";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

export type { SVGProps } from "./svg-types";
export type {
  CustomersTableType,
  UserType,
  CustomersSearchType,
} from "./customers-type";

export type Refetch = <TPageData>(
  options?: RefetchOptions & RefetchQueryFilters<TPageData>
) => Promise<QueryObserverResult<unknown, unknown>>;

export type ErrorType =
  | ((
      error: Record<
        string,
        {
          data: {
            data: { amount: string[]; order_ids: string[] } & unknown;
            message: string;
          };
        }
      >,
      variables: Record<string, string | unknown>,
      context: unknown
    ) => void | Promise<unknown>)
  | undefined;

export type SuccessType =
  | ((
      data: AxiosResponse<{
        data: unknown;
        message: string;
        status_code: number;
        success: boolean;
      }>,
      variables: Record<
        string,
        string | undefined | number | Blob | null | unknown
      >,
      context: unknown
    ) => void | Promise<unknown>)
  | undefined;
