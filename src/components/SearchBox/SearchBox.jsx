import "./SearchBox.scss";
import {
  Form,
  FormControl,
  Button,
  Container,
  Row,
  InputGroup,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBox = (props) => {
  return (
    <Container>
      <Row>
        <div className="app__searchbar">
          <span className="app__searchbar--title">Movie Title</span>
          <Form ref={props.formRef}>
            <Form.Group controlId="search">
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search for a movie"
                  value={props.searchValue}
                  onChange={(event) => props.setSearchValue(event.target.value)}
                />
              </InputGroup>
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
