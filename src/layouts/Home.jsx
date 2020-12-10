import React from "react";
import "./Home.css";
import axios from "axios";
// import history from "history";

const Home = (props) => {
  const [data, setData] = React.useState({});
  const [disAbl, setBtn] = React.useState(false);
  let api =
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_LOCAL
      : process.env.REACT_APP_CLOUD;

  const apiSubmit = async () => {
    setBtn(true);
    try {
      const endpoint = api + "/signup/basic";
      let res = await axios({
        method: "post",
        url: endpoint,
        data: data,
        mode: "cors",
      });
      if (res.status === 200) {
        console.log(res.data.user.email);
        sessionStorage.setItem("mail", res.data.user.email);
        window.location.assign("/admin/dashboard");
      } else throw Error;
    } catch (error) {
      setBtn(false);

      console.log(error);
      alert("A technical error occured, you can refresh and try again thanks");
    }
  };

  return (
    <>
      <section id="container">
        <section>
          <h1>Pets swims</h1>
          <img
            src="https://ak.picdn.net/shutterstock/videos/25914155/thumb/5.jpg"
            alt="brand of pet swims"
          />
        </section>

        <section className="secTwo">
          <form onSubmit={(e) => e.preventDefault()}>
            <legend>Sign In</legend>

            <input
              onChange={({ target }) =>
                setData({ ...data, name: target.value })
              }
              type="text"
              required
              placeholder="type your full name"
            />
            <input
              type="password"
              required
              placeholder="password"
              onChange={({ target }) =>
                setData({ ...data, password: target.value })
              }
            />
            <input
              type="email"
              required
              placeholder="email"
              onChange={({ target }) =>
                setData({ ...data, email: target.value })
              }
            />

            <input
              type="submit"
              value="submit"
              disabled={disAbl}
              onClick={() => apiSubmit()}
            />
          </form>
        </section>
      </section>
    </>
  );
};

export default Home;
