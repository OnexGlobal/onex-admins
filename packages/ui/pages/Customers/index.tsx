import { useEffect, useState } from "react";
import CustomersSearch from "./Search";
import CustomersTable from "./Table";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { Loader } from "../../components/loader/Loader";

export default function Customers() {
  const [filter, setFilter] = useState<any>({});

  useEffect(() => {
    const search = window.location.search;
    if (search) {
      const searchKeys = search.split("=");
      const searchKey = searchKeys[1].split("&")[0];
      const searchValue = searchKeys[2];
      setFilter({ [searchKey]: searchValue });
    }
  }, []);

  const { recipients, refetch, meta, isLoading } = useGetRecipients({
    is_parent: 1,
    ...filter,
  });
  return (
    <>
      <h1 className="text-title">Customers</h1>
      <CustomersSearch setFilter={setFilter} refetch={refetch} />
      {isLoading ? (
        <Loader />
      ) : (
        <CustomersTable
          recipients={recipients}
          meta={meta}
          setFilter={setFilter}
          filter={filter}
        />
      )}
    </>
  );
}
