export type RefundType =
  | false
  | {
      id?: number | undefined;
      request_amount: string | number;
      refund_amount: string | number;
    };
