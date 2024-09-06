import { memo } from "react";
import { Jupyter, Notebook } from "@datalayer/jupyter-react";

export const JupyterNotebook = memo(() => {
  return (
    <Jupyter>
      <Notebook path="/ping.ipynb" />
    </Jupyter>
  );
});

JupyterNotebook.displayName = "JupyterNotebook";
