import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, Form } from 'react-bootstrap';
import { getAllBookAPI, removeBookAPI, updateBookAPI } from '../services/allAPI';

const BookCard = ({ uploadResposeFromHome, setDeleteBookFromBookCrd, deleteBookFromBookCrd }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [show, setShow] = useState(false); // For view modal
  const [showUpdateModal, setShowUpdateModal] = useState(false); // For update modal
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    title: '',
    author: '',
    price: '',
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
      setDeleteBookFromBookCrd(result);
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
        console.log('Book updated successfully:', result.data);
      }
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  useEffect(() => {
    getallBooks();
  }, [uploadResposeFromHome, setDeleteBookFromBookCrd, deleteBookFromBookCrd]);

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allBooks?.length > 0 ? (
            allBooks.map((book) => (
              <tr key={book.id}>
                <td>
                  {book.title}{' '}
                  <Button onClick={() => handleViewShow(book)} className="btn btn-dark">
                    <i className="fa-regular fa-eye"></i>
                  </Button>
                </td>
                <td>{book.author}</td>
                <td>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {book.price}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <Button onClick={() => handleUpdateShow(book)} className="btn btn-info">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button onClick={() => deleteBook(book.id)} className="btn btn-danger">
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-danger fw-bolder fs-5 text-center">
                No books uploaded yet
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* View Modal */}
      <Modal size="lg" show={show} onHide={handleViewClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBook?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img width="100%" height="300px" src={selectedBook?.image} alt="" />
          <p className="fs-5 mt-3">Author: {selectedBook?.author}</p>
          <p>{selectedBook?.details}</p>
          <p className="fs-5 mt-3">Price: {selectedBook?.price}</p>
        </Modal.Body>
      </Modal>

      {/* Update Modal */}
      <Modal size="lg" show={showUpdateModal} onHide={handleUpdateClose} backdrop="static" keyboard={false}>
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
              <Form.Label>Details</Form.Label>
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
          <Button variant="primary" onClick={updateBook}>
            Update Book
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookCard;