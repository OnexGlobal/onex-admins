import { Refetch } from "@repo/types";
import { Button, Modal, Table } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import * as XLSX from "xlsx";
import InfoIcon from "../../assets/icons/InfoIcon";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import { AttachInvoice } from "../../components/elements/AttachInvoice";

type Accumulator = Record<string, string>[];

interface Props {
  reFetch: Refetch;
  setStatus: Dispatch<SetStateAction<boolean>>;
  bonus_create: boolean;
}

export default function ExelFileActions({
  reFetch,
  setStatus,
  bonus_create,
}: Props) {
  const [previewStatus, setPreviewStatus] = useState(false);
  const [previewDataSource, setPreviewDataSource] = useState<Accumulator>([]);
  const [showAlert, setShowAlert] = useState(0);
  let timeout;
  let second = 60;

  function handleTimedCount() {
    second--;
    setShowAlert(second);
    timeout = setTimeout(handleTimedCount, 1000);
    if (second <= 0) {
      clearTimeout(timeout);
      second = 60;
      reFetch();
    }
  }

  const downloadExampleExel = () => {
    handleTimedCount();
  };
  const handleUploadExcel = (file?: File | null) => {
    if (!file) return;

    setPreviewStatus(true);
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("manifest", file);

    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      type Accumulator = Record<string, string>[];
      const parsedData: Accumulator = XLSX.utils.sheet_to_json(sheet);

      const acc: Accumulator = [];
      const filteredData = parsedData.reduce((acc, item) => {
        if (item?.receiver_first_name) {
          acc.push({
            nameSurname: item?.receiver_full_name,
            phone: item?.receiver_phone,
            email: item?.receiver_email,
            town: item?.receiver_town,
            address: item?.receiver_address,
            comment: item?.receiver_comment,
          });
        }
        return acc;
      }, acc);
      setPreviewDataSource(filteredData);
    };
  };

  const previewColumns = [
    {
      key: "nameSurname",
      dataIndex: "nameSurname",
      title: "Name surname patronymic",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Phone",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "town",
      dataIndex: "town",
      title: "Town",
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Address",
    },
    {
      key: "comment",
      dataIndex: "comment",
      title: "Comment",
    },
  ];

  const handleImportExcel = async () => {
    // mutate(sendData);
  };

  return (
    <>
      <div className="flex items-center justify-end w-full gap-[16px] my-[16px]">
        {!!showAlert && (
          <span className="text-oxford-blue-300 flex items-center">
            <InfoIcon className="mr-[5px]" size={"24"} />
            Your uploads will be added around {showAlert || "0"} seconds
          </span>
        )}
        <Button
          type="link"
          className="text-blue-500 hover:!text-blue-500"
          onClick={downloadExampleExel}
          icon={<DownloadIcon />}
        >
          Download example
        </Button>

        <AttachInvoice
          text={"Import Excel"}
          icon={<DownloadIcon />}
          onChange={(file) => handleUploadExcel(file)}
        />
        {bonus_create ? (
          <Button type="primary" onClick={() => setStatus(true)}>
            Create bonus
          </Button>
        ) : null}
      </div>

      <Modal
        open={previewStatus}
        title={"Orders preview"}
        width={1000}
        onCancel={() => setPreviewStatus(false)}
        onOk={() => handleImportExcel()}
      >
        <Table
          columns={previewColumns}
          dataSource={previewDataSource}
          pagination={false}
        />
      </Modal>
    </>
  );
}
