import ExpectedIcon from "@repo/ui/assets/icons/ExpectedIcon";
import { FC } from "react";
import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";

interface Props {
  expectedByID: ExpectedOrdersType;
}

const ExpectedDateParts: FC<Props> = ({ expectedByID }) => {
  return (
    <div className="rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] mb-[16px] h-max">
      <div className="flex items-center">
        <ExpectedIcon className="mr-[16px]" />
        <div className="flex flex-col">
          <h1 className="text-info font-[500] text-green-500">Expected</h1>
          <h1 className="text-info text-green-500">
            {expectedByID?.created_at}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default ExpectedDateParts;
