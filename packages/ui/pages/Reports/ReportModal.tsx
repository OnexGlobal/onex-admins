import { Empty, Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import { ModalComponentProps } from "@repo/types/src/reports";
import { useGetReportsTypeList } from "../../hooks/reports/useGetReportsTypeList.hook";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import { Loader } from "../../components/loader/Loader";
const BonusIn = ({ data = [], type }: ModalComponentProps["bonus_in"]) => {
  let total = 0;
  data?.forEach((el) => {
    if (el?.value) {
      total += Number(el?.value);
    }
  });
  return (
    <>
      <div className="flex justify-between">
        <span className="text-[18px] font-[500] text-oxford-blue-300 py-[16px]">
          {type === "bonus_in"
            ? "Bonus In"
            : type === "balance_out"
              ? "Balance out"
              : "Balance in"}
        </span>
        <span className="text-[18px] font-[500] text-oxford-blue-300 py-[16px]">
          Total: {total.toFixed(2)} $
        </span>
      </div>
      {data?.length > 0 ? (
        data?.map((el, i) => (
          <div className="flex flex-col" key={i}>
            <span className="text-[22px] font-[500] text-[#000] ">
              {el?.value || "0.00"}
            </span>
            <span className="text-[14px] font-[400] text-oxford-blue-300 pt-[5px] pb-[10px]">
              {el?.name}
            </span>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

const HomeDelivery = ({
  data = [],
  type = "home_delivery",
}: ModalComponentProps["home_delivery"]) => {
  let total = 0;
  data?.forEach((el) => {
    if (el?.total_sum || el?.total_cost) {
      total += Number(el?.total_sum || el?.total_cost);
    }
  });

  return (
    <>
      <div className="flex justify-between">
        <span className="text-[18px] font-[500] text-oxford-blue-300 py-[16px]">
          {type === "home_delivery"
            ? "Home Delivery cost"
            : "Smart Service cost"}
        </span>
        <span className="text-[18px] text-oxford-blue-300 py-[16px]">
          Total: {total.toFixed(2)} $
        </span>
      </div>

      {data.length > 0 ? (
        data?.map((el, i) => (
          <div className="flex flex-col" key={i}>
            <span className="text-[22px] font-[500] text-[#000] ">
              {el?.total_sum || el?.total_cost || ""}
            </span>
            <span className="text-[14px] font-[400] text-oxford-blue-300 pt-[5px] pb-[10px]">
              {el?.region_name || el?.service_name || ""}
            </span>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};
const stylesBfm = { borderLeft: "1.5px solid #E7E9EC", padding: "0 0 0 10px" };

const Bfm = ({ data = [] }: ModalComponentProps["buy_for_me"]) => {
  const total = data?.find((b) => b?.name === "get from customer")?.value || 0;
  return (
    <>
      {" "}
      <div className="flex justify-between">
        <span className="text-[18px] font-[500] text-oxford-blue-300 py-[16px]">
          BFM total Commission
        </span>
        <span className="text-[18px] text-oxford-blue-300 py-[16px]">
          Total: {total} $
        </span>
      </div>
      {data?.length > 0 ? (
        <div className="flex justify-between items-center mt-[16px]">
          {data?.map((el, i) => (
            <div style={stylesBfm} key={i}>
              <span className="capitalize text-[14px] font-[400] text-oxford-blue-300">
                {el?.name}
              </span>
              <span className="text-[22px] font-[500] text-[#000] pt-[5px] ">
                {el?.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

const OrderReceived = ({ data = [] }: ModalComponentProps["orders"]) => {
  let total = 0;
  data?.forEach((el) => {
    if (el?.value) {
      total += Number(el?.value);
    }
  });

  return (
    <>
      {" "}
      <div className="flex justify-between gap-[16px]">
        <span className="text-[16px] font-[500] text-oxford-blue-300">
          Order Received
        </span>
        <span className="text-[18px] text-oxford-blue-300">
          Total: {total.toFixed(2)} $
        </span>
      </div>
      {data?.length > 0 ? (
        <div className="flex justify-between items-center mt-[16px] w-full flex-wrap">
          {data?.map((el, i) => (
            <div className="flex flex-col w-[50%] mt-[24px]" key={i}>
              <div className="flex items-center gap-[5px] mb-[5px]">
                <img src={el?.w_flag} alt={el?.name} width={30} height={30} />
                <span className="capitalize text-oxford-blue-300">
                  {el?.name}
                </span>
              </div>
              <div style={stylesBfm}>
                <span className="text-[22px] font-[500] ">
                  {el?.value || "0.00"}
                </span>

                <div className="flex items-center gap-[5px]">
                  <img
                    src={el?.d_icon}
                    alt={el?.dispatch}
                    width={24}
                    height={24}
                  />
                  <span className="capitalize text-oxford-blue-300">
                    {el?.dispatch}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

interface ModalProps {
  setOpen: Dispatch<
    SetStateAction<{ open?: boolean | undefined; name: string }>
  >;
  open: { open?: boolean | undefined; name: string };
  params: Record<string, string | null>;
}

export default function ReportModal({ setOpen, open, params }: ModalProps) {
  const { reportsTypeList: typeList = [], isLoading } = useGetReportsTypeList(
    open.name,
    params || undefined
  );

  const newData = typeList?.reduce((acc: any, item: any) => {
    if (open?.name === "bfm") {
      Object.entries(item).forEach(([key, val]) => {
        acc.push({ name: key?.replaceAll("_", " "), value: val });
      });
    }
    if (
      open?.name === "bonus_in" ||
      open?.name === "balance_in" ||
      open?.name === "balance_out"
    ) {
      acc.push({
        name:
          item?.bonus_type || item?.payment_type || item?.transfer_type || "",
        value: item?.total || "",
      });
    }

    if (open?.name === "bonus_out") {
      acc.push({
        name: item?.bonus_type?.current_bonus_type?.name || "",
        value: item?.total || "",
      });
    }
    if (open?.name === "receive_order") {
      acc.push({
        name: item?.warehouse?.country || "",
        value: item?.total_cost || "",
        w_flag: item?.warehouse?.warehouse_round_flag || "",
        dispatch: item?.dispatch?.type || "",
        d_icon: item?.dispatch?.dispatch_icon || "",
      });
    }
    return acc;
  }, []);

  return (
    <Modal
      open={open.open}
      title={<EyeIcon color={"#3FCC75"} />}
      footer={false}
      onCancel={() => setOpen({ name: "", open: false })}
      closeIcon={<CloseIcon style={{ marginTop: 5 }} />}
      styles={{
        body: {
          overflowY: "scroll",
          overflowX: "hidden",
          maxHeight: 500,
          minHeight: 150,
        },
      }}
    >
      {isLoading ? (
        <Loader height={"200px"} />
      ) : open?.name === "bfm" ? (
        <Bfm data={newData} />
      ) : open?.name === "home_delivery" || open?.name === "smart_service" ? (
        <HomeDelivery data={typeList} type={open.name} />
      ) : open?.name === "bonus_in" ||
        open?.name === "balance_in" ||
        open?.name === "balance_out" ? (
        <BonusIn data={newData} type={open.name} />
      ) : open?.name === "receive_order" ? (
        <OrderReceived data={newData} />
      ) : (
        ""
      )}
    </Modal>
  );
}
