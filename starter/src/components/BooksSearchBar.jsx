import BooksGrid from "./BooksGrid";

const BookSearchBar = ({setShowSearchPage, showSearchPage}) => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    className="close-search"
                    onClick={() => setShowSearchPage(!showSearchPage)}
                >
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
            <BooksGrid/>
        </div>
    )
}
export default BookSearchBar;