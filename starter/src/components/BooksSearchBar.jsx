import BooksGrid from "./BooksGrid";

const BookSearchBar = ({onCloseSearchPage}) => {

    const handleOnCloseSearchPage = (e) => {
        e.preventDefault()
        onCloseSearchPage()
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    href="/#"
                    className="close-search"
                    onClick={(e) => handleOnCloseSearchPage(e)}
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