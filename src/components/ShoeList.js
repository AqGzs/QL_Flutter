import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteShoe, getShoes } from '../services/api';
import './ShoeList.css';

const ShoeList = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    const response = await getShoes();
    setShoes(response.data);
  };

  const handleDelete = async (id) => {
    await deleteShoe(id);
    fetchShoes();
  };

  const handleSelectShoe = (shoe) => {
    setSelectedShoe(shoe);
  };

  const handleCloseDetail = () => {
    setSelectedShoe(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredShoes = shoes.filter(shoe =>
    shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastShoe = currentPage * itemsPerPage;
  const indexOfFirstShoe = indexOfLastShoe - itemsPerPage;
  const currentShoes = filteredShoes.slice(indexOfFirstShoe, indexOfLastShoe);

  const totalPages = Math.ceil(filteredShoes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="shoe-list">
      <div className="header">
        <h1>Products</h1>
        <Link to="/shoes/new" className="add-button">Add New Product</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search product..." value={searchTerm} onChange={handleSearch} />
      </div>
      <div className="shoe-grid">
        {currentShoes.map(shoe => (
          <div key={shoe._id} className="shoe-card" onClick={() => handleSelectShoe(shoe)}>
            <img src={shoe.imageUrl} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>{shoe.brand}</p>
            <p>{shoe.price}</p>
            <p>Stock: {(shoe.stocks || []).reduce((total, stock) => total + stock.quantity, 0)}</p>
          </div>
        ))}
      </div>
      {selectedShoe && (
        <div className="shoe-detail-card">
          <div className="detail-header">
            <h2>Edit Product</h2>
            <button onClick={handleCloseDetail} className="close-button">Close</button>
            <Link to={`/shoe/${selectedShoe._id}`} className="view-details-button">View Details</Link>
          </div>
          <div className="detail-content">
            <img src={selectedShoe.imageUrl} alt={selectedShoe.name} />
            <h3>{selectedShoe.name}</h3>
            <p>{selectedShoe.brand}</p>
            <p>{selectedShoe.price}</p>
            <p>Stock: {(selectedShoe.stocks || []).reduce((total, stock) => total + stock.quantity, 0)}</p>
            <Link to={`/shoes/edit/${selectedShoe._id}`} className="edit-button">Edit</Link>
            <button onClick={() => handleDelete(selectedShoe._id)} className="delete-button">Delete</button>
          </div>
        </div>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShoeList;
