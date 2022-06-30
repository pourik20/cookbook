import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Sonnet = (props) => {
    return (
      <>
        <Container className="text-secondary mt-2">
          <Row  className="text-dark">
            <h4>Step {props.number}</h4>
            <hr/>
          </Row>
          <Row>
            <p>
              {props.text}
            </p>
          </Row>
        </Container>
      </>
    );
  };
  
  export default Sonnet;