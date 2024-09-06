import { JupyterNotebook, PageLk, PageLkTitle } from "../../../../shared/components";
export function Function1() {
  return (
    <PageLk title={<PageLkTitle title="Lexo Jupyter Notebook" />}>
      <JupyterNotebook />
    </PageLk>
  );
}
