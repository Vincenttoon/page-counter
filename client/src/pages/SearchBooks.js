import React, { useState } from "react";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import "../styles/SearchBooks.scss";

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (!searchInput.trim()) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      if (data.items) {
        const books = data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || ["Unknown Author"],
          description:
            item.volumeInfo.description || "No description available",
          image: item.volumeInfo.imageLinks?.thumbnail,
          pageCount: item.volumeInfo.pageCount || "N/A",
          averageRating: item.volumeInfo.averageRating || "N/A",
        }));
        setSearchResults(books);
      } else {
        setSearchResults([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const toggleDescription = (index) => {
    const updatedSearchResults = [...searchResults];
    updatedSearchResults[index].truncateDescription =
      !updatedSearchResults[index].truncateDescription;
    setSearchResults(updatedSearchResults);
  };

  return (
    <div className="container">
      <div className="search-div">
        <div className="books-div">
          <h2>
            <FaSearch />
          </h2>
          <h2 className="find-books"> Find Books </h2>
          <h2>
            <FaBookOpen />
          </h2>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchInput}
            onChange={handleInputChange}
            className="input-text"
          />
        </div>

        <div className="search-button-div">
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="p-info">
          <p className="p-search">
            ~ search powered by{" "}
            <a href="https://developers.google.com/books">Google Books Api</a> ~
          </p>
        </div>
      </div>

      <div className="results-div">
        {loading && <p>Loading...</p>}
        {!loading && searchResults.length === 0 && <p>No results found.</p>}
        {searchResults.map((book, index) => (
          <div key={book.id} className="search-result">
            <h3>Title: {book.title}</h3>
            <h4>Authors: {book.authors.join(", ")}</h4>
            {book.image && <img src={book.image} alt={book.title} />}
            <div className="desc-div">
              <p>
                {book.truncateDescription
                  ? book.description // Show truncated description
                  : book.description.slice(0, 100)}{" "}
                {/* Show full description if not truncated */}
              </p>
              {book.description.length > 100 && (
                <button
                  onClick={() => toggleDescription(index)}
                  className="desc-btn"
                >
                  {book.truncateDescription ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <p>Page Count: {book.pageCount}</p>
            <p>Average Rating: {book.averageRating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
