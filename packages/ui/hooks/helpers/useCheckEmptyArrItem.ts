export const useCheckEmptyArrItem = (arr: { [key: string]: string }[]) => {
  return (
    arr?.map((item) =>
      Object?.values(item)?.every((value) => {
        return value !== "";
      })
    ) || []
  );
};
