import React, { useContext } from "react";
import AlertContext from "../Context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alertz => (
      <div key={alertz.id} className={`alert alert-${alertz.type} mt-1`}>
        <i className='fas fa-info-circle' /> {alertz.msg}
      </div>
    ))
  );
};

export default Alerts;
