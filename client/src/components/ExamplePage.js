import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamplePage = () => {
  const [data, setData] = useState({
    arr: [
      {
        title: "JavaScript",
        value: 0
      },
      {
        title: "CSS",
        value: 0
      },
      {
        title: "HTML",
        value: 0
      },
      {
        title: "C#",
        value: 0
      },
      {
        title: "C++",
        value: 0
      },
      {
        title: "C",
        value: 0
      },
      {
        title: "Java",
        value: 0
      },
      {
        title: "PHP",
        value: 0
      },
      {
        title: "Python",
        value: 0
      },
      {
        title: "Ruby",
        value: 0
      },
      {
        title: "Perl",
        value: 0
      },
      {
        title: "SQL",
        value: 0
      },
      {
        title: "NOSQL",
        value: 0
      },
      {
        title: "Other",
        value: 0
      }
    ]
  });

  const getRepos = async username => {
    delete axios.defaults.headers.common["x-auth-token"];
    const res = await axios(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    for (let i = 0; i < res.data; i++) {
      switch (res.data[i].language) {
        case "JavaScript":
          setData([...data.arr, data.arr[0].value++]);
          console.log(`Data at 0 is ${data.arr[0].value}`);
          break;
        default:
          break;
      }
    }
    console.log(data.arr);
  };

  console.log(getRepos("bradtraversy"));
  return <div></div>;
};

export default ExamplePage;
