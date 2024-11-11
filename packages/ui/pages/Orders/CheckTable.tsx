import { styled } from "@linaria/react";
import { Table } from "antd";
import Flex from "components/elements/Flex";
import { Typography } from "components/elements/Typography";
import FlyIcon from "components/svg-components/FlyIcon";
import InArmeniaIcon from "components/svg-components/InArmeniaIcon";
import LockerIcon from "components/svg-components/LockerIcon";
import ReadyIcon from "components/svg-components/ReadyIcon";
import UsFlag from "components/svg-components/UsFlag";

const StyledCaption = styled.div`
  .caption-item {
    display: flex;
  }
`;

const StyledTable = styled.div`
  width: 100%;
  thead {
    display: none;
  }
  .ant-table-title {
    background: #f5f5f5;
    padding: 8px !important;
    border-radius: 12px 12px 0 0;
  }
`;
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
      country: (
        <div>
          <Flex>
            <UsFlag />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              <FlyIcon />
            </div>
          </Flex>
          <Typography
            text="UK 336"
            color="#262626"
            fontSize="14px"
            width="500"
            padding="8px 0 0 0"
          />
        </div>
      ),
      name: (
        <Flex>
          <Typography
            text="Harutyun Abrahamyan ARM750350"
            fontSize="14px"
            fontWeight="500"
            color=" #262626"
          />
        </Flex>
      ),
      tracking: (
        <div>
          <Typography
            text="4201980493612896810158"
            color="#262626"
            fontSize="14px"
            fontWeight="400"
          />
          <Flex>
            <div className="product-description">
              <Typography
                text="Lorem Ipsum is simply dummy text"
                color="#5B6D7F"
                fontSize="12px"
                fontWeight="400"
                padding="10px 0 0 0 "
              />
            </div>
          </Flex>
        </div>
      ),
      weight: (
        <>
          <div>
            <Typography
              text="0.4 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
            />
          </div>
          <div>
            <Typography
              text="0.8 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
              padding="10px 0 0 0 "
            />
          </div>
        </>
      ),
      price: (
        <>
          <Typography
            text="1400 ֏"
            color="#262626"
            fontWeight="400"
            fontSize="14px"
            padding="0 7px 0 0"
          />
          <Typography
            text="60 $"
            color="#5B6D7F"
            fontWeight="400"
            fontSize="14px"
            padding="10px 0 0 0"
          />
        </>
      ),
      status: (
        <div>
          <Flex alignItems="center">
            <InArmeniaIcon />
            <Flex>
              <Typography
                text="In Armenia"
                color="#5B6D7F"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
              <Typography
                text="23.08.2022"
                color="#262626"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" style={{ paddingTop: 10 }}>
            <ReadyIcon />
            <Typography
              text="Ready"
              color="#5DBA2F"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </div>
      ),
      pickup_point: (
        <>
          <Typography text="Citadel" fontSize="14px" fontWeight="400" />
          <Flex style={{ marginTop: 10 }}>
            <LockerIcon />
            <Typography
              text="Megamall"
              color="#262626"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </>
      ),
    },
    {
      id: 2,
      country: (
        <div>
          <Flex>
            <UsFlag />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              <FlyIcon />
            </div>
          </Flex>
          <Typography
            text="UK 336"
            color="#262626"
            fontSize="14px"
            fontWeight="500"
            padding="8px 0 0 0"
          />
        </div>
      ),
      name: (
        <Flex>
          <Typography
            text="Harutyun Abrahamyan ARM750350"
            fontSize="14px"
            fontWeight="500"
            color=" #262626"
          />
        </Flex>
      ),
      tracking: (
        <div>
          <Typography
            text="4201980493612896810158"
            color="#262626"
            fontSize="14px"
            fontWeight="400"
          />
          <Flex>
            <div className="product-description">
              <Typography
                text="Lorem Ipsum is simply dummy text"
                color="#5B6D7F"
                fontSize="12px"
                fontWeight="400"
                padding="10px 0 0 0 "
              />
            </div>
          </Flex>
        </div>
      ),
      weight: (
        <>
          <div>
            <Typography
              text="0.4 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
            />
          </div>
          <div>
            <Typography
              text="0.8 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
              padding="10px 0 0 0 "
            />
          </div>
        </>
      ),
      price: (
        <>
          <Typography
            text="1400 ֏"
            color="#262626"
            fontWeight="400"
            fontSize="14px"
            padding="0 7px 0 0"
          />
          <Typography
            text="60 $"
            color="#5B6D7F"
            fontWeight="400"
            fontSize="14px"
            padding="10px 0 0 0"
          />
        </>
      ),
      status: (
        <div>
          <Flex alignItems="center">
            <InArmeniaIcon />
            <Flex>
              <Typography
                text="In Armenia"
                color="#5B6D7F"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
              <Typography
                text="23.08.2022"
                color="#262626"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" style={{ paddingTop: 10 }}>
            <ReadyIcon />
            <Typography
              text="Ready"
              color="#5DBA2F"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </div>
      ),
      pickup_point: (
        <>
          <Typography text="Citadel" fontSize="14px" fontWeight="400" />
          <Flex style={{ marginTop: 10 }}>
            <LockerIcon />
            <Typography
              text="Megamall"
              color="#262626"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </>
      ),
    },
    {
      id: 3,
      country: (
        <div>
          <Flex>
            <UsFlag />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              <FlyIcon />
            </div>
          </Flex>
          <Typography
            text="UK 336"
            color="#262626"
            fontSize="14px"
            fontWeight="500"
            padding="8px 0 0 0"
          />
        </div>
      ),
      name: (
        <Flex>
          <Typography
            text="Harutyun Abrahamyan ARM750350"
            fontSize="14px"
            fontWeight="500"
            color=" #262626"
          />
        </Flex>
      ),
      tracking: (
        <div>
          <Typography
            text="4201980493612896810158"
            color="#262626"
            fontSize="14px"
            fontWeight="400"
          />
          <Flex>
            <div className="product-description">
              <Typography
                text="Lorem Ipsum is simply dummy text"
                color="#5B6D7F"
                fontSize="12px"
                fontWeight="400"
                padding="10px 0 0 0 "
              />
            </div>
          </Flex>
        </div>
      ),
      weight: (
        <>
          <div>
            <Typography
              text="0.4 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
            />
          </div>
          <div>
            <Typography
              text="0.8 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
              padding="10px 0 0 0 "
            />
          </div>
        </>
      ),
      price: (
        <>
          <Typography
            text="1400 ֏"
            color="#262626"
            fontWeight="400"
            fontSize="14px"
            padding="0 7px 0 0"
          />
          <Typography
            text="60 $"
            color="#5B6D7F"
            fontWeight="400"
            fontSize="14px"
            padding="10px 0 0 0"
          />
        </>
      ),
      status: (
        <div>
          <Flex alignItems="center">
            <InArmeniaIcon />
            <Flex>
              <Typography
                text="In Armenia"
                color="#5B6D7F"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
              <Typography
                text="23.08.2022"
                color="#262626"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" style={{ paddingTop: 10 }}>
            <ReadyIcon />
            <Typography
              text="Ready"
              color="#5DBA2F"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </div>
      ),
      pickup_point: (
        <>
          <Typography text="Citadel" fontSize="14px" fontWeight="400" />
          <Flex style={{ marginTop: 10 }}>
            <LockerIcon />
            <Typography
              text="Megamall"
              color="#262626"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </>
      ),
    },
    {
      id: 4,
      country: (
        <div>
          <Flex>
            <UsFlag />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              <FlyIcon />
            </div>
          </Flex>
          <Typography
            text="UK 336"
            color="#262626"
            fontSize="14px"
            fontWeight="500"
            padding="8px 0 0 0"
          />
        </div>
      ),
      name: (
        <Flex>
          <Typography
            text="Harutyun Abrahamyan ARM750350"
            fontSize="14px"
            fontWeight="500"
            color=" #262626"
          />
        </Flex>
      ),
      tracking: (
        <div>
          <Typography
            text="4201980493612896810158"
            color="#262626"
            fontSize="14px"
            fontWeight="400"
          />
          <Flex>
            <div className="product-description">
              <Typography
                text="Lorem Ipsum is simply dummy text"
                color="#5B6D7F"
                fontSize="12px"
                fontWeight="400"
                padding="10px 0 0 0 "
              />
            </div>
          </Flex>
        </div>
      ),
      weight: (
        <>
          <div>
            <Typography
              text="0.4 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
            />
          </div>
          <div>
            <Typography
              text="0.8 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
              padding="10px 0 0 0 "
            />
          </div>
        </>
      ),
      price: (
        <>
          <Typography
            text="1400 ֏"
            color="#262626"
            fontWeight="400"
            fontSize="14px"
            padding="0 7px 0 0"
          />
          <Typography
            text="60 $"
            color="#5B6D7F"
            fontWeight="400"
            fontSize="14px"
            padding="10px 0 0 0"
          />
        </>
      ),
      status: (
        <div>
          <Flex alignItems="center">
            <InArmeniaIcon />
            <Flex>
              <Typography
                text="In Armenia"
                color="#5B6D7F"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
              <Typography
                text="23.08.2022"
                color="#262626"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" style={{ paddingTop: 10 }}>
            <ReadyIcon />
            <Typography
              text="Ready"
              color="#5DBA2F"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </div>
      ),
      pickup_point: (
        <>
          <Typography text="Citadel" fontSize="14px" fontWeight="400" />
          <Flex style={{ marginTop: 10 }}>
            <LockerIcon />
            <Typography
              text="Megamall"
              color="#262626"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </>
      ),
    },
    {
      id: 5,
      country: (
        <div>
          <Flex>
            <UsFlag />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              <FlyIcon />
            </div>
          </Flex>
          <Typography
            text="UK 336"
            color="#262626"
            fontSize="14px"
            fontWeight="500"
            padding="8px 0 0 0"
          />
        </div>
      ),
      name: (
        <Flex>
          <Typography
            text="Harutyun Abrahamyan ARM750350"
            fontSize="14px"
            fontWeight="500"
            color=" #262626"
          />
        </Flex>
      ),
      tracking: (
        <div>
          <Typography
            text="4201980493612896810158"
            color="#262626"
            fontSize="14px"
            fontWeight="400"
          />
          <Flex>
            <div className="product-description">
              <Typography
                text="Lorem Ipsum is simply dummy text"
                color="#5B6D7F"
                fontSize="12px"
                fontWeight="400"
                padding="10px 0 0 0 "
              />
            </div>
          </Flex>
        </div>
      ),
      weight: (
        <>
          <div>
            <Typography
              text="0.4 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
            />
          </div>
          <div>
            <Typography
              text="0.8 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
              padding="10px 0 0 0 "
            />
          </div>
        </>
      ),
      price: (
        <>
          <Typography
            text="1400 ֏"
            color="#262626"
            fontWeight="400"
            fontSize="14px"
            padding="0 7px 0 0"
          />
          <Typography
            text="60 $"
            color="#5B6D7F"
            fontWeight="400"
            fontSize="14px"
            padding="10px 0 0 0"
          />
        </>
      ),
      status: (
        <div>
          <Flex alignItems="center">
            <InArmeniaIcon />
            <Flex>
              <Typography
                text="In Armenia"
                color="#5B6D7F"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
              <Typography
                text="23.08.2022"
                color="#262626"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" style={{ paddingTop: 10 }}>
            <ReadyIcon />
            <Typography
              text="Ready"
              color="#5DBA2F"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </div>
      ),
      pickup_point: (
        <>
          <Typography text="Citadel" fontSize="14px" fontWeight="400" />
          <Flex style={{ marginTop: 10 }}>
            <LockerIcon />
            <Typography
              text="Megamall"
              color="#262626"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </>
      ),
    },
    {
      id: 6,
      country: (
        <div>
          <Flex>
            <UsFlag />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              <FlyIcon />
            </div>
          </Flex>
          <Typography
            text="UK 336"
            color="#262626"
            fontSize="14px"
            fontWeight="500"
            padding="8px 0 0 0"
          />
        </div>
      ),
      name: (
        <Flex>
          <Typography
            text="Harutyun Abrahamyan ARM750350"
            fontSize="14px"
            fontWeight="500"
            color=" #262626"
          />
        </Flex>
      ),
      tracking: (
        <div>
          <Typography
            text="4201980493612896810158"
            color="#262626"
            fontSize="14px"
            fontWeight="400"
          />
          <Flex>
            <div className="product-description">
              <Typography
                text="Lorem Ipsum is simply dummy text"
                color="#5B6D7F"
                fontSize="12px"
                fontWeight="400"
                padding="10px 0 0 0 "
              />
            </div>
          </Flex>
        </div>
      ),
      weight: (
        <>
          <div>
            <Typography
              text="0.4 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
            />
          </div>
          <div>
            <Typography
              text="0.8 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
              padding="10px 0 0 0 "
            />
          </div>
        </>
      ),
      price: (
        <>
          <Typography
            text="1400 ֏"
            color="#262626"
            fontWeight="400"
            fontSize="14px"
            padding="0 7px 0 0"
          />
          <Typography
            text="60 $"
            color="#5B6D7F"
            fontWeight="400"
            fontSize="14px"
            padding="10px 0 0 0"
          />
        </>
      ),
      status: (
        <div>
          <Flex alignItems="center">
            <InArmeniaIcon />
            <Flex>
              <Typography
                text="In Armenia"
                color="#5B6D7F"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
              <Typography
                text="23.08.2022"
                color="#262626"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" style={{ paddingTop: 10 }}>
            <ReadyIcon />
            <Typography
              text="Ready"
              color="#5DBA2F"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </div>
      ),
      pickup_point: (
        <>
          <Typography text="Citadel" fontSize="14px" fontWeight="400" />
          <Flex style={{ marginTop: 10 }}>
            <LockerIcon />
            <Typography
              text="Megamall"
              color="#262626"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </>
      ),
    },
    {
      id: 7,
      country: (
        <div>
          <Flex>
            <UsFlag />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              <FlyIcon />
            </div>
          </Flex>
          <Typography
            text="UK 336"
            color="#262626"
            fontSize="14px"
            fontWeight="500"
            padding="8px 0 0 0"
          />
        </div>
      ),
      name: (
        <Flex>
          <Typography
            text="Harutyun Abrahamyan ARM750350"
            fontSize="14px"
            fontWeight="500"
            color=" #262626"
          />
        </Flex>
      ),
      tracking: (
        <div>
          <Typography
            text="4201980493612896810158"
            color="#262626"
            fontSize="14px"
            fontWeight="400"
          />
          <Flex>
            <div className="product-description">
              <Typography
                text="Lorem Ipsum is simply dummy text"
                color="#5B6D7F"
                fontSize="12px"
                fontWeight="400"
                padding="10px 0 0 0 "
              />
            </div>
          </Flex>
        </div>
      ),
      weight: (
        <>
          <div>
            <Typography
              text="0.4 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
            />
          </div>
          <div>
            <Typography
              text="0.8 kg"
              color="#262626"
              fontWeight="400"
              fontSize="14px"
              padding="10px 0 0 0 "
            />
          </div>
        </>
      ),
      price: (
        <>
          <Typography
            text="1400 ֏"
            color="#262626"
            fontWeight="400"
            fontSize="14px"
            padding="0 7px 0 0"
          />
          <Typography
            text="60 $"
            color="#5B6D7F"
            fontWeight="400"
            fontSize="14px"
            padding="10px 0 0 0"
          />
        </>
      ),
      status: (
        <div>
          <Flex alignItems="center">
            <InArmeniaIcon />
            <Flex>
              <Typography
                text="In Armenia"
                color="#5B6D7F"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
              <Typography
                text="23.08.2022"
                color="#262626"
                fontSize="14px"
                fontWeight="400"
                margin="0 0 0 5px"
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" style={{ paddingTop: 10 }}>
            <ReadyIcon />
            <Typography
              text="Ready"
              color="#5DBA2F"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </div>
      ),
      pickup_point: (
        <>
          <Typography text="Citadel" fontSize="14px" fontWeight="400" />
          <Flex style={{ marginTop: 10 }}>
            <LockerIcon />
            <Typography
              text="Megamall"
              color="#262626"
              fontSize="12px"
              fontWeight="400"
              margin="0 0 0 5px"
            />
          </Flex>
        </>
      ),
    },
  ];

  return (
    <StyledTable>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        title={() => (
          <caption>
            <StyledCaption>
              <Flex style={{ width: 850 }}>
                <Typography
                  text="All"
                  fontSize="14px"
                  fontWeight="500"
                  color="#5B6D7F"
                  padding="0 16px 0 0"
                />
                <div className="caption-item">
                  <Typography
                    text="Packages"
                    fontSize="14px"
                    fontWeight="400"
                    color="#8E9BA7"
                    padding="0 8px 0 0"
                  />
                  <Typography
                    text="26"
                    fontSize="14px"
                    fontWeight="400"
                    color="#5B6D7F"
                    padding="0 8px 0 0"
                  />
                </div>
                <div className="caption-item">
                  <Typography
                    text="Total weight"
                    fontSize="14px"
                    fontWeight="400"
                    color="#8E9BA7"
                    padding="0 8px 0 0"
                  />
                  <Typography
                    text="0.4 kg"
                    fontSize="14px"
                    fontWeight="400"
                    color="#5B6D7F"
                    padding="0 8px 0 0"
                  />
                </div>
                <div className="caption-item">
                  <Typography
                    text="Total price"
                    fontSize="14px"
                    fontWeight="400"
                    color="#8E9BA7"
                    padding="0 8px 0 0"
                  />
                  <Typography
                    text="5464 ֏"
                    fontSize="14px"
                    fontWeight="400"
                    color="#5B6D7F"
                    padding="0 8px 0 0"
                  />
                </div>
              </Flex>
            </StyledCaption>
          </caption>
        )}
      />
    </StyledTable>
  );
}
