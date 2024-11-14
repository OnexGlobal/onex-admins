import { useState } from "react";
import { useGetAppVersions } from "../../hooks/app-versions/useGetAppVersions.hook";
import { Button, Drawer, Form } from "antd";
import ActionSearch from "./ActionSearch";
import Table from "../../components/table/Table";
import { EditIcon } from "../../assets/icons/EditIcon";
import TrashIcon from "../../assets/icons/TrashIcon";
import CreateEdit from "./CreateEdit";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { appVersionsApi } from "../../services/app-versions";
import { Status } from "@repo/types";
import { ApiVersions, AppVersionsFilter } from "@repo/types/src/app-versions";
import apple from "../../assets/images/apple.svg";
import android from "../../assets/images/android.svg";
export default function ActionsHistory() {
  const [filter, setFilters] = useState<AppVersionsFilter | undefined>();
  const [openDrawer, setOpenDrawer] = useState<undefined | ApiVersions>();
  const [openDeleteModal, setOpenDeleteModal] = useState<undefined | number>(
    undefined
  );
  const { data, meta, refetch, isLoading } = useGetAppVersions(filter);
  const [form] = Form.useForm();

  const closeModal = () => {
    setOpenDrawer(undefined);
    form.resetFields();
  };

  return (
    <>
      <>
        <div className="page-title">
          <h1 className="text-title mb-[24px]">App Versions</h1>
        </div>
        <ActionSearch setFilter={setFilters} />
        <Button
          onClick={() => setOpenDrawer(undefined)}
          type="default"
          className="bg-oxford-blue-200 text-white mt-[24px]"
        >
          Create version
        </Button>

        <Table
          columns={[
            {
              key: "version",
              dataIndex: "version",
              title: "Version",
            },
            {
              key: "operating_system",
              dataIndex: "operating_system",
              title: "Operating system",
            },
            {
              key: "update_types",
              dataIndex: "update_types",
              title: "Update types",
            },
            {
              key: "actions",
              dataIndex: "actions",
              title: "",
              width: "auto",
            },
          ]}
          dataSource={data?.map((item: ApiVersions) => ({
            version: item.version,
            operating_system: (
              <div className="flex items-center gap-[5px]">
                <img
                  alt={"os"}
                  src={
                    item.os === "android"
                      ? android
                      : item.os === "ios"
                        ? apple
                        : ""
                  }
                />
                {item.os}
              </div>
            ),
            update_types:
              item.force_update && item.dev_mode
                ? "Force Update" + ", " + "Dev Mode"
                : item.dev_mode
                  ? "Dev Mode"
                  : "Force Update",
            actions: (
              <div className="flex items-center justify-end gap-[16px] ">
                <EditIcon onClick={() => setOpenDrawer(item)} />
                <TrashIcon
                  color="fc4447"
                  onClick={() => setOpenDeleteModal(item.id)}
                />
              </div>
            ),
          }))}
          meta={meta}
          onChangePage={(page) => setFilters((p) => ({ ...p, page }))}
          loading={isLoading}
        />
      </>
      <Drawer open={!!openDrawer} width="694px" onClose={() => closeModal()}>
        <CreateEdit
          form={form}
          data={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setOpenDeleteModal={setOpenDeleteModal}
          refetch={refetch}
          closeModal={closeModal}
        />
      </Drawer>
      <DeleteModal
        handleDelete={() => {
          if (openDeleteModal)
            appVersionsApi.deleteVersion(openDeleteModal).then(() => {
              setOpenDeleteModal(undefined);
              refetch(filter);
              setOpenDrawer(undefined);
            });
        }}
        deleted={openDeleteModal as Status}
        setDeleted={setOpenDeleteModal}
        description={"Are you sure you want to delete this version?"}
        title={"Delete version"}
      />
    </>
  );
}
