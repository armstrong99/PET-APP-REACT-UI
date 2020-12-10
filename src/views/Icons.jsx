import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "./Icons.css";

import Card from "components/Card/Card";
// import { iconsArray } from "variables/Variables.jsx";
import axios from "axios";

const Icons = () => {
  let api =
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_LOCAL
      : process.env.REACT_APP_CLOUD;

  const [channels, setChannels] = React.useState([]);
  const [clicked, setClicked] = React.useState([]);

  const handleJoinChannel = async (channelName) => {
    setClicked([...clicked, channelName]);
    let mail = sessionStorage.getItem("mail");

    const endpoint = api + "/channel/join";
    let res = await axios({
      method: "post",
      url: endpoint,
      data: { email: mail, channelName: channelName },
      mode: "cors",
    });
    if (res.status === 200) {
    }
  };

  React.useEffect(() => {
    const getChannelsMembers = async () => {
      let mail = sessionStorage.getItem("mail");
      console.log(mail);

      const endpoint = api + "/list/all";
      let res = await axios({
        method: "post",
        url: endpoint,
        data: { email: mail, member: false },
        mode: "cors",
      });
      if (res.status === 200) {
        setChannels(res.data);
      }
    };
    getChannelsMembers();
  }, []);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Here are other awesome pet channels"
              ctAllIcons
              category={
                <span>
                  you can join immediately and right now
                  <a target="_blank" rel="noopener noreferrer" href="#">
                    Pet Swims
                  </a>
                </span>
              }
              content={
                <Row>
                  {channels.map((prop, key) => {
                    return (
                      <Col
                        lg={2}
                        md={3}
                        sm={4}
                        xs={6}
                        className="font-icon-list"
                        key={key}
                      >
                        <div className="font-icon-detail">
                          <img
                            src={prop.imgUrl}
                            alt={prop.code}
                            className={prop}
                          />
                          <p>
                            <small>Channel:</small>{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {prop.code}
                            </span>{" "}
                          </p>{" "}
                          <button
                            onClick={() => handleJoinChannel(prop.code)}
                            id="btnAlChan"
                          >
                            {clicked.includes(prop.code)
                              ? "joined"
                              : "subscribe"}
                          </button>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Icons;
