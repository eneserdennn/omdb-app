import "./SearchBox.scss";
import { Form, FormControl, Button, Container, Row } from "react-bootstrap";

const SearchBox = (props) => {
  return (
    <Container>
      <Row>
        <div className="app__searchbar">
          <Form ref={props.formRef}>
            <Form.Group className="mb-3" controlId="search">
              <Form.Label className="app__searchbar--title">
                Movie Title
              </Form.Label>
              <FormControl
                type="text"
                placeholder="Search for a movie"
                value={props.searchValue}
                onChange={(event) => props.setSearchValue(event.target.value)}
              />
            </Form.Group>
          </Form>

          <div className="app__searchbar--button">
            <Button
              className="button-clear"
              variant="light"
              type="submit"
              onClick={(event) => {
                props.handleClearBtn(event);
              }}
            >
              Clear
            </Button>
            <Button
              className="button-search"
              variant="success"
              type="submit"
              onClick={(event) => props.onSubmit(event)}
            >
              Search
            </Button>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default SearchBox;
