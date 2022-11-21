import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import useEth from "../EthContext/useEth";
import { reducer, actions, initialState } from "./state";
import WorkflowStatusContext from "./WorkflowStatusContext";

function WorkflowStatusProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    state: { contract, accounts },
  } = useEth();
  const newStatusEvent = useRef();

  // const [newWorkflowStatus, setNewWorkflowStatus] = useState(0);
  // console.log({
  //   newWorkflowStatus,
  // });

  const init = useCallback(async (tmpWorkflowStatus) => {
    console.log({ workflowStatus, contract, accounts });
    let workflowStatus = 0;
    if (contract) {
      try {
        // get current status
        const tmpStatus = await contract.methods.workflowStatus().call({
          from: accounts[0],
        });
        console.log({ tmpStatus: parseInt(tmpStatus) });
        workflowStatus = parseInt(tmpStatus);
      } catch (e) {
        alert(e.message);
      }

      dispatch({
        type: actions.init,
        data: { workflowStatus },
      });
    }
  }, []);

  useEffect(async () => {
    // fetch new status
    console.log({ contract });
    const handleChange = () => {
      init(state.workflowStatus);
    };
    if (contract) {
      try {
        await contract.events
          .WorkflowStatusChange({ fromBlock: "earliest" })
          .on("data", (event) => {
            newStatusEvent = event.returnValues.newStatus;
            console.log({ newStatusEvent: parseInt(newStatusEvent) });
            // workflowStatus = parseInt(newStatusEvent);
            return () => {
              handleChange();
            };
          });
      } catch (e) {
        console.error(e);
      }
    }
  }, [init, state.workflowStatus]);

  return (
    <WorkflowStatusContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </WorkflowStatusContext.Provider>
  );
}

export default WorkflowStatusProvider;
