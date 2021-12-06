import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Image, Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import bedroom from "../assets/rooms/bedroom.png";
import dinnerRoom from "../assets/rooms/dinner.png";
import kitchen from "../assets/rooms/kitchen.png";
import livingRoom from "../assets/rooms/living-room.png";
import Devices from "./devices";
import Stats from "./stats";

function getRoomImage(roomName) {
  switch (roomName) {
    case "Living room":
      return livingRoom;
    case "Kitchen":
      return kitchen;
    case "Dinner room":
      return dinnerRoom;
    default:
      return bedroom;
  }
}

function getRoomName(roomName) {
  switch (roomName) {
    case "Living room":
      return <FormattedMessage id="living" />;
    case "Kitchen":
      return <FormattedMessage id="kitchen" />;
    case "Dinner room":
      return <FormattedMessage id="dinner" />;
    default:
      return <FormattedMessage id="bedroom" />;
  }
}

async function isOnline() {
  var condition = navigator.onLine ? "online" : "offline";
  if (condition === "online") {
    fetch("https://www.google.com/", {
      // Check for internet connectivity
      mode: "no-cors",
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  } else {
    console.log("OFFLINE");
    return false;
  }
}

function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const urlSpaces =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  let connected = isOnline();
  useEffect(() => {
    let currentRooms = [];

    if (!connected) {
      if (localStorage.getItem("rooms") === null) {
        setRooms([]);
      } else {
        let r = JSON.parse(localStorage.getItem("rooms"));
        // eslint-disable-next-line array-callback-return
        r.map((e) => {
          if (e.homeId === props.selectedSpace.id) {
            currentRooms.push(e);
          }
        });

        setRooms(currentRooms);
      }
    } else {
      fetch(urlSpaces)
        .then((resp) => resp.json())
        .then((jsonData) => {
          console.log("JSON Data rooms", jsonData);
          localStorage.setItem("rooms", JSON.stringify(jsonData));
          // eslint-disable-next-line array-callback-return
          jsonData.map((e) => {
            if (e.homeId === props.selectedSpace.id) {
              currentRooms.push(e);
            }
          });
          setRooms(currentRooms);
        })
        .catch((error) => console.error(error));
    }
  }, [connected, props, props.selectedSpace]);

  console.log("Rooms ", rooms);

  const isSelectedRoomNull = selectedRoom === null;

  return (
    <div>
      <h2
        className="roomTitle"
        style={{ textAlign: "left", marginLeft: "2rem" }}
      >
        <FormattedMessage id="rooms" />
      </h2>
      <Container>
        <Row>
          <Col md="7">
            <Row>
              {rooms.map((e, i) => (
                <Col md="4" key={`room ${i}`}>
                  <Card
                    onClickCapture={() => {
                      setSelectedRoom(e);
                      console.log("selectedRoom ", selectedRoom);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Title className="roomTitle">
                      {getRoomName(e.name)}
                    </Card.Title>
                    <Image src={getRoomImage(e.name)} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>
                    <FormattedMessage id="device" />
                  </th>
                  <th>
                    <FormattedMessage id="value" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {console.log(
                  "devices ",
                  selectedRoom !== null ? selectedRoom.devices : []
                )}
                {!isSelectedRoomNull &&
                  selectedRoom.devices.map((e, i) => (
                    <Devices id={i} device={e} />
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Stats rooms={rooms} />
    </div>
  );
}

export default Rooms;
