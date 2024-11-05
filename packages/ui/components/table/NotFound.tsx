import { FC, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
  title?: string;
  reset?: ReactNode;
}

export const NotFound: FC<Props> = ({ icon, text, title, reset }) => {
  return (
    <Flex
      width={"100%"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={"8px"}
    >
      {icon}
      {!!title && (
        <Typography
          text={title}
          color="#3B5166"
          variant={"Title"}
          level={4}
          textAlign={"center"}
        />
      )}
      <Typography
        text={text}
        color={"#8E9BA7"}
        fontSize={title ? "16px" : "20px"}
        fontWeight={title ? "400" : "500"}
        width={"360px"}
        textAlign={"center"}
      />
      {reset}
    </Flex>
  );
};
