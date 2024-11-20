import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Divider, Drawer, Form, Input, InputRef, Switch } from "antd";
import { Refetch } from "@repo/types";
import { BannersType, LanguagesType } from "@repo/types/src/marketing-content";
import { useCheckEmptyArrItem } from "../../hooks/helpers/useCheckEmptyArrItem";
import { useCreateAndEditBanner } from "../../hooks/banners/useCreateAndEditBanner.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { useDeleteBanner } from "../../hooks/banners/useDeleteBanner.hook";
import { useIsActiveBanner } from "../../hooks/banners/useIsActiveBanner.hook";
import { bannerInitialValue } from "./initial-value-banner-form";
import AlertCircleIcon from "../../assets/icons/AlertCircleIcon";
import TabList from "../../components/tabs/TabList";
import { CopyLink } from "../../assets/icons/CopyLink";
import { DeactivateModal } from "../../components/modals/DeactivateModal";
interface Props {
  setBanner: Dispatch<SetStateAction<boolean | BannersType>>;
  refetch: Refetch;
  banner: BannersType | boolean;
  languages?: LanguagesType[];
}

export default function CreateBannerDrawer({
  setBanner = () => {},
  refetch,
  banner,
  languages,
}: Props) {
  const [languageId, setLanguageId] = useState(
    typeof banner === "object" ? banner?.language_id : 1
  );
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedWord, setSelectedWord] = useState("");
  const [addLink, setAddLink] = useState(false);
  const [manualLink, setManualLink] = useState("");
  const inputRef: RefObject<InputRef> = useRef(null);
  const bannerLink = Form.useWatch("details", form);
  const isTrueAllItems = useCheckEmptyArrItem(bannerLink);

  const handelClosed = () => {
    form.resetFields();
    setLanguageId(1);
    setBanner(false);
    setOpen(false);
    setAddLink(false);
    setManualLink("");
  };
  const { mutate } = useCreateAndEditBanner(
    () => {
      handelClosed();
      notificationSuccess(
        "Create header",
        "The header was created successfully!"
      );
      refetch();
    },
    (e) => {
      Object.values(e?.response?.data?.data).forEach((val) => {
        notificationError(val[0], "Something went wrong");
      });
    }
  );
  const { mutate: deleteBanner } = useDeleteBanner(
    (data) => {
      handelClosed();
      notificationSuccess(data?.data?.message, "Success");
      refetch();
    },
    () => notificationError("Create header", "Something went wrong")
  );
  const { mutate: mutateIsActive, isPending: isActivateLoading } =
    useIsActiveBanner(
      (data) => {
        notificationSuccess(data?.data?.message);
        setStatus((data?.data?.data as { is_active: boolean })?.is_active);
        refetch();
      },
      (e) => {
        notificationError(
          "Action failed.",
          e?.response?.data?.message || "something went wrong"
        );
      }
    );
  useEffect(() => {
    if (typeof banner === "object") {
      banner?.details?.forEach((br) => {
        Object.entries(br).forEach(([key, val]) => {
          form.setFieldValue(["details", +br?.language_id - 1, key], val);
        });
      });
      setStatus(banner?.is_active);
      if (banner?.language_id) {
        setLanguageId(banner.language_id);
        form.setFieldValue(
          ["details", banner.language_id - 1, "language_id"],
          banner?.language_id
        );
      }
    }
  }, [banner]);

  const createBanner = (values: {
    details: { text: string; language_id: string }[];
  }) => {
    const formData = new FormData();
    if (values) {
      values?.details?.map(
        (detail: { text: string; language_id: string }, index: number) => {
          if (isTrueAllItems[index]) {
            Object.entries(detail).forEach(([key, value]) => {
              if (value) {
                formData.append(`details[${index}][${key}]`, value);
              }
            });
          }
        }
      );
    }
    if (typeof banner === "object") {
      formData.append("_method", "put");
    }
    if (typeof banner === "object") mutate({ id: banner?.id, formData });
  };

  const handleSelect = () => {
    // Capture the selected word
    const selection = window.getSelection() || "";

    setSelectedWord(selection.toString());
  };

  const handleAddLink = () => {
    if (selectedWord && manualLink) {
      // Create the anchor tag with the selected word and link
      const linkTag = `<a href="${manualLink}" target="_blank">${selectedWord}</a>`;
      // Replace the selected word with the anchor tag
      const updatedText = inputRef?.current?.input?.value.replace(
        selectedWord,
        linkTag
      );
      // Update the input text
      form.setFieldValue(["details", languageId - 1, "text"], updatedText);
      setSelectedWord(""); // Reset selected word
      setAddLink(false);
      setManualLink("");
    }
  };

  return (
    <Drawer
      onClose={handelClosed}
      open={!!banner}
      width="1112px"
      styles={{ header: { display: "none" } }}
    >
      <Form
        initialValues={bannerInitialValue}
        form={form}
        name="createSlide"
        layout="vertical"
        onFinish={createBanner}
      >
        <div className="flex gap-[16px] items-center mb-[19px]">
          <span className="text-[22px] font-[500]">
            {typeof banner === "object" ? "Edit header" : "Create header"}
          </span>

          {typeof banner === "object" ? (
            <>
              <Button
                type="default"
                icon={<AlertCircleIcon />}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Delete Banner
              </Button>
              <span>{status ? "Active" : "Inactive"}</span>

              <Switch
                loading={isActivateLoading}
                checked={status}
                onChange={(val) => {
                  mutateIsActive({ id: banner?.id, is_active: val });
                }}
              />
            </>
          ) : null}
          <Button type="primary" danger onClick={handelClosed} htmlType="reset">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>

        {banner ? (
          <TabList
            data={languages}
            isTrueAllItems={isTrueAllItems}
            onChange={(key) => {
              setLanguageId(+key);
              form.setFieldValue(["details", +key - 1, "language_id"], key);
            }}
            value={languageId}
          />
        ) : (
          ""
        )}

        <Form.List name={"details"}>
          {() => {
            return (
              <div className={"_paper"}>
                <CopyLink
                  margin={"0 0 12px 0"}
                  onClick={() => setAddLink(true)}
                />
                <Divider style={{ margin: 0 }} />
                <Form.Item
                  style={{ padding: "12px 0 0 0" }}
                  name={[languageId - 1, "text"]}
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Missing Description.",
                    },
                  ]}
                >
                  <Input
                    placeholder={"Description"}
                    ref={inputRef}
                    onSelect={handleSelect}
                  />
                </Form.Item>
                {addLink ? null : (
                  <div
                    style={{ color: "#3B5166", fontSize: "16px" }}
                    dangerouslySetInnerHTML={{
                      __html: bannerLink?.[languageId - 1]?.text,
                    }}
                  />
                )}

                {selectedWord && addLink && (
                  <div className="flex gap-[8px]">
                    <Input
                      placeholder="Enter a link"
                      value={manualLink}
                      onChange={(e) => setManualLink(e.target.value)}
                    />
                    <span className="text-oxford-blue-400 text-[16px]">
                      Selected word: {selectedWord}
                    </span>
                    <div className="flex w-full gap-[16px]">
                      <Button
                        type="primary"
                        onClick={handleAddLink}
                        className="w-[90px]"
                      >
                        Add
                      </Button>
                      <Button
                        danger
                        type="primary"
                        onClick={() => {
                          setAddLink(false);
                          setManualLink("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </Form.List>
      </Form>
      {typeof banner === "object" && (
        <DeactivateModal
          setDeactivate={setOpen}
          deactivate={open}
          title={"Delete header"}
          description={"Are you sure you want to delete header"}
          useDeactivate={() => deleteBanner({ id: banner?.id })}
        />
      )}
    </Drawer>
  );
}
