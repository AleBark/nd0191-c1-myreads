import PropTypes from "prop-types";
import BooksShelf from "./BooksShelf";

const BooksList = ({shelves, onShelfChangeBook}) => {

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
                        <BooksShelf key={shelf.id} shelf={shelf} handleOnShelfChangeBook={handleOnShelfChangeBook}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

BooksList.propTypes = {
    shelves: PropTypes.array.isRequired,
    onShelfChangeBook: PropTypes.func.isRequired
};

export default BooksList;