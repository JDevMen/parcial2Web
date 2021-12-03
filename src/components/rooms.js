import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import bedroom from "../assets/rooms/bedroom.png";
import dinnerRoom from "../assets/rooms/dinner.png";
import kitchen from "../assets/rooms/kitchen.png";
import livingRoom from "../assets/rooms/living-room.png";

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

function Rooms(props) {
  const [rooms, setRooms] = useState([]);
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

        jsonData.map((e, i) => {
          if (e.homeId === props.selectedSpace.id) {
            currentRooms.push(e);
          }
        });
        setRooms(currentRooms);
      })
      .catch((error) => console.error(error));
  }, [props.selectedSpace]);

  return (
    <div>
      <h2>My rooms</h2>
      <Container>
        <Row>
          {rooms.map((e) => (
            <Col>
              <Card>
                <Card.Title>{e.name}</Card.Title>
                {/* <Card.Image
                  variant="top"
                  src="../assets/rooms/living-room.png"
                ></Card.Image> */}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Rooms;
