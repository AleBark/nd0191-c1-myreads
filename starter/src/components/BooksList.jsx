import Book from "./Book";
import AddBookButton from "./AddBookButton";
import PropTypes from "prop-types";

const BooksList = ({setShowSearchPage, showSearchPage, shelves, onAddBook, onRemoveBook, onShelfChangeBook}) => {

    const handleOnAddBook = (book, shelfId) => {
        onAddBook(book, shelfId);
    }

    const handleOnRemoveBook = (book, shelfId) => {
        onRemoveBook(book, shelfId);
    }

    const handleOnShelfChangeBook = (book, fromShelfId, toShelfId) => {
        onShelfChangeBook(book, fromShelfId, toShelfId)
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelves.map(shelf => (
                        <div key={shelf.id} className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.name}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {
                                        shelf.books.map((book, index) => (

                                            <li key={index}>
                                                <Book id={book.id} title={book.title} author={book.author}
                                                      imagePath={book.imagePath} shelfId={shelf.id}
                                                      onShelfChange={handleOnShelfChangeBook}/>
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