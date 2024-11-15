import { useState } from "react";
import { usePrimeUsersAutocomplete } from "../../hooks/customers/usePrimeUsersAutocomplete.hook";
import PrimeUsersSearch from "./Search";
import { Loader } from "../../components/loader/Loader";
import { PrimeUserTable } from "./PrimeUserTable";
import { NotFound } from "../../components/table/NotFound";
import { PrimeUsersNotFondIcon } from "../../assets/icons/PrimeUsersNotFondIcon";

const PrimeUsers = () => {
  const [filter, setFilter] = useState<
    Record<string, string | number | undefined | null>
  >({ is_prime: 1 });
  const { usersList, refetch, meta, isLoading } =
    usePrimeUsersAutocomplete(filter);
  return (
    <div className="h-full">
      <h2 className="text-title mb-[24px]">Prime Users</h2>
      <PrimeUsersSearch setFilter={setFilter} refetch={refetch} />
      {isLoading ? (
        <Loader />
      ) : usersList?.length > 0 ? (
        <PrimeUserTable
          usersList={usersList}
          meta={meta}
          setFilter={setFilter}
          refetch={refetch}
        />
      ) : (
        <NotFound
          icon={<PrimeUsersNotFondIcon margin={"16px"} />}
          text={"Search code to view result"}
        />
      )}
    </div>
  );
};

export default PrimeUsers;
