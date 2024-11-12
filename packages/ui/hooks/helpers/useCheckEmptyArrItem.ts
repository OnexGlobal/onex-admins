export const useCheckEmptyArrItem = (arr: any[]) => {
  return (
    arr?.map((item) =>
      Object.values(item).every((value) => {
        return value !== "";
      })
    ) || []
  );
};
