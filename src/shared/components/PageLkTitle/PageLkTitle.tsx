import { memo, ReactNode } from "react";
import styles from "./PageLkTitle.module.scss";
import { Typography } from "antd";

export const PageLkTitle = memo(({ title }: { title: ReactNode }) => {
  return <Typography.Title className={styles.pageLkTitle}>{title}</Typography.Title>;
});

PageLkTitle.displayName = "PageLkTitle";
