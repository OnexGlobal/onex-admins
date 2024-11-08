import { useState } from "react";
import { reportsApi } from "../../services/reports";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { Button } from "antd";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import ReportModal from "./ReportModal";

interface Props {
  reportsList: {
    key: string;
    value: number | string;
  }[];
  params: Record<string, string | null>;
}

export default function ReportsData({ reportsList = [], params }: Props) {
  const [reportsModal, setReportsModal] = useState<{
    open?: boolean;
    name: string;
  }>({
    open: false,
    name: "",
  });
  const reportsInfo: Record<string, string | number> = {};
  reportsList?.forEach((el) => {
    reportsInfo[el?.key] = el?.value;
  });
  const handleExportExcel = (type: string) => {
    reportsApi.exportReportsByTypeExcel({ type: type, ...params });
  };
  return (
    <div className="w-full ">
      <div className="text-oxford-blue-300 font-[600] text-[16px] pt-[16px] pb-[8px]">
        Bonus and cashback
      </div>

      <div className="grid gap-[32px] xl:grid-cols-3">
        <div className="flex _paper justify-between items-start">
          <div className="flex  flex-col justify-between h-full">
            <span className="flex items-center gap-[6px] text-[22px] font-[500]">
              {reportsInfo?.bonus_in || 0}
              <EyeIcon
                margin={"0 0 -4px 5px"}
                onClick={() =>
                  setReportsModal({ name: "bonus_in", open: true })
                }
              />
            </span>
            <span className="text-[14px] text-oxford-blue-300 font-[400]">
              Bonus In
            </span>
          </div>
          <Button
            icon={<DownloadIcon color="#fff" />}
            onClick={() => handleExportExcel("bonus_in")}
            type="primary"
          >
            Download
          </Button>
        </div>

        <div className="flex _paper flex-col justify-between">
          <span className="text-[22px] font-[500]">
            {reportsInfo?.bonus_out || 0}
          </span>
          <span className="text-[14px] text-oxford-blue-300 font-[400]">
            Bonus Out
          </span>
        </div>

        <div className="flex _paper flex-col justify-between">
          <span className="text-[22px] font-[500]">
            {reportsInfo?.bonus_remain || 0}
          </span>
          <span className="text-[14px] text-oxford-blue-300 font-[400]">
            Bonus remain
          </span>
        </div>
      </div>

      <div className="text-oxford-blue-300 text-[16px] font-[600] mt-[16px] pb-[8px]">
        Order Received and Balance
      </div>

      <div className="grid gap-[32px] xl:grid-cols-2">
        <div className={"flex _paper items-start justify-between"}>
          <div className="flex flex-col justify-between h-full">
            <div className="text-[22px] font-[500] flex items-center gap-[6px]">
              {reportsInfo?.balance_in || 0}{" "}
              <EyeIcon
                margin={"0 0 -4px 5px"}
                onClick={() =>
                  setReportsModal({ name: "balance_in", open: true })
                }
              />
            </div>
            <span className="text-[14px] text-oxford-blue-300 font-[400]">
              Balance in
            </span>
          </div>
          <Button
            type="primary"
            icon={<DownloadIcon color="#fff" />}
            onClick={() => handleExportExcel("balance_in")}
          >
            Download
          </Button>
        </div>
        <div className={"flex _paper items-start justify-between"}>
          <div className="flex flex-col justify-between h-full">
            <span className="flex itemx-center gap-[6px] text-[22px] font-[500]">
              {reportsInfo?.balance_out || 0}
              <EyeIcon
                margin={"0 0 -4px 5px"}
                onClick={() =>
                  setReportsModal({
                    name: "balance_out",
                    open: true,
                  })
                }
              />
            </span>
            <span className="text-[14px] text-oxford-blue-300 font-[400]">
              Balance out
            </span>
          </div>
          <Button
            icon={<DownloadIcon color="#fff" />}
            onClick={() => handleExportExcel("balance_out")}
          >
            Download
          </Button>
        </div>
        <div className={"flex _paper flex-col h-full justify-between"}>
          <span className="text-[22px] font-[500]">
            {reportsInfo?.balance_at_the_moment || 0}
          </span>

          <span className="text-[14px] text-oxford-blue-300 font-[400]">
            Balance at the moment
          </span>
        </div>
        <div className="flex _paper justify-between items-start">
          <div className="flex flex-col h-full justify-between">
            <span className="text-[22px] font-[500] flex items-center gap-[6px]">
              {reportsInfo?.order_received_total_cost || 0}{" "}
              <EyeIcon
                margin={"0 0 -4px 5px"}
                onClick={() =>
                  setReportsModal({
                    name: "receive_order",
                    open: true,
                  })
                }
              />
            </span>
            <span className="text-oxford-blue-300">Orders received</span>
          </div>
          <Button
            icon={<DownloadIcon color="#fff" />}
            onClick={() => handleExportExcel("receive_order")}
            type="primary"
          >
            Download
          </Button>
        </div>
      </div>
      <div className="text-[16px] text-oxford-blue-300 pt-[16px] pb-[8px] font-[600]">
        Services
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-[20px]">
        <div className="flex justify-between items-start _paper">
          <div className="flex flex-col h-full justify-between">
            <span className="flex items-center gap-[6px] text-[22px] font-[500]">
              {reportsInfo?.bfm_total || 0}
              <EyeIcon
                margin={"0 0 -4px 5px"}
                onClick={() =>
                  setReportsModal({
                    name: "bfm",
                    open: true,
                  })
                }
              />
            </span>

            <span className="text-oxford-blue-300">BFM commission</span>
          </div>
          <Button
            type="primary"
            icon={<DownloadIcon color="#fff" />}
            onClick={() => handleExportExcel("bfm")}
          >
            Download
          </Button>
        </div>

        <div className="flex flex-col _paper h-full justify-between">
          <span className="text-[22px] font-[500]">
            {reportsInfo?.declaration_service_fee || 0}
          </span>
          <span className="text-[14px] font-[400] text-oxford-blue-300">
            Declaration Service fee
          </span>
        </div>

        <div className="flex items-start justify-between _paper">
          <div className="flex flex-col h-full justify-between">
            <span className="flex items-center gap-[6px] font-[500] text-[22px]">
              {reportsInfo?.home_delivery_cost || 0}{" "}
              <EyeIcon
                margin={"0 0 -4px 5px"}
                onClick={() =>
                  setReportsModal({
                    name: "home_delivery",
                    open: true,
                  })
                }
              />
            </span>
            <span className="text-[14px] font-[400] text-oxford-blue-300">
              Home Delivery cost
            </span>
          </div>
          <Button
            type="primary"
            icon={<DownloadIcon color="#fff" />}
            onClick={() => handleExportExcel("home_delivery")}
          >
            Download
          </Button>
        </div>

        <div className="flex items-start justify-between _paper">
          <div className="flex flex-col h-full justify-between">
            <span className="flex items-center gap-[6px] font-[500] text-[22px]">
              {reportsInfo?.smart_service_cost || 0}{" "}
              <EyeIcon
                margin={"0 0 -4px 5px"}
                onClick={() =>
                  setReportsModal({
                    name: "smart_service",
                    open: true,
                  })
                }
              />
            </span>
            <span className="text-[14px] font-[400] text-oxford-blue-300">
              Smart Services
            </span>
          </div>
          <Button
            type="primary"
            icon={<DownloadIcon color="#fff" />}
            onClick={() => handleExportExcel("smart_service")}
          >
            Download
          </Button>
        </div>
      </div>

      <ReportModal
        setOpen={setReportsModal}
        open={reportsModal}
        params={params}
      />
    </div>
  );
}
