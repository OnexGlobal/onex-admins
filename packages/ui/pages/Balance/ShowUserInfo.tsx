import { FC } from "react";
import PrimeIcon from "../../assets/icons/PrimeIcon";
import { Button } from "antd";

interface InfoProps {
  setOpen: (val: boolean) => void;
  userInfo: { first_name: string; last_name: string; user_code: string };
  isPrime: boolean;
}

export const ShowUserInfo: FC<InfoProps> = ({ setOpen, userInfo, isPrime }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between">
        <span className="font-[500]">
          {userInfo?.first_name} {userInfo?.last_name} {userInfo?.user_code}
        </span>
        {!!isPrime && <PrimeIcon margin={"0 auto 0 5px"} />}
      </div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add bank transfer
      </Button>
    </div>
  );
};
