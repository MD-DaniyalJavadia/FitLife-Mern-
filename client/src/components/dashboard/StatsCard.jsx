import React from "react";

const StatsCard = ({ icon, color, category, title }) =>{
  return (
    <div className="card card-stats card-round">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-icon">
            <div className={`icon-big text-center icon-${color} bubble-shadow-small`}>
              <i className={`fas ${icon}`}></i>
            </div>
          </div>
          <div className="col col-stats ms-3 ms-sm-0">
            <div className="numbers">
              <p className="card-category">{category}</p>
              <h4 className="card-title">{title}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;