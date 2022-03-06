import { Fragment, ReactNode } from "react";
import { TopBar } from "./components/top-bar";

type MainLayoutProps = {
  children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Fragment>
      <TopBar />
      {children}
    </Fragment>
  );
}
