import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Rooms(props) {
  const [rooms, setRooms] = useState([]);

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
          if (e.homeId === props.id) currentRooms.push(e);
        });
        setRooms(currentRooms);

        console.log("rooms filtrado", rooms);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>My rooms</h2>
      <Container>
        <Row>
          {rooms.map((e) => (
            <Col>
              <div className="card">
                {/* <Image
                  className="card-img-top"
                  src={e.type === "house" ? house : apartment}
                  alt="Card image cap"
                  fluid
                /> */}
                <div className="card-body">
                  <h5 className="card-title">{e.name}</h5>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Rooms;
