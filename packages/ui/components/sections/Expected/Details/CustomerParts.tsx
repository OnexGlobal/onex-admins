import { Link } from "react-router-dom";
import PrimeIcon from "@repo/ui/assets/icons/PrimeIcon";
import { FC } from "react";
import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";

interface Props {
  expectedByID: ExpectedOrdersType;
}

const CustomerParts: FC<Props> = ({ expectedByID }) => {
  return (
    <div className="flex justify-between p-[16px] rounded-[12px] bg-white mb-[16px] h-max">
      <div className="flex items-center gap-[50px]">
        <div>
          <h1 className="text-info font-[500] text-oxford-blue-400">
            Customer
          </h1>
          <Link
            className="hover:!text-green-500"
            to={`/customer/${expectedByID?.recipient?.user?.id}`}
          >
            <h1 className="text-info mt-[5px]">
              {
                <div className="flex items-center">
                  {expectedByID?.user?.full_name || ""}
                  {" " + expectedByID?.user?.user_code || ""}
                  {expectedByID?.user?.is_prime ? (
                    <PrimeIcon className="ml-[10px]" />
                  ) : null}
                </div>
              }
            </h1>
          </Link>
        </div>
        <div className="border-l-[1px] border-oxford-blue-50 pl-[10px] h-max">
          <h1 className="text-info font-[500] text-oxford-blue-400">
            Recipient
          </h1>
          <h1 className="text-info mt-[5px]">
            {
              <>
                {`${expectedByID?.recipient?.first_name} ${expectedByID?.recipient?.last_name} ${expectedByID?.recipient?.user_code}`}
              </>
            }
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CustomerParts;
