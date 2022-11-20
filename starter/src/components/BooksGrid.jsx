import Book from "./Book";

const BookGrid = ({booksFromAPI, onShelfChangeBook, onShowBookDetails}) => {

    const handleOnShelfChangeBook = (bookId, fromShelfId, toShelfId) => {
        onShelfChangeBook(bookId, fromShelfId, toShelfId)
    }

    const handleOnShowBookDetails = (bookId) => {
        onShowBookDetails(bookId)
    }

    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    booksFromAPI.length ? booksFromAPI.map((book, index) => (
                        <li key={index}>
                            <Book id={book.id} title={book.title} author={book.author}
                                  imagePath={book.imagePath} shelfId={book.shelfId}
                                  onShelfChange={handleOnShelfChangeBook}
                                  onShowBookDetails={handleOnShowBookDetails}
                            />
                        </li>
                    )) : <li/>
                }
            </ol>
        </div>
    )
}
export default BookGrid;