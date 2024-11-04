import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  permission?: boolean;
}
const ProtectedRoute: FC<Props> = ({ children, permission }) => {
  if (!permission)
    return (
      <div className="h-full w-full grid place-items-center">
        <p>You don't have permission to see this page</p>
      </div>
    );
  return children;
};

export default ProtectedRoute;
