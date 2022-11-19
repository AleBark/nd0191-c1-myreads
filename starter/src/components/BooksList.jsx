import AddBookButton from "./AddBookButton";
import PropTypes from "prop-types";
import BooksShelf from "./BooksShelf";

const BooksList = ({setShowSearchPage, showSearchPage, shelves, onShelfChangeBook}) => {

    const handleOnShelfChangeBook = (bookId, fromShelfId, toShelfId) => {
        onShelfChangeBook(bookId, fromShelfId, toShelfId)
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {shelves.map(shelf => (
                        <BooksShelf shelf={shelf} handleOnShelfChangeBook={handleOnShelfChangeBook}/>
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
    onShelfChangeBook: PropTypes.func.isRequired
};

export default BooksList;