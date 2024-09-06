import { memo, PropsWithChildren, ReactNode } from "react";
import { Col, Row } from "antd";
import cn from "classnames";
import { PropsWithClassName } from "shared/types";
import styles from "./PageLk.module.scss";

export const PageLk = memo(
  ({ title, children, className }: { title?: ReactNode } & PropsWithChildren & PropsWithClassName) => {
    return (
      <div className={cn(styles.pageLk, className)}>
        {title && (
          <Row>
            <Col span={24}>{title}</Col>
          </Row>
        )}
        {children}
      </div>
    );
  },
);

PageLk.displayName = "PageLk";
