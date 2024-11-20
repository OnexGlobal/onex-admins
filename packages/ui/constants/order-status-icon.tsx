import ExpectedIcon from "@repo/ui/assets/icons/ExpectedIcon";
import InArmeniaIcon from "@repo/ui/assets/icons/InArmeniaIcon";
import OnTheWayIcon from "@repo/ui/assets/icons/OnTheWayIcon";
import ReceivedIcon from "@repo/ui/assets/icons/ReceivedIcon";
import ScannedIcon from "@repo/ui/assets/icons/ScannedIcon";
import WerHouseIcon from "@repo/ui/assets/icons/werhouse";

export default function OrderStatusIcon({ status }: { status: string }) {
  if (status === "scan") {
    return <ScannedIcon />;
  }
  if (status === "expected") {
    return <ExpectedIcon />;
  }
  if (status === "at_warehouse") {
    return <WerHouseIcon />;
  }
  if (status === "on_the_way") {
    return <OnTheWayIcon />;
  }
  if (status === "in_georgia") {
    return <InArmeniaIcon />;
  }
  if (status === "received") {
    return <ReceivedIcon />;
  }
  return null;
}
