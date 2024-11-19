export const useCheckEmptyArrItem = (arr: string[]) => {
  return (
    arr?.map((item) =>
      Object.values(item).every((value) => {
        return value !== "";
      })
    ) || []
  );
};
