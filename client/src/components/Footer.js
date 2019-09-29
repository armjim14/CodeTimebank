import React from "react";

const Footer = () => {
  return (
    <div className='container-fluid'>
      <div
        className='row footer position-fixed bg-gradient-black'
        style={{ bottom: "0", width: "100%", zIndex: "1000" }}
      >
        <h6 className='col-md-12 text-center text-greyish pt-1 small'>
          Created by{" "}
          <a
            href='https://www.linkedin.com/in/george-campa-13484053/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: "slategrey" }}
          >
            George Campa
          </a>
          ,{" "}
          <a
            href='https://www.linkedin.com/in/armando-jimenez-291a4b180/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: "slategrey" }}
          >
            Armando Jimenez
          </a>
          ,{" "}
          <a
            href='https://www.linkedin.com/in/ruben-valdez-b223b825/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: "slategrey" }}
          >
            Ruben Valdez
          </a>
          , and{" "}
          <a
            href='https://www.linkedin.com/in/matthew-winemiller-27497b37/'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: "slategrey" }}
          >
            Matthew Winemiller
          </a>
        </h6>
        <h6 className='col-md-12 text-center text-greyish small mb-0'>
          © 2019
        </h6>
      </div>
    </div>
  );
};

export default Footer;
