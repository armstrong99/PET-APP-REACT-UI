import React from "react";
// import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";

// import { Card } from "components/Card/Card.jsx";
// import { StatsCard } from "components/StatsCard/StatsCard.jsx";
// import { Tasks } from "components/Tasks/Tasks.jsx";
// import {
//   dataPie,
//   legendPie,
//   dataSales,
//   optionsSales,
//   responsiveSales,
//   legendSales,
//   dataBar,
//   optionsBar,
//   responsiveBar,
//   legendBar,
// } from "variables/Variables.jsx";

const Dashboard = () => {
  const [channels, setChannels] = React.useState([]);

  React.useEffect(() => {
    let mail = sessionStorage.getItem("mail");
    console.log(mail);
    const getChannelsMembers = async () => {
      const endpoint = "http://192.168.43.45:2060/list/all";
      let res = await axios({
        method: "post",
        url: endpoint,
        data: { email: mail, member: true },
        mode: "cors",
      });
      if (res.status === 200) {
        console.log(res.data);
        setChannels(res.data);
      }
    };
    getChannelsMembers();
  }, []);
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          {channels.map((item) => {
            return (
              <Col lg={3} sm={6}>
                <div>
                  <img src={item.imgUrl} alt={item.code} />
                  <p>
                    <small>Channel:</small>{" "}
                    <span style={{ fontWeight: "bold" }}>{item.code}</span>{" "}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <h3 style={{ textAlign: "center" }}>
            You can now recieve updates from the <br /> above channels once they
            make a post
          </h3>
        </Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
