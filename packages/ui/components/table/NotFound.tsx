import { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
  title?: string;
  reset?: ReactNode;
}

export const NotFound: FC<Props> = ({ icon, text, title, reset }) => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-[8px]">
      {icon}
      {!!title && (
        <span className="text-oxford-blue-400 text-[22px] text-center">
          {title}
        </span>
      )}
      <span
        className={`${title ? "text-[16px]" : "text-[20px]"} ${title ? "font-[400]" : "font-[500]"} max-w-[360px] text-center`}
      >
        {text}
      </span>

      {reset}
    </div>
  );
};
