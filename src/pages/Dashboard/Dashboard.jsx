import Icon from "@mdi/react";
import { mdiPen, mdiSheep, mdiTrashCanOutline } from "@mdi/js";
import {
  Button,
  Col,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./species.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setItem,
  setLoading,
  setPage,
  setPageSize,
  setSearch,
  setTotal,
} from "../../redux/fetchDataSlice";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { axiosConfig } from "../../api/axiosConfig";
import { list } from "../../utils/common";

const Dashboard = () => {
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      render: (value) => <div>{value}</div>,
    },
    {
      title: "Mã",
      dataIndex: "code",
      render: (value) => <div>{value}</div>,
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      render: (value) => <div>{value}</div>,
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space size="small" className="action-buttons">
          <Button type="link" className="red">
            <Icon path={mdiPen} size={1} color="red" />
          </Button>
          <Button type="link" className="red">
            <Icon
              className="pointer"
              path={mdiTrashCanOutline}
              size={1}
              color="red"
            />
          </Button>
        </Space>
      ),
    },
  ];

  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.fetchData.items);
  const loading = useSelector((state) => state.fetchData.loading);
  const page = useSelector((state) => state.fetchData.page);
  const pageSize = useSelector((state) => state.fetchData.pageSize);
  const total = useSelector((state) => state.fetchData.total);
  const search = useSelector((state) => state.fetchData.search);

  const handleSearch = (value) => {
    dispatch(setSearch(value));
    dispatch(setPage(1));
  };
  const handleSearchDebounced = debounce(handleSearch, 500);
  const searchParam = search !== "" ? `&search=${search}` : "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const response = await axiosConfig.get(
          `${list}?paginate=true&page=${page}&itemsPerPage=${pageSize}${searchParam}`
        );
        dispatch(setItem(response.data.list));
        dispatch(setTotal(response.data.pagination.total));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        return;
      }
    };
    fetchData();
  }, [dispatch, page, pageSize, searchParam]);
  return (
    <div className="content">
      <Row className="alignItemCenter">
        <Space>
          <div className="sheepIcon">
            <Icon path={mdiSheep} size={1} color="red" />
          </div>
          <h1 className="fs18" style={{ margin: 0 }}>
            Danh sách quân khu
          </h1>
        </Space>
      </Row>
      <br />
      <Row>
        <Col span={12}>
          <Input
            placeholder="Tìm kiếm theo tên"
            size="large"
            className="inputUser"
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) => handleSearchDebounced(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Button className="right" size="large">
            <Link>Thêm mới</Link>
          </Button>
        </Col>
      </Row>
      <br />
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={false}
          scroll={{
            y: 500,
            x: 800,
          }}
          className="tableData"
        />
        <br />
        {total === 0 ? (
          ""
        ) : (
          <Row justify="space-between" align="middle">
            <Col span={8}>
              {(page - 1) * pageSize + 1 === total ? (
                <p>
                  {total}/{total}
                </p>
              ) : (
                <p>{`${(page - 1) * pageSize + 1}-${Math.min(
                  page * pageSize,
                  total
                )}/${total}`}</p>
              )}
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Pagination
                current={page}
                total={total}
                pageSize={pageSize}
                onChange={(page) => dispatch(setPage(page))}
                showSizeChanger={false}
              />
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              <Select
                value={pageSize.toString()}
                onChange={(newPageSize) => dispatch(setPageSize(newPageSize))}
              >
                <Select.Option value="5">5 / trang</Select.Option>
                <Select.Option value="10">10 / trang</Select.Option>
                <Select.Option value="25">25 / trang</Select.Option>
                <Select.Option value="50">50 / trang</Select.Option>
              </Select>
            </Col>
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default Dashboard;
