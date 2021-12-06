import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Rooms from "./rooms";
import house from "../assets/house.png";
import apartment from "../assets/apartment.png";

async function isOnline() {
  var condition = navigator.onLine ? "online" : "offline";
  if (condition === "online") {
    console.log("ONLINE");
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
    return false;
  }
}

function Spaces() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState({});

  let url =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  useEffect(() => {
    let connected;
    isOnline().then((res) => {
      connected = res;
      console.log("connected", connected);
      console.log("res", res);
      if (!connected) {
        console.log("No estamos conectado :c");
        if (localStorage.getItem("spaces") === null) {
          console.log("entro a desconectado y spaces vacío");
          setSpaces([]);
        } else {
          console.log("entro a desconectado y spaces no vacío");
          console.log(
            "spaces local",
            JSON.parse(localStorage.getItem("spaces"))
          );
          setSpaces(JSON.parse(localStorage.getItem("spaces")));
        }
      } else {
        console.log("Estamos conectados :3");
        fetch(url)
          .then((resp) => resp.json())
          .then((jsonData) => {
            localStorage.setItem("spaces", JSON.stringify(jsonData));
            setSpaces(jsonData);
          })
          .catch((error) => console.error(error));
      }
    });
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
                style={{ cursor: "pointer" }}
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
      {/* {!isSelectedSpaceNull && <Rooms selectedSpace={selectedSpace} />} */}
    </div>
  );
}

export default Spaces;
