import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

type StoreInfo = {
  sid: string;
  name: string;
  logo: string;
};

type StoreItemProps = Partial<StoreInfo> & { sid: string };

type WaitListInfo = {
  label: string;
  value: number;
};

const baseUrl = "https://client.minitable.net/c_preorder";

const miniTableBaseUrl = "https://client.minitable.net";

// Wait list get api
const getWaitListInfoBaseUrl = `${miniTableBaseUrl}/weapp/user/preorder/list?sid=`;
const getWaitList = async (sid: string) => {
  const data = await (await fetch(`${getWaitListInfoBaseUrl}${sid}`)).json();
  const partyType = data.data.data.partytype;
  const partyTypeList = data.data.data.partytype_list;

  const partyTags = partyType.party_tags.split(",");
  const partyRanges = partyType.party_ranges.split(",");
  const partyNames = partyType.party_names.split(",");

  const waitList = partyTags.map((tag: string, index: number) => ({
    label: `${partyNames[index]}(${partyRanges[index]})`,
    value: partyTypeList[tag],
  }));

  const waitListText = waitList.reduce(
    (text: string, party: WaitListInfo) =>
      `${text} ${party.label}: ${party.value}`,
    ""
  );
  return waitListText;
};

// Store info get api
const getStoreInfoBaseUrl = `${miniTableBaseUrl}/weapp/user/store/get?sid=`;
const getStoreInfo = async (sid: string) => {
  const data = await (await fetch(`${getStoreInfoBaseUrl}${sid}`)).json();
  const name = data.data.data.store_data.sname;
  const logo = data.data.data.store_data.slogo;
  return {
    sid: sid,
    name: name,
    logo: logo,
  };
};

// Join wait list api
const peopleNum = 4;
const customerName = "Lucy Wang";
const phoneNum = "+1 6282339016";
const joinWaitListBaseUrl = `${miniTableBaseUrl}/weapp/user/v2/preorder/add`;
const joinWaitList = async (sid: string) => {
  try {
    const data = await (
      await fetch(
        `${joinWaitListBaseUrl}?sid=${encodeURIComponent(
          sid
        )}&phone_num=${encodeURIComponent(
          phoneNum
        )}&customer_name=${encodeURIComponent(
          customerName
        )}&people_num=${encodeURIComponent(peopleNum)}&code=&email=&guest_note=`
      )
    ).json();
    return data.data.data;
  } catch (error) {
    return false;
  }
};

export const StoreItem = (props: StoreItemProps) => {
  const { sid, name } = props;

  const [waitListText, setWaitListText] = useState<string>("");
  const [storeInfo, setStoreInfo] = useState({
    sid: sid,
    logo: "",
    name: "",
  });

  const refreshWaitList = async () => {
    const waitListText = await getWaitList(sid);
    setWaitListText(waitListText);
  };

  const refreshStoreInfo = async () => {
    const storeInfo = await getStoreInfo(sid);
    setStoreInfo(storeInfo);
  };

  const join = async () => {
    const success = await joinWaitList(sid);
    if (success) {
      window.alert("success");
    } else {
      window.alert("failed");
    }
  };

  useEffect(() => {
    refreshWaitList();
    refreshStoreInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItem>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <ListItemAvatar>
            <Avatar src={storeInfo.logo}></Avatar>
          </ListItemAvatar>
        </Grid>
        <Grid item xs={7}>
          <ListItemText
            primary={name ?? storeInfo.name}
            secondary={waitListText}
          />
        </Grid>
        <Grid item xs={3} style={{}}>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <Button
              style={{ textAlign: "center", fontSize: "0.6em" }}
              variant="outlined"
              size="small"
              onClick={join}
            >
              Quick Join
            </Button>
            <Button
              style={{ textAlign: "center", fontSize: "0.6em" }}
              variant="contained"
              color="primary"
              size="small"
              href={`${baseUrl}?sid=${sid}`}
            >
              Custom Join
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </ListItem>
  );
};
