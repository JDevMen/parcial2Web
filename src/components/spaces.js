import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Rooms from "./rooms";
import house from "../assets/house.png";
import apartment from "../assets/apartment.png";

function Spaces() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  let url =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((jsonData) => {
        console.log("JSON Data", jsonData);

        setSpaces(jsonData);
      })
      .catch((error) => console.error(error));
  }, [url]);

  const isSelectedSpaceNull = selectedSpace === null;

  return (
    <div>
      <Container>
        <Row>
          {spaces.map((e, i) => (
            <Col className="col-mb-2" key={`space ${i}`} md="2">
              <Card
                onClick={() => {
                  setSelectedSpace(e);
                  console.log("selectedSpace", selectedSpace);
                }}
              >
                <Image
                  src={e.type === "house" ? house : apartment}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Text className="cardText">{e.address}</Card.Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {!isSelectedSpaceNull && <Rooms selectedSpace={selectedSpace} />}
    </div>
  );
}

export default Spaces;
