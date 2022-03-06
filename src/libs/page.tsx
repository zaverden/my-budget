import type { ComponentType, ReactNode } from "react";
import { AnyDictionary } from "@p/ts";

const PAGE_CONFIG_KEY = "$page-config$";

type PageConfig = {
  withLayout: (page: ReactNode, props: Record<string, unknown>) => ReactNode;
  layoutComponent?: ComponentType;
};

type PageConfigPart = { [K in typeof PAGE_CONFIG_KEY]: Partial<PageConfig> };

type ConfiguredPage<TPage> = TPage & PageConfigPart;

export function withPageConfig<TPage>(page: TPage, config: Partial<PageConfig>) {
  const wrappedPage = withDevWrapper(page) as ConfiguredPage<TPage>;

  wrappedPage[PAGE_CONFIG_KEY] = config;
  return wrappedPage;
}

export function extractPageConfig(page: unknown): PageConfig {
  const extracted = (page as Partial<PageConfigPart>)[PAGE_CONFIG_KEY] ?? {};
  const Layout = extracted.layoutComponent;
  return {
    withLayout: Layout ? (p, props) => <Layout {...props}>{p}</Layout> : (p) => p,
    ...extracted,
  };
}

function withDevWrapper<TPage>(page: TPage) {
  if (process.env.NODE_ENV === "production") {
    return page;
  }
  const Page = page as unknown as (props: unknown) => JSX.Element;
  return function devWrapper(props: AnyDictionary) {
    return <Page {...props} />;
  } as unknown as TPage;
}
