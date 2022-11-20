const BookSearchBar = ({onCloseSearchPage, onBooksSearch}) => {

    const handleOnCloseSearchPage = (e) => {
        e.preventDefault()
        onCloseSearchPage()
    }

    const handleBooksSearch = (e) => {
        onBooksSearch(e)
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
                        onChange={(e) => handleBooksSearch(e)}
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
        </div>
    )
}
export default BookSearchBar;