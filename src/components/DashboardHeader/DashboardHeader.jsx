import { useDispatch } from "react-redux";
import { Header } from "antd/es/layout/layout";
import "./dashboardHeader.css";
import { Link } from "react-router-dom";
import { Button, Col, Popover, Row, Space } from "antd";
import imagePath from "../../assets/logo.png";
import { logout } from "../../redux/authSlice";

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const content = (
    <>
      <div className="dashboardPopOverBottom">
        <Button type="text">Hồ sơ</Button>
        <Button
          type="text"
          className="redText redBg"
          onClick={() => dispatch(logout())}
        >
          Đăng xuất
        </Button>
      </div>
    </>
  );
  return (
    <Header
      className="dashboardHeader"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
      }}
    >
      <Row align="middle" className="h-100 w-100">
        <Col className="h-100 ellipsis-text">
          <Space size="small" className="h-100">
            <Link to="/index" style={{ display: "flex", alignItems: "center" }}>
              <img src={imagePath} alt="Logo" style={{ height: "40px" }} />
            </Link>
            <h1 className="ellipsis-text">Quân khu dashboard</h1>
          </Space>
        </Col>
        <Col flex="auto" className="h-100">
          <Popover
            placement="bottom"
            content={content}
            trigger="click"
            className="pointer dashboardPopOver h-100"
          >
            <div className="right">
              <Space size="small" className="center h-100">
                <button className="button">B</button>
                <p className="h-100">User Demo</p>
              </Space>
            </div>
          </Popover>
        </Col>
      </Row>
    </Header>
  );
}
