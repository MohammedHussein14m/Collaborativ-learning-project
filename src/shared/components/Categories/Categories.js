import React from "react";
// reactstrap components
import { Button, Container, Row } from "reactstrap";
import history from "../../../history";

function Categories() {
  return (
    <>
      <div className="ml-auto mr-auto text-center" style={{ paddingTop: 30 }}>
        <h2 className="title">Categories</h2>
        <div className="section section-examples" data-background-color="white">
          <Container className="text-center">
            <Row>
              <div
                className="col"
                onClick={() =>
                  history.push({
                    pathname: "/category-page",
                    image: require("assets/img/english2.png")
                  })
                }
              >
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/english2.png")}
                ></img>
                <Button
                  className="btn-round"
                  color="default"
                  outline
                  style={{ backgroundColor: "#2c2c2c", marginTop: 30 }}
                >
                  Learn more
                </Button>
              </div>
              <div
                className="col"
                onClick={() =>
                  history.push({
                    pathname: "/category-page",
                    image: require("assets/img/web.png")
                  })
                }
              >
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/web.png")}
                ></img>
                <Button
                  className="btn-round"
                  color="default"
                  outline
                  style={{ backgroundColor: "#2c2c2c", marginTop: 30 }}
                >
                  Learn more
                </Button>
              </div>
              <div
                className="col"
                onClick={() =>
                  history.push({
                    pathname: "/category-page",
                    image: require("assets/img/mobile_development.jpg")
                  })
                }
              >
                <img
                  alt="..."
                  className="img-raised"
                  src={require("assets/img/mobile_development.jpg")}
                ></img>
                <Button
                  className="btn-round"
                  color="default"
                  outline
                  style={{ backgroundColor: "#2c2c2c", marginTop: 30 }}
                >
                  Learn more
                </Button>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Categories;