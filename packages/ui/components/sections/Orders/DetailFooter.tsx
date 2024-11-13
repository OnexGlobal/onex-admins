import BackArrowIcon from "@repo/ui/assets/icons/BackArrowIcon";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

interface Props {
  id: number | string;
  date: string;
  setStatus: Dispatch<SetStateAction<boolean>>;
}

export default function OrderDetailsFooter({ id, date, setStatus }: Props) {
  return (
    <div className="flex justify-between">
      <BackArrowIcon onClick={() => setStatus(false)} />
      <div className="flex gap-[8px]">
        <h1 className="text-info text-oxford-blue-100">Updated by Name at </h1>
        <h1 className="text-info text-oxford-blue-200">
          {dayjs(date).format("YYYY-MM-DD, HH:mm")}
        </h1>
        <h1 className="text-info text-oxford-blue-100">{`Order ID ${
          id || ""
        }`}</h1>
      </div>
    </div>
  );
}
