import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Image, Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import bedroom from "../assets/rooms/bedroom.png";
import dinnerRoom from "../assets/rooms/dinner.png";
import kitchen from "../assets/rooms/kitchen.png";
import livingRoom from "../assets/rooms/living-room.png";
import Devices from "./devices";

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

function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  console.log("props space", props.selectedSpace);
  const urlSpaces =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  useEffect(() => {
    let currentRooms = [];
    console.log("props", props);
    fetch(urlSpaces)
      .then((resp) => resp.json())
      .then((jsonData) => {
        console.log("JSON Data rooms", jsonData);

        // eslint-disable-next-line array-callback-return
        jsonData.map((e, i) => {
          if (e.homeId === props.selectedSpace.id) {
            currentRooms.push(e);
          }
        });
        setRooms(currentRooms);
      })
      .catch((error) => console.error(error));
  }, [props, props.selectedSpace]);

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
    </div>
  );
}

export default Rooms;
