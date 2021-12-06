import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Rooms from "./rooms";
import house from "../assets/house.png";
import apartment from "../assets/apartment.png";

function isObjectEmpty(obj) {
  console.log("obj", obj);
  return Object.keys(obj).length === 0;
}

function Spaces() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState({});

  let url =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  useEffect(() => {
    if (!navigator.onLine) {
      console.log("No estamos conectado :c");
      if (localStorage.getItem("spaces") === null) {
        console.log("entro a desconectado y spaces vacío");
        setSpaces([]);
      } else {
        console.log("entro a desconectado y spaces no vacío");
        console.log("spaces local", JSON.parse(localStorage.getItem("spaces")));
        setSpaces(JSON.parse(localStorage.getItem("spaces")));
      }
    } else {
      console.log("Estamos conectados :3");
      // fetch(url)
      //   .then((resp) => resp.json())
      axios(url)
        .then((jsonData) => {
          console.log("jsonData", jsonData.data);
          setSpaces(jsonData.data);
          localStorage.setItem("spaces", JSON.stringify(jsonData.data));
        })
        .catch((error) => {
          console.error(error);
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
        });
    }
  }, [url]);

  const isSelectedSpaceNull =
    selectedSpace === null || isObjectEmpty(selectedSpace);

  console.log("isselectedSpace", selectedSpace);
  console.log("isSelectedSpaceNull", isSelectedSpaceNull);

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
      {!isSelectedSpaceNull && <Rooms selectedSpace={selectedSpace} />}
    </div>
  );
}

export default Spaces;
