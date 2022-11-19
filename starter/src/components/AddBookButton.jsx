const AddBookButton = ({onOpenSearchPage}) => {

    const handleOnOpenSearchPage = (e) => {
        e.preventDefault()
        onOpenSearchPage()
    }

    return (
        <a
            href="/#"
            className="open-search"
            onClick={(e) => handleOnOpenSearchPage(e)}
        >
            Close
        </a>
    )
}

export default AddBookButton;