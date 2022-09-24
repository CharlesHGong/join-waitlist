import "./App.css";
import { Avatar, List } from "@material-ui/core";
import { StoreItem } from "./components/StoreItem";
import Logo from "./assets/images/logo.png";

// const restuarantUrls = ["https://client.minitable.net/weapp/user/v2/preorder/add?sid=s1223e6df72a8e66b98960990d70833dd&phone_num=%2B1%202837182938&customer_name=Lucy%20Hou&people_num=4&code=&email=&guest_note=&sname=Miss%20Flower%20Hotpot%20%E8%8A%B1%E5%B0%8F%E5%A8%87%E9%87%91%E6%B1%A4%E8%8A%B1%E8%83%B6%E9%B8%A1&options="]

const restuarants = [
  {
    sid: "s1223e6df72a8e66b98960990d70833dd",
    name: "花小姐金汤花胶鸡",
  },
  {
    sid: "scb30539079a1df7a194b1cb77e62f786",
    name: "麻辣空间",
  },
  {
    sid: "s71b8365e1a1ea0c8f71a144224ac781a",
    name: "小食代",
  },
];

function App() {
  return (
    <div className="App">
      <Avatar src={Logo} style={{ width: 100, height: 100, margin: "auto" }} />
      <List dense={false}>
        {restuarants.map((store) => (
          <StoreItem {...store} />
        ))}
      </List>
    </div>
  );
}

export default App;
