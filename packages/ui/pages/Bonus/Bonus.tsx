import { useState } from "react";
import { useGetBonusLis } from "../../hooks/bonus/useGetBonusList.hook";
import BonusTopActions from "./TopActions";
import ExelFileActions from "./ExelFileActions";
import { Loader } from "../../components/loader/Loader";
import { NotFound } from "../../components/table/NotFound";
import { WalletCircle } from "../../assets/icons/WalletCircle";
import { SearchCircleIcon } from "../../assets/icons/SearchCircleIcon";
import BonusTable from "./Table";
import CreateBonusModal from "./CreateBonusModal";

interface Props {
  bonus_create: boolean;
}

const Bonus = ({ bonus_create }: Props) => {
  const [filterData, setFilterData] = useState({});
  const [create, setCreate] = useState(false);
  const isFiltered = !Object.keys(filterData)?.length;
  const { bonusList, meta, isLoading, refetch } = useGetBonusLis(filterData);
  return (
    <>
      <h1 className="text-title mb-[24px]">Bonus</h1>

      <BonusTopActions setFilterData={setFilterData} />
      <ExelFileActions
        setStatus={setCreate}
        reFetch={refetch}
        bonus_create={bonus_create}
      />
      {isLoading ? (
        <Loader />
      ) : !isFiltered && !(bonusList?.length > 0) ? (
        <NotFound
          icon={
            isFiltered ? (
              <WalletCircle />
            ) : (
              <SearchCircleIcon margin={"0 0 16px 0"} />
            )
          }
          text={
            isFiltered
              ? "Once there will be deals they will appear here"
              : `No Result found. Please try again.`
          }
        />
      ) : (
        <BonusTable
          params={filterData}
          setFilterData={setFilterData}
          bonusList={bonusList}
          meta={meta}
        />
      )}
      <CreateBonusModal
        setStatus={setCreate}
        status={create}
        reFetch={refetch}
      />
    </>
  );
};

export default Bonus;
