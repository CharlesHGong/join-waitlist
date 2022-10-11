import React from 'react';
import "./App.css";
import { Avatar, List } from "@mui/material";
import { StoreItem } from "./components/StoreItem";
import Logo from "./assets/images/logo.png";
import { restuarants } from "./restuarantsList";

// const restuarantUrls = ["https://client.minitable.net/weapp/user/v2/preorder/add?sid=s1223e6df72a8e66b98960990d70833dd&phone_num=%2B1%202837182938&customer_name=Lucy%20Hou&people_num=4&code=&email=&guest_note=&sname=Miss%20Flower%20Hotpot%20%E8%8A%B1%E5%B0%8F%E5%A8%87%E9%87%91%E6%B1%A4%E8%8A%B1%E8%83%B6%E9%B8%A1&options="]

function App() {
  return (
    <div className="App">
      <Avatar src={Logo} style={{ width: 100, height: 100, margin: "auto" }} />
      <List dense={false}>
        {restuarants.map((store) => (
          <StoreItem key={store.sid} {...store} />
        ))}
      </List>
    </div>
  );
}

export default App;
