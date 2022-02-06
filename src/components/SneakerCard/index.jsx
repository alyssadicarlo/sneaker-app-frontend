import {
  Card,
  Button,
  Modal,
  Container,
  Row,
  Col,
  Carousel,
  Table,
  Nav,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SneakerCard = ({ sneaker }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [shoeDetails, setShoeDetails] = useState({
    lowestPriceVendor: "",
    lowestPrice: 0,
    vendorLogo: "",
  });

  const [allShoeDetails, setAllShoeDetails] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activePill, setActivePill] = useState("DETAILS");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      for (let shoeVendor in sneaker.lowestResellPrice) {
        if (sneaker.lowestResellPrice[shoeVendor] > shoeDetails.lowestPrice) {
          if (shoeVendor === "goat") {
            setShoeDetails({
              ...shoeDetails,
              lowestPriceVendor: shoeVendor,
              lowestPrice: sneaker.lowestResellPrice[shoeVendor],
              vendorLogo:
                "https://searchlogovector.com/wp-content/uploads/2019/07/goat-logo-vector.png",
            });
          } else if (shoeVendor === "stockX") {
            setShoeDetails({
              ...shoeDetails,
              lowestPriceVendor: shoeVendor,
              lowestPrice: sneaker.lowestResellPrice[shoeVendor],
              vendorLogo:
                "https://logos-world.net/wp-content/uploads/2021/10/StockX-Logo.png",
            });
          } else {
            setShoeDetails({
              ...shoeDetails,
              lowestPriceVendor: shoeVendor,
              lowestPrice: sneaker.lowestResellPrice[shoeVendor],
              vendorLogo:
                "https://images.all-free-download.com/images/graphiclarge/fight_club_105692.jpg",
            });
          }
        }
      }
      const response = await fetch(
        `http://localhost:3333/product/${sneaker.styleID}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setAllShoeDetails(data);
        });
      setIsLoading(false);
    })();
  }, [setShoeDetails, setAllShoeDetails, setIsLoading]);

  const handlePillClick = (pill) => {
    setActivePill(pill);
  };

  return (
    <>
      <Card
        onClick={handleShow}
        className="mt-2 mb-2 sneaker-card"
        style={{ width: "18rem" }}
      >
        <Card.Img className="p-3" variant="top" src={sneaker.thumbnail} />
        <Card.Body>
          <Card.Title>{allShoeDetails.shoeName}</Card.Title>
          <Card.Text>
            From ${shoeDetails.lowestPrice} at{" "}
            <img width="50" src={shoeDetails.vendorLogo} />
          </Card.Text>
          <a href={sneaker.resellLinks[shoeDetails.lowestPriceVendor]}>
            Buy Now
          </a>
        </Card.Body>
      </Card>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <a href="/">Back</a>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Carousel>
                  {!isLoading ? (
                    allShoeDetails.imageLinks.map((shoe, index) => {
                      return (
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={shoe}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Carousel>
              </Col>
              <Col className="m-2">
                <h2>{sneaker.make}</h2>
                <small>From</small>
                <h2>${shoeDetails.lowestPrice}</h2>
                {!isLoading ? (
                  <a
                    href={
                      allShoeDetails.resellLinks[shoeDetails.lowestPriceVendor]
                    }
                  >
                    <img width="50" src={shoeDetails.vendorLogo} />
                  </a>
                ) : (
                  <></>
                )}
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        handlePillClick("DETAILS");
                      }}
                    >
                      Details
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={() => handlePillClick("ABOUT")}>
                      About
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                {activePill === "ABOUT" ? (
                  sneaker.description
                ) : (
                  <div className="mt-2">
                    <ul>
                      <li>Make: {allShoeDetails.make}</li>
                      <li>Colorway: {allShoeDetails.colorway}</li>
                      <li>Style ID: {allShoeDetails.styleID}</li>
                      <li>Release Date: {allShoeDetails.releaseDate}</li>
                      <li>Retail Price: ${allShoeDetails.retailPrice}</li>
                    </ul>
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <td></td>
                      <td>4</td>
                      <td>4.5</td>
                      <td>5</td>
                      <td>5.5</td>
                      <td>6</td>
                      <td>6.5</td>
                      <td>7</td>
                      <td>7.5</td>
                      <td>8</td>
                      <td>8.5</td>
                      <td>9</td>
                      <td>9.5</td>
                      <td>10</td>
                      <td>10.5</td>
                      <td>11</td>
                      <td>11.5</td>
                      <td>12</td>
                      <td>12.5</td>
                      <td>13</td>
                      <td>13.5</td>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading ? (
                      <>
                        <tr>
                          <td>
                            <img
                              width="50"
                              src="https://searchlogovector.com/wp-content/uploads/2019/07/goat-logo-vector.png"
                            />
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["4"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["4"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["4.5"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["4.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["5"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["5.5"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["5.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["6"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["6"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["6.5"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["6.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["7"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["7"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["7.5"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["7.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["8"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["8"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["8.5"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["8.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["9"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["9"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["9.5"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["9.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["10"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["10"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["10.5"]
                              ? "$" +
                                allShoeDetails.resellPrices["goat"]["10.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["11"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["11"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["11.5"]
                              ? "$" +
                                allShoeDetails.resellPrices["goat"]["11.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["12"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["12"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["12.5"]
                              ? "$" +
                                allShoeDetails.resellPrices["goat"]["12.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["13"]
                              ? "$" + allShoeDetails.resellPrices["goat"]["13"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["goat"]["13.5"]
                              ? "$" +
                                allShoeDetails.resellPrices["goat"]["13.5"]
                              : "-"}
                          </td>
                        </tr>
                        {/* <tr>
                      <td>{allShoeDetails.resellPrices['stockX']['4'] ? allShoeDetails.resellPrices['stockX']['4'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['4.5'] ? allShoeDetails.resellPrices['stockX']['4.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['5'] ? allShoeDetails.resellPrices['stockX']['5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['5.5'] ? allShoeDetails.resellPrices['stockX']['5.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['6'] ? allShoeDetails.resellPrices['stockX']['6'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['6.5'] ? allShoeDetails.resellPrices['stockX']['6.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['7'] ? allShoeDetails.resellPrices['stockX']['7'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['7.5'] ? allShoeDetails.resellPrices['stockX']['7.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['8'] ? allShoeDetails.resellPrices['stockX']['8'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['8.5'] ? allShoeDetails.resellPrices['stockX']['8.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['9'] ? allShoeDetails.resellPrices['stockX']['9'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['9.5'] ? allShoeDetails.resellPrices['stockX']['9.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['10'] ? allShoeDetails.resellPrices['stockX']['10'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['10.5'] ? allShoeDetails.resellPrices['stockX']['10.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['11'] ? allShoeDetails.resellPrices['stockX']['11'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['11.5'] ? allShoeDetails.resellPrices['stockX']['11.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['12'] ? allShoeDetails.resellPrices['stockX']['12'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['12.5'] ? allShoeDetails.resellPrices['stockX']['12.5'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['13'] ? allShoeDetails.resellPrices['stockX']['13'] : '-'}</td>
                      <td>{allShoeDetails.resellPrices['stockX']['13.5'] ? allShoeDetails.resellPrices['stockX']['13.5'] : '-'}</td>
                    </tr> */}
                        <tr>
                          <img
                            width="70"
                            src="https://images.all-free-download.com/images/graphiclarge/fight_club_105692.jpg"
                          />
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["4"]
                              ? allShoeDetails.resellPrices["flightClub"]["4"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["4.5"]
                              ? allShoeDetails.resellPrices["flightClub"]["4.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["5"]
                              ? allShoeDetails.resellPrices["flightClub"]["5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["5.5"]
                              ? allShoeDetails.resellPrices["flightClub"]["5.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["6"]
                              ? allShoeDetails.resellPrices["flightClub"]["6"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["6.5"]
                              ? allShoeDetails.resellPrices["flightClub"]["6.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["7"]
                              ? allShoeDetails.resellPrices["flightClub"]["7"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["7.5"]
                              ? allShoeDetails.resellPrices["flightClub"]["7.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["8"]
                              ? allShoeDetails.resellPrices["flightClub"]["8"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["8.5"]
                              ? allShoeDetails.resellPrices["flightClub"]["8.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["9"]
                              ? allShoeDetails.resellPrices["flightClub"]["9"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["9.5"]
                              ? allShoeDetails.resellPrices["flightClub"]["9.5"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["10"]
                              ? allShoeDetails.resellPrices["flightClub"]["10"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["10.5"]
                              ? allShoeDetails.resellPrices["flightClub"][
                                  "10.5"
                                ]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["11"]
                              ? allShoeDetails.resellPrices["flightClub"]["11"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["11.5"]
                              ? allShoeDetails.resellPrices["flightClub"][
                                  "11.5"
                                ]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["12"]
                              ? allShoeDetails.resellPrices["flightClub"]["12"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["12.5"]
                              ? allShoeDetails.resellPrices["flightClub"][
                                  "12.5"
                                ]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["13"]
                              ? allShoeDetails.resellPrices["flightClub"]["13"]
                              : "-"}
                          </td>
                          <td>
                            {allShoeDetails.resellPrices["flightClub"]["13.5"]
                              ? allShoeDetails.resellPrices["flightClub"][
                                  "13.5"
                                ]
                              : "-"}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SneakerCard;
