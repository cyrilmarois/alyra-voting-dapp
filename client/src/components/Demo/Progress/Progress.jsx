import "./Progress.css";

const Progress = ({ workflowStatus }) => {
  // console.log({ "Progress:init": workflowStatus });

  return (
    <div className="col-md-12 subHeader">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: "20%" }}
          aria-valuenow="20"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
        {parseInt(workflowStatus) >= 1 ? (
          <div
            className="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            style={{ width: "20%" }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        ) : null}
        {parseInt(workflowStatus) >= 2 ? (
          <div
            className="progress-bar progress-bar-striped bg-info"
            role="progressbar"
            style={{ width: "20%" }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        ) : null}
        {parseInt(workflowStatus) >= 3 ? (
          <div
            className="progress-bar progress-bar-striped bg-warning"
            role="progressbar"
            style={{ width: "20%" }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        ) : null}
        {parseInt(workflowStatus) >= 4 ? (
          <div
            className="progress-bar progress-bar-striped bg-danger"
            role="progressbar"
            style={{ width: "20%" }}
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        ) : null}
      </div>
    </div>
  );
};

export default Progress;
