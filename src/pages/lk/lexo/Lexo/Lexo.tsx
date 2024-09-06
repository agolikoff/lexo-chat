import { ChatComponent, PageLk, PageLkTitle, PageLkSubTitle } from "../../../../shared/components";
import styles from "./Lexo.module.scss";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../shared/constants/routes";
import { GlobalOutlined } from "@ant-design/icons";

export function Lexo() {
  const navigation = useNavigate();

  const openNotebook = () => {
    navigation(AppRoutes.LK_LEXO_FUNCTION1);
  };

  return (
    <PageLk title={<PageLkTitle title="Lexo page" />} className={styles.lexoPageWrapper}>
      <div className={styles.lexoPage}>
        <div className={styles.one}>
          <PageLkSubTitle style={{ textAlign: "center", marginBottom: 50 }} title="Functionality" />
          <div className={styles.panelWrapper} onClick={openNotebook}>
            <div className={styles.panel}>
              <Typography.Title
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                level={3}
              >
                <GlobalOutlined style={{ fontSize: 32 }} />
                <span> Jupyter Notebook</span>
              </Typography.Title>
              <Typography.Title style={{ margin: 0 }} level={5}>
                Click to open
              </Typography.Title>
            </div>
          </div>
        </div>
        <div className={styles.two}>
          <PageLkSubTitle style={{ textAlign: "center" }} title="Chatbot" />
          <ChatComponent />
        </div>
      </div>
    </PageLk>
  );
}
