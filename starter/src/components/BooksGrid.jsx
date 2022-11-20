import Book from "./Book";

const BookGrid = ({booksFromAPI, onShelfChangeBook}) => {

    const handleOnShelfChangeBook = (bookId, fromShelfId, toShelfId) => {
        onShelfChangeBook(bookId, fromShelfId, toShelfId)
    }
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    booksFromAPI.length ? booksFromAPI.map((book, index) => (
                        <li key={index}>
                            <Book id={book.id} title={book.title} author={book.author}
                                  imagePath={book.imagePath} shelfId={0}
                                  onShelfChange={handleOnShelfChangeBook}/>
                        </li>
                    )) : <li>Sorry, no results found :(</li>
                }
            </ol>
        </div>
    )
}
export default BookGrid;