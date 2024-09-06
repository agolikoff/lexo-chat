import { memo } from "react";
import cn from "classnames";
import { PropsWithClassName, PropsWithCSSProperties } from "shared/types";
import styles from "./PageLkSubTitle.module.scss";
import { Typography } from "antd";

export const PageLkSubTitle = memo(
  ({ title, className, style }: { title: string } & PropsWithClassName & PropsWithCSSProperties) => {
    return (
      <Typography.Title level={2} className={cn(styles.pageLkSubTitle, className)} style={style}>
        {title}
      </Typography.Title>
    );
  },
);

PageLkSubTitle.displayName = "PageSubTitle";
