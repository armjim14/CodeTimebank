import React from "react";

const Dashboard = () => {

  const submit = e => {
    e.preventDefault();

    console.log("stuff")
  }

  return (
    <div>
      <form onSubmit={submit}>

      </form>
    </div>
  );
};

export default Dashboard;
