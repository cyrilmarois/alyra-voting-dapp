import { useContext } from "react";
import WorkflowStatusContext from "./WorkflowStatusContext";

const useWorkflowStatus = () => useContext(WorkflowStatusContext);

export default useWorkflowStatus;
