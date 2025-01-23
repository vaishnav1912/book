import React, { useEffect, useState } from 'react';
import { Modal, Card, Button, Form } from 'react-bootstrap';
import { getAllBookAPI, removeBookAPI, updateBookAPI } from '../services/allAPI';

const BookCard = ({ uploadResposeFromHome, setDeleteBookFromBookCard, deleteBookFromBookCard }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    title: '',
    author: '',
    price: '',
    image: '',
    details: '',
  });

  const handleViewClose = () => setShow(false);
  const handleUpdateClose = () => setShowUpdateModal(false);

  const handleViewShow = (book) => {
    setSelectedBook(book);
    setShow(true);
  };

  const handleUpdateShow = (book) => {
    setSelectedBook(book);
    setUpdatedDetails(book);
    setShowUpdateModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const getallBooks = async () => {
    try {
      const result = await getAllBookAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllBooks(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (id) => {
    try {
      const result = await removeBookAPI(id);
      setDeleteBookFromBookCard(result);
      getallBooks();
    } catch (err) {
      console.log(err);
    }
  };

  const updateBook = async () => {
    try {
      const result = await updateBookAPI(selectedBook.id, updatedDetails);

      if (result.status >= 200 && result.status < 300) {
        handleUpdateClose();
        getallBooks();
        console.log('Book Details updated successfully:', result.data);
      }
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  useEffect(() => {
    getallBooks();
  }, [uploadResposeFromHome, setDeleteBookFromBookCard, deleteBookFromBookCard]);

  return (
    <div className="container">
      <div className="row">
        {allBooks?.length > 0 ? (
          allBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={book.image} style={{ height: "100px", width:"100px" }} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>Author: {book.author}</Card.Text>
                  <Card.Text>
                    <i className="fa-solid fa-indian-rupee-sign"></i> {book.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button onClick={() => handleViewShow(book)} variant="warning">
                      View Details
                    </Button>
                    <Button onClick={() => handleUpdateShow(book)} variant="info">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button onClick={() => deleteBook(book.id)} variant="danger">
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="text-danger fw-bolder fs-3 text-center">
            No books to display
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal size="lg" show={show} onHide={handleViewClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img width="20%" height="200px" src={selectedBook?.image} alt="" />
          <p className="fs-5 mt-3">Author: {selectedBook?.author}</p>
          <p>{selectedBook?.details}</p>
          <p className="fs-5 mt-3">Price: {selectedBook?.price}</p>
        </Modal.Body>
      </Modal>

      {/* Update Modal */}
      <Modal size="md" show={showUpdateModal} onHide={handleUpdateClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book: {selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updatedDetails.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={updatedDetails.author}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updatedDetails.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={updatedDetails.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="details"
                rows={3}
                value={updatedDetails.details}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={updateBook}>
            Update Book
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookCard;