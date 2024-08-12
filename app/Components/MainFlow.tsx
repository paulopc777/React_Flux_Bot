import { ReactFlowProvider } from "reactflow";

// import {} from "@xyflow/react";

import "reactflow/dist/style.css";
import HeaderNav from "./Header/Index";
import { useShallow } from "zustand/react/shallow";
import AlertBox from "./Utilitys/ErrorBox";
import ErrorView, { selectError } from "app/Redux/erroStore";
// import Flow from "./Flow";
import React, { Suspense, useEffect } from "react";
import Looad from "./LoadScreen/Looad";
import AnimationCont from "./Header/LoadBotCreate";

const Flow = React.lazy(() => import("./Flow"));

export default function ConteinerBox() {
  const { Error, ToggleErrorVisibility } = ErrorView(useShallow(selectError));

  return (
    <>
      <div className="overflow-hidden dark:bg-zinc-900">
        <HeaderNav></HeaderNav>
        <AlertBox
          Text={Error.Text}
          Visible={Error.Visible}
          Type={Error.Type}
          ErrorImg={Error.ErrorImg}
        ></AlertBox>

        <div className="h-screen bg-white dark:bg-zinc-800">
          <ReactFlowProvider>
            <Suspense fallback={<Looad></Looad>}>
              <Flow></Flow>
            </Suspense>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
}
