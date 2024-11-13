import { Table } from "antd";
import FlyIcon from "@repo/ui/assets/icons/FlyIcon";
import InArmeniaIcon from "@repo/ui/assets/icons/InArmeniaIcon";
import LockerIcon from "@repo/ui/assets/icons/LockerIcon";
import ReadyIcon from "@repo/ui/assets/icons/ReadyIcon";
import UsFlag from "@repo/ui/assets/icons/UsFlag";

export default function CheckTable() {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "",
    },
    {
      key: "country",
      dataIndex: "country",
      title: "",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "",
    },
    {
      key: "tracking",
      dataIndex: "tracking",
      title: "",
    },
    {
      key: "weight",
      dataIndex: "weight",
      title: "",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "",
    },
    {
      key: "pickup_point",
      dataIndex: "pickup_point",
      title: "",
    },
  ];

  const data = [
    {
      id: 1,
      key: 1,
      country: (
        <div>
          <div className="flex">
            <UsFlag />
            <div className="pl-[8px]" id="dispatch" data-tip="React-tooltip">
              <FlyIcon />
            </div>
          </div>
          <h1 className="text-info max-w-[500px] pt-[8px]">UK 336</h1>
        </div>
      ),
      name: (
        <div className="flex">
          <h1 className="text-info">Harutyun Abrahamyan ARM750350</h1>
        </div>
      ),
      tracking: (
        <div className="flex flex-col">
          <h1 className="text-info">4201980493612896810158</h1>

          <div className="flex">
            <div className="product-description">
              <h1 className="text-info pt-[10px] text-[12px] text-oxford-blue-300">
                Lorem Ipsum is simply dummy text
              </h1>
            </div>
          </div>
        </div>
      ),
      weight: (
        <>
          <div>
            <h1 className="text-info">0.4 kg</h1>
          </div>
          <div>
            <h1 className="text-info pt-[10px]">0.8 kg</h1>
          </div>
        </>
      ),
      price: (
        <>
          <h1 className="text-info pr-[7px]">1400 ֏</h1>
          <h1 className="text-info pt-[10px] text-oxford-blue-300">60 $</h1>
        </>
      ),
      status: (
        <div>
          <div className="flex items-center">
            <InArmeniaIcon />
            <div className="flex">
              <h1 className="text-info pl-[5px] text-oxford-blue-300">
                In Armenia
              </h1>
              <h1 className="text-info pl-[5px]">23.08.2022a</h1>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <ReadyIcon />
            <h1 className="text-info pl-[5px] text-oxford-blue-300 text-[12px]">
              Ready
            </h1>
          </div>
        </div>
      ),
      pickup_point: (
        <>
          <h1 className="text-info">Citadel</h1>
          <div className="flex mt-[10px]">
            <LockerIcon />
            <h1 className="text-info ml-[5px]">Megamall</h1>
          </div>
        </>
      ),
    },
    {
      id: 2,
      key: 2,
      country: (
        <div>
          <div className="flex">
            <UsFlag />
            <div className="pl-[8px]" id="dispatch" data-tip="React-tooltip">
              <FlyIcon />
            </div>
          </div>
          <h1 className="text-info max-w-[500px] pt-[8px]">UK 336</h1>
        </div>
      ),
      name: (
        <div className="flex">
          <h1 className="text-info">Harutyun Abrahamyan ARM750350</h1>
        </div>
      ),
      tracking: (
        <div className="flex flex-col">
          <h1 className="text-info">4201980493612896810158</h1>

          <div className="flex">
            <div className="product-description">
              <h1 className="text-info pt-[10px] text-[12px] text-oxford-blue-300">
                Lorem Ipsum is simply dummy text
              </h1>
            </div>
          </div>
        </div>
      ),
      weight: (
        <>
          <div>
            <h1 className="text-info">0.4 kg</h1>
          </div>
          <div>
            <h1 className="text-info pt-[10px]">0.8 kg</h1>
          </div>
        </>
      ),
      price: (
        <>
          <h1 className="text-info pr-[7px]">1400 ֏</h1>
          <h1 className="text-info pt-[10px] text-oxford-blue-300">60 $</h1>
        </>
      ),
      status: (
        <div>
          <div className="flex items-center">
            <InArmeniaIcon />
            <div className="flex">
              <h1 className="text-info pl-[5px] text-oxford-blue-300">
                In Armenia
              </h1>
              <h1 className="text-info pl-[5px]">23.08.2022a</h1>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <ReadyIcon />
            <h1 className="text-info pl-[5px] text-oxford-blue-300 text-[12px]">
              Ready
            </h1>
          </div>
        </div>
      ),
      pickup_point: (
        <>
          <h1 className="text-info">Citadel</h1>
          <div className="flex mt-[10px]">
            <LockerIcon />
            <h1 className="text-info ml-[5px]">Megamall</h1>
          </div>
        </>
      ),
    },
    {
      id: 3,
      key: 3,
      country: (
        <div>
          <div className="flex">
            <UsFlag />
            <div className="pl-[8px]" id="dispatch" data-tip="React-tooltip">
              <FlyIcon />
            </div>
          </div>
          <h1 className="text-info max-w-[500px] pt-[8px]">UK 336</h1>
        </div>
      ),
      name: (
        <div className="flex">
          <h1 className="text-info">Harutyun Abrahamyan ARM750350</h1>
        </div>
      ),
      tracking: (
        <div className="flex flex-col">
          <h1 className="text-info">4201980493612896810158</h1>

          <div className="flex">
            <div className="product-description">
              <h1 className="text-info pt-[10px] text-[12px] text-oxford-blue-300">
                Lorem Ipsum is simply dummy text
              </h1>
            </div>
          </div>
        </div>
      ),
      weight: (
        <>
          <div>
            <h1 className="text-info">0.4 kg</h1>
          </div>
          <div>
            <h1 className="text-info pt-[10px]">0.8 kg</h1>
          </div>
        </>
      ),
      price: (
        <>
          <h1 className="text-info pr-[7px]">1400 ֏</h1>
          <h1 className="text-info pt-[10px] text-oxford-blue-300">60 $</h1>
        </>
      ),
      status: (
        <div>
          <div className="flex items-center">
            <InArmeniaIcon />
            <div className="flex">
              <h1 className="text-info pl-[5px] text-oxford-blue-300">
                In Armenia
              </h1>
              <h1 className="text-info pl-[5px]">23.08.2022a</h1>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <ReadyIcon />
            <h1 className="text-info pl-[5px] text-oxford-blue-300 text-[12px]">
              Ready
            </h1>
          </div>
        </div>
      ),
      pickup_point: (
        <>
          <h1 className="text-info">Citadel</h1>
          <div className="flex mt-[10px]">
            <LockerIcon />
            <h1 className="text-info ml-[5px]">Megamall</h1>
          </div>
        </>
      ),
    },
    {
      id: 4,
      key: 4,
      country: (
        <div>
          <div className="flex">
            <UsFlag />
            <div className="pl-[8px]" id="dispatch" data-tip="React-tooltip">
              <FlyIcon />
            </div>
          </div>
          <h1 className="text-info max-w-[500px] pt-[8px]">UK 336</h1>
        </div>
      ),
      name: (
        <div className="flex">
          <h1 className="text-info">Harutyun Abrahamyan ARM750350</h1>
        </div>
      ),
      tracking: (
        <div className="flex flex-col">
          <h1 className="text-info">4201980493612896810158</h1>

          <div className="flex">
            <div className="product-description">
              <h1 className="text-info pt-[10px] text-[12px] text-oxford-blue-300">
                Lorem Ipsum is simply dummy text
              </h1>
            </div>
          </div>
        </div>
      ),
      weight: (
        <>
          <div>
            <h1 className="text-info">0.4 kg</h1>
          </div>
          <div>
            <h1 className="text-info pt-[10px]">0.8 kg</h1>
          </div>
        </>
      ),
      price: (
        <>
          <h1 className="text-info pr-[7px]">1400 ֏</h1>
          <h1 className="text-info pt-[10px] text-oxford-blue-300">60 $</h1>
        </>
      ),
      status: (
        <div>
          <div className="flex items-center">
            <InArmeniaIcon />
            <div className="flex">
              <h1 className="text-info pl-[5px] text-oxford-blue-300">
                In Armenia
              </h1>
              <h1 className="text-info pl-[5px]">23.08.2022a</h1>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <ReadyIcon />
            <h1 className="text-info pl-[5px] text-oxford-blue-300 text-[12px]">
              Ready
            </h1>
          </div>
        </div>
      ),
      pickup_point: (
        <>
          <h1 className="text-info">Citadel</h1>
          <div className="flex mt-[10px]">
            <LockerIcon />
            <h1 className="text-info ml-[5px]">Megamall</h1>
          </div>
        </>
      ),
    },
    {
      id: 5,
      key: 5,
      country: (
        <div>
          <div className="flex">
            <UsFlag />
            <div className="pl-[8px]" id="dispatch" data-tip="React-tooltip">
              <FlyIcon />
            </div>
          </div>
          <h1 className="text-info max-w-[500px] pt-[8px]">UK 336</h1>
        </div>
      ),
      name: (
        <div className="flex">
          <h1 className="text-info">Harutyun Abrahamyan ARM750350</h1>
        </div>
      ),
      tracking: (
        <div className="flex flex-col">
          <h1 className="text-info">4201980493612896810158</h1>

          <div className="flex">
            <div className="product-description">
              <h1 className="text-info pt-[10px] text-[12px] text-oxford-blue-300">
                Lorem Ipsum is simply dummy text
              </h1>
            </div>
          </div>
        </div>
      ),
      weight: (
        <>
          <div>
            <h1 className="text-info">0.4 kg</h1>
          </div>
          <div>
            <h1 className="text-info pt-[10px]">0.8 kg</h1>
          </div>
        </>
      ),
      price: (
        <>
          <h1 className="text-info pr-[7px]">1400 ֏</h1>
          <h1 className="text-info pt-[10px] text-oxford-blue-300">60 $</h1>
        </>
      ),
      status: (
        <div>
          <div className="flex items-center">
            <InArmeniaIcon />
            <div className="flex">
              <h1 className="text-info pl-[5px] text-oxford-blue-300">
                In Armenia
              </h1>
              <h1 className="text-info pl-[5px]">23.08.2022a</h1>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <ReadyIcon />
            <h1 className="text-info pl-[5px] text-oxford-blue-300 text-[12px]">
              Ready
            </h1>
          </div>
        </div>
      ),
      pickup_point: (
        <>
          <h1 className="text-info">Citadel</h1>
          <div className="flex mt-[10px]">
            <LockerIcon />
            <h1 className="text-info ml-[5px]">Megamall</h1>
          </div>
        </>
      ),
    },
    {
      id: 6,
      key: 6,
      country: (
        <div>
          <div className="flex">
            <UsFlag />
            <div className="pl-[8px]" id="dispatch" data-tip="React-tooltip">
              <FlyIcon />
            </div>
          </div>
          <h1 className="text-info max-w-[500px] pt-[8px]">UK 336</h1>
        </div>
      ),
      name: (
        <div className="flex">
          <h1 className="text-info">Harutyun Abrahamyan ARM750350</h1>
        </div>
      ),
      tracking: (
        <div className="flex flex-col">
          <h1 className="text-info">4201980493612896810158</h1>

          <div className="flex">
            <div className="product-description">
              <h1 className="text-info pt-[10px] text-[12px] text-oxford-blue-300">
                Lorem Ipsum is simply dummy text
              </h1>
            </div>
          </div>
        </div>
      ),
      weight: (
        <>
          <div>
            <h1 className="text-info">0.4 kg</h1>
          </div>
          <div>
            <h1 className="text-info pt-[10px]">0.8 kg</h1>
          </div>
        </>
      ),
      price: (
        <>
          <h1 className="text-info pr-[7px]">1400 ֏</h1>
          <h1 className="text-info pt-[10px] text-oxford-blue-300">60 $</h1>
        </>
      ),
      status: (
        <div>
          <div className="flex items-center">
            <InArmeniaIcon />
            <div className="flex">
              <h1 className="text-info pl-[5px] text-oxford-blue-300">
                In Armenia
              </h1>
              <h1 className="text-info pl-[5px]">23.08.2022a</h1>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <ReadyIcon />
            <h1 className="text-info pl-[5px] text-oxford-blue-300 text-[12px]">
              Ready
            </h1>
          </div>
        </div>
      ),
      pickup_point: (
        <>
          <h1 className="text-info">Citadel</h1>
          <div className="flex mt-[10px]">
            <LockerIcon />
            <h1 className="text-info ml-[5px]">Megamall</h1>
          </div>
        </>
      ),
    },
    {
      id: 7,
      key: 7,
      country: (
        <div>
          <div className="flex">
            <UsFlag />
            <div className="pl-[8px]" id="dispatch" data-tip="React-tooltip">
              <FlyIcon />
            </div>
          </div>
          <h1 className="text-info max-w-[500px] pt-[8px]">UK 336</h1>
        </div>
      ),
      name: (
        <div className="flex">
          <h1 className="text-info">Harutyun Abrahamyan ARM750350</h1>
        </div>
      ),
      tracking: (
        <div className="flex flex-col">
          <h1 className="text-info">4201980493612896810158</h1>
          <div className="flex">
            <div className="product-description">
              <h1 className="text-info pt-[10px] text-[12px] text-oxford-blue-300">
                Lorem Ipsum is simply dummy text
              </h1>
            </div>
          </div>
        </div>
      ),
      weight: (
        <>
          <div>
            <h1 className="text-info">0.4 kg</h1>
          </div>
          <div>
            <h1 className="text-info pt-[10px]">0.8 kg</h1>
          </div>
        </>
      ),
      price: (
        <>
          <h1 className="text-info pr-[7px]">1400 ֏</h1>
          <h1 className="text-info pt-[10px] text-oxford-blue-300">60 $</h1>
        </>
      ),
      status: (
        <div>
          <div className="flex items-center">
            <InArmeniaIcon />
            <div className="flex">
              <h1 className="text-info pl-[5px] text-oxford-blue-300">
                In Armenia
              </h1>
              <h1 className="text-info pl-[5px]">23.08.2022a</h1>
            </div>
          </div>
          <div className="flex items-center mt-[10px]">
            <ReadyIcon />
            <h1 className="text-info pl-[5px] text-oxford-blue-300 text-[12px]">
              Ready
            </h1>
          </div>
        </div>
      ),
      pickup_point: (
        <>
          <h1 className="text-info">Citadel</h1>
          <div className="flex mt-[10px]">
            <LockerIcon />
            <h1 className="text-info ml-[5px]">Megamall</h1>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{}}
        title={() => (
          <caption>
            <div className="flex">
              <div className="flex w-[850px]">
                <h1 className="text-info pr-[16px] font-[500] text-oxford-blue-300">
                  All
                </h1>

                <div className="flex">
                  <h1 className="text-info pr-[8px] text-oxford-blue-200">
                    Packages
                  </h1>
                  <h1 className="text-info pr-[8px] text-oxford-blue-300">
                    26
                  </h1>
                </div>
                <div className="flex">
                  <h1 className="text-info pr-[8px] text-oxford-blue-200">
                    Total weight
                  </h1>
                  <h1 className="text-info pr-[8px] text-oxford-blue300">
                    0.4 kg
                  </h1>
                </div>
                <div className="flex">
                  <h1 className="text-info pr-[8px] text-oxford-blue-200">
                    Total price
                  </h1>
                  <h1 className="text-info pr-[8px] text-oxford-blue300">
                    5464 ֏
                  </h1>
                </div>
              </div>
            </div>
          </caption>
        )}
        components={{
          header: {
            wrapper: () => null,
          },
        }}
      />
    </div>
  );
}
