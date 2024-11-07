import { HeaderParts } from "./HeaderParts";
import CustomerParts from "./CustomerParts";
import ExpectedDateParts from "./ExpectedDateParts";
import ServiceParts from "./ServiceParts";
import { FC } from "react";
import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";
import { Refetch } from "@repo/types";
import { Loader } from "@repo/ui/components/loader/Loader";

interface Props {
  expectedByID: ExpectedOrdersType;
  setAddService: (val: boolean) => void;
  setEditable: (val: boolean) => void;
  refetch: Refetch;
  isLoading: boolean;
}

export const DetailsOrder: FC<Props> = ({
  expectedByID,
  setEditable,
  setAddService,
  refetch,
  isLoading,
}) => {
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <HeaderParts
        expectedByID={expectedByID}
        setEditable={setEditable}
        setAddService={setAddService}
      />

      <CustomerParts expectedByID={expectedByID} />
      <ExpectedDateParts expectedByID={expectedByID} />
      {!!expectedByID?.order_smart_services && (
        <ServiceParts expectedByID={expectedByID} refetch={refetch} />
      )}
    </>
  );
};
