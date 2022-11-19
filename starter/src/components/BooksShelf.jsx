import Book from "./Book";

const BooksShelf = ({shelf, handleOnShelfChangeBook}) => {
    return (
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
    )
}
export default BooksShelf;