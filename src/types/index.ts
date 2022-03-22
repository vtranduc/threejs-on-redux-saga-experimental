import { CSSProperties } from "react";

export type Children = React.ReactChild | React.ReactChild[] | null;

export interface ContainerProps {
  children?: Children;
  style?: CSSProperties;
}
