import { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";
import SneakerCard from "../SneakerCard";

const PopularSneakers = () => {
  const [popularSneakers, setPopularSneakers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3333/popular`).then(
        (response) => response.json()
      );
      setPopularSneakers(response);
      console.log(response);
      setIsLoading(false);
    })();
  }, [setPopularSneakers]);

  return (
    <Container>
      <h2 className="pt-4 pb-2">Trending</h2>
      <Row>
        {isLoading
          ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((item, index) => {
              <Card key={index} style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder.Button variant="primary" xs={6} />
                </Card.Body>
              </Card>;
            })
          : popularSneakers.map((sneaker, index) => {
              return (
                <Col key={sneaker.id + "-" + index}>
                  <SneakerCard key={sneaker.id} sneaker={sneaker} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default PopularSneakers;
