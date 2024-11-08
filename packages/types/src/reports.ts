export interface FilterType {
  type: string;
  end_date?: null | string;
  start_date?: null | string;
}

export interface ModalComponentProps {
  orders: {
    data: {
      name: string;
      value: string;
      w_flag: string;
      dispatch: string;
      d_icon: string;
    }[];
  };
  bonus_in: {
    data: {
      name: string;
      value: string;
      w_flag: string;
      dispatch: string;
      d_icon: string;
    }[];
    type: string;
  };
  home_delivery: {
    data: {
      total_sum: string;
      region_name: string;
      total_cost?: number | string;

      service_name?: string;
    }[];
    type?: string;
  };
  buy_for_me: { data?: { name?: string; value?: string }[] };
}
