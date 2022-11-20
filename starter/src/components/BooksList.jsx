import PropTypes from "prop-types";
import BooksShelf from "./BooksShelf";

const BooksList = ({shelves, onShelfChangeBook, onShowBookDetails}) => {

    const handleOnShelfChangeBook = (bookId, fromShelfId, toShelfId) => {
        onShelfChangeBook(bookId, fromShelfId, toShelfId)
    }

    const handleOnShowBookDetails = (bookId) => {
        onShowBookDetails(bookId)
    }

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        shelves && shelves.length ?
                            shelves.map(shelf => (
                            <BooksShelf
                                key={shelf.id}
                                shelf={shelf}
                                handleOnShelfChangeBook={handleOnShelfChangeBook}
                                handleOnShowBookDetails={handleOnShowBookDetails}/>
                            ))
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}

BooksList.propTypes = {
    shelves: PropTypes.array.isRequired,
    onShelfChangeBook: PropTypes.func.isRequired,
    onShowBookDetails: PropTypes.func.isRequired
};

export default BooksList;