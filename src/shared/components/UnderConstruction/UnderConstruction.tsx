import { Typography } from "antd";
import { HourglassOutlined } from "@ant-design/icons";

export function UnderConstruction() {
  return (
    <Typography.Text
      style={{ fontSize: "2rem", minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <HourglassOutlined />
      Under construction
    </Typography.Text>
  );
}
