import Book from "./Book";

const BooksShelf = ({shelf, handleOnShelfChangeBook, handleOnShowBookDetails}) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        shelf.books.length ?
                            shelf.books.map((book, index) => (
                                <li key={index}>
                                    <Book id={book.id} title={book.title} author={book.author}
                                          imagePath={book.imagePath} shelfId={shelf.id}
                                          onShelfChange={handleOnShelfChangeBook}
                                          onShowBookDetails={handleOnShowBookDetails}
                                    />
                                </li>

                            ))
                            :
                            <li>No books in this shelf yet, time to add some!</li>
                    }
                </ol>
            </div>
        </div>
    )
}
export default BooksShelf;