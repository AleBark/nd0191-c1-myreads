const AddBookButton = ({setShowSearchPage, showSearchPage}) => {
    return (
        <a onClick={() => setShowSearchPage(!showSearchPage)}>Add a book</a>
    )
}

export default AddBookButton;