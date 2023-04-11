import { createContext, useState } from 'react';
import tw from 'tailwind-styled-components'

// ============== Types ===============================
export type T_globalState={
    hasOpenedNewTopicPanel:boolean,
}
const default_globalState:T_globalState={
    hasOpenedNewTopicPanel:false,
}

// ============== Functions & Data ====================
const useGlobalStateContext = (globalState: T_globalState) => {
    const [state,setState]=useState<T_globalState>(globalState);
    return {state,setState}
}

type T_globalStateContext = ReturnType<typeof useGlobalStateContext>;

const default_globalStateContext: T_globalStateContext = {
  state: default_globalState,
  setState:()=>{},
};

export const globalStateContext = createContext<T_globalStateContext>(default_globalStateContext);

const GlobalStateProvider = ({ children }: { children: React.ReactElement }) => {
  return (
    <globalStateContext.Provider value={useGlobalStateContext(default_globalState)}>
      {children}
    </globalStateContext.Provider>
  );
};

export default GlobalStateProvider;