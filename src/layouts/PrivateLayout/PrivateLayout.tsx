import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Dropdown, Layout, Menu, type MenuProps, theme, Tooltip } from "antd";
import { AppRoutes } from "../../shared/constants/routes";
import { useActionCreators, useAntContext, useAppSelector, useAuth } from "../../shared/hooks";
import { authActions, signInAction, userSelector } from "../../store/auth";
import styles from "./PrivateLayout.module.scss";
import {
  AppstoreOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { googleLogout } from "@react-oauth/google";

const { Header, Sider, Content } = Layout;

const SIDER_WIDTH = 300;

enum MenuItemEnum {
  CHAT = "CHAT",
  CHAT_HISTORY = "CHAT_HISTORY",
  CHAT_HISTORY_LABEL = "CHAT_HISTORY_LABEL",
  LEXO = "LEXO",
  LEXO_HISTORY_LABEL = "LEXO_HISTORY_LABEL",
  LEXO_HISTORY = "LEXO_HISTORY",
  SETTINGS_LABEL = "SETTINGS_LABEL",
  SETTINGS = "SETTINGS",
}

enum AccountMenuItemEnum {
  USER = "USER",
  DASHBOARD = "DASHBOARD",
  ACCOUNT = "ACCOUNT",
  SIGN_OUT = "SIGN_OUT",
}

export function PrivateLayout() {
  useAuth();

  const actions = useActionCreators({ signInAction, ...authActions });
  const user = useAppSelector(userSelector);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { token: antToken } = theme.useToken();
  const { isDarkMode, onToggleMode } = useAntContext();

  const userInitials = useMemo(() => {
    const givenName = user?.given_name?.[0] ?? "";
    const familyName = user?.family_name?.[0] ?? "";
    const result = `${givenName}${familyName}`;
    return result ?? "ND";
  }, [user]);

  const onLogout = () => {
    googleLogout();
    actions.logout();
    navigate(AppRoutes.SIGN_IN);
  };

  const leftMenuItems = useMemo((): MenuProps["items"] => {
    return [
      {
        key: MenuItemEnum.CHAT,
        label: <NavLink to={AppRoutes.LK_CHAT}>Chat</NavLink>,
        icon: <MessageOutlined />,
      },
      {
        key: MenuItemEnum.LEXO,
        label: <NavLink to={AppRoutes.LK_LEXO}>Lexo</NavLink>,
        icon: <MessageOutlined />,
      },
      {
        key: MenuItemEnum.CHAT_HISTORY_LABEL,
        type: "group",
        label: collapsed ? <EllipsisOutlined /> : <span>Chat history</span>,
        children: [
          {
            key: MenuItemEnum.CHAT_HISTORY,
            label: <NavLink to={AppRoutes.LK_CHAT_HISTORY}>Last chats</NavLink>,
            icon: <AppstoreOutlined />,
          },
        ],
      },

      {
        key: MenuItemEnum.LEXO_HISTORY_LABEL,
        label: collapsed ? <EllipsisOutlined /> : <span>Lexo functions</span>,
        type: "group",
        children: [
          {
            key: MenuItemEnum.LEXO_HISTORY,
            label: <NavLink to={AppRoutes.LK_LEXO_FUNCTION1}>Function 1</NavLink>,
            icon: <AppstoreOutlined />,
          },
        ],
      },

      {
        key: MenuItemEnum.SETTINGS_LABEL,
        label: collapsed ? <EllipsisOutlined /> : <span>Settings</span>,
        type: "group",
        children: [
          {
            key: MenuItemEnum.SETTINGS,
            label: <NavLink to={AppRoutes.LK_SETTINGS}>Accounts</NavLink>,
            icon: <SettingOutlined />,
          },
        ],
      },
    ];
  }, [location, collapsed]);

  const accountMenuItems = useMemo(
    (): MenuProps["items"] => [
      {
        key: AccountMenuItemEnum.USER,
        label: (
          <>
            <div>{user?.name}</div>
            <div>{user?.email}</div>
          </>
        ),
      },
      {
        type: "divider",
      },
      {
        key: AccountMenuItemEnum.DASHBOARD,
        icon: <AppstoreOutlined />,
        label: "Dashboard",
      },
      {
        key: AccountMenuItemEnum.ACCOUNT,
        icon: <UserOutlined />,
        label: "Account",
      },
      {
        type: "divider",
      },
      {
        key: AccountMenuItemEnum.SIGN_OUT,
        onClick: onLogout,
        icon: <LogoutOutlined />,
        label: "Sign out",
      },
    ],
    [user],
  );

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
        theme="light"
        width={SIDER_WIDTH}
      >
        <div className={styles.logo} style={{ width: SIDER_WIDTH }}>
          {!collapsed && <img width={160} height={27} src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo" />}
        </div>
        <Menu mode="inline" theme="light" items={leftMenuItems} />
      </Sider>

      <Layout>
        <Header className={styles.header} style={{ background: antToken.colorBgContainer }}>
          <Button
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: "absolute",
              left: "-16px",
            }}
          />

          <div className={styles.topMenu}>
            <Tooltip placement="bottom" title="Switch theme">
              <Button shape="circle" icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} onClick={onToggleMode} />
            </Tooltip>
            <Tooltip placement="bottom" title="Profile">
              <Dropdown
                menu={{
                  items: accountMenuItems,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Button shape="circle">{userInitials}</Button>
                </a>
              </Dropdown>
            </Tooltip>
          </div>
        </Header>
        <Content style={{ height: "calc(100vh - 56px)", overflow: "auto" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
