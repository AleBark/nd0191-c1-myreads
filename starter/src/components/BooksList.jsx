import Book from "./Book";
import AddBookButton from "./AddBookButton";
import PropTypes from "prop-types";

const BooksList = ({setShowSearchPage, showSearchPage, shelves}) => {


    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelves.map(shelf => (
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.name}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        shelf.books.map(book => (
                                            <li key={book.id}>
                                                <Book id={book.id} title={book.title} author={book.author}
                                                      imagePath={book.imagePath}/>
                                            </li>

                                        ))
                                    }
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="open-search">
                <AddBookButton setShowSearchPage={setShowSearchPage} showSearchPage={showSearchPage}/>
            </div>
        </div>
    )
}

BooksList.propTypes = {
    setShowSearchPage: PropTypes.func.isRequired,
    showSearchPage: PropTypes.bool.isRequired,
    shelves: PropTypes.array.isRequired,
};

export default BooksList;