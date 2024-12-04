import { useState } from "react";
import ConsignmentTopActions from "./TopActions";
import ConsignmentTable from "./Table";
import ConsignmentModal from "./DetailsModal";
import { useConsignmentList } from "../../hooks/consignment/useConsignment.hook";
import { useConsignmentById } from "../../hooks/consignment/useConsignmentById.hook";

export default function Consignment({
  parcel_view = false,
  parcel_edit = false,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [id, setId] = useState<null | number>(null);
  const {
    consignment,
    isLoading: loadingById,
    reFetchConsignment,
  } = useConsignmentById(id);
  const { consignmentList, meta, isLoading, reFetchList } =
    useConsignmentList(filterData);
  return (
    <div className="pt-[24px]">
      <h1 className="page-title mb-[24px]">Consignment</h1>

      <ConsignmentTopActions setFilterData={setFilterData} />
      <ConsignmentTable
        consignmentList={consignmentList}
        meta={meta}
        isLoading={isLoading}
        setModalOpen={setModalOpen}
        setId={setId}
        params={filterData}
        setFilterData={setFilterData}
        parcel_view={parcel_view}
      />
      <ConsignmentModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        consignment={consignment}
        loading={loadingById}
        reFetchConsignment={reFetchConsignment}
        reFetchList={reFetchList}
        parcel_edit={parcel_edit}
      />
    </div>
  );
}
