import type { ReactNode } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

type TemplateRouterShellProps = {
  basename?: string;
  children: ReactNode;
};

/** Hash routes for admin preview (`preview-*.html?c=`); path routes for `/templates/{slug}`. */
export function TemplateRouterShell({ basename, children }: TemplateRouterShellProps) {
  if (basename) {
    return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
  }
  return <HashRouter>{children}</HashRouter>;
}
