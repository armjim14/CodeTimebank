import React from "react";
import axios from "axios";

const ExamplePage = () => {
  let initArr = [
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
  ];

  const getRepos = username => {
    delete axios.defaults.headers.common["x-auth-token"];
    axios(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    ).then(res => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        switch (res.data[i].language) {
          case "JavaScript":
            initArr[0].value++;
            break;
          case "CSS":
            initArr[1].value++;
            break;
          case "HTML":
            initArr[2].value++;
            break;
          case "C#":
            initArr[3].value++;
            break;
          case "C++":
            initArr[4].value++;
            break;
          case "C":
            initArr[5].value++;
            break;
          case "Java":
            initArr[6].value++;
            break;
          case "PHP":
            initArr[7].value++;
            break;
          case "Python":
            initArr[8].value++;
            break;
          case "Ruby":
            initArr[9].value++;
            break;
          case "Perl":
            initArr[10].value++;
            break;
          case "SQL":
            initArr[11].value++;
            break;
          case "NoSQL":
            initArr[12].value++;
            break;
          default:
            console.log(res.data[i]);
            initArr[13].value++;
            break;
        }
      }
    });
    return initArr;
  };

  console.log(getRepos("Mrrwmix"));
  return <div></div>;
};

export default ExamplePage;
