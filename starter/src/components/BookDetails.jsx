import PropTypes from "prop-types";

const BookDetails = ({lastViewedBook, onCloseDetailsPage}) => {

    const handleOnCloseDetailsPage = (e) => {
        e.preventDefault()
        onCloseDetailsPage()
    }

    const imagePath = lastViewedBook && lastViewedBook.imageLinks ? lastViewedBook.imageLinks.thumbnail : '';
    const authors = (lastViewedBook && lastViewedBook.authors) ? lastViewedBook.authors.join(',') : 'Unknown';

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>{lastViewedBook.title}</h1>
            </div>
            <div className="list-books-content book-cover-details-page">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imagePath})`,
                        cursor: 'pointer',
                    }}
                />
            </div>
            <div className="book-info-details-page">
                <ol>
                    <li>
                        <strong>Subtitle</strong>: {lastViewedBook.subtitle}
                    </li>
                    <li>
                        <strong>Author(s)</strong>: {authors}
                    </li>
                    <li>
                        <strong>Publisher(s)</strong>: {lastViewedBook.publisher}
                    </li>
                    <li>
                        <strong>Publish date</strong>: {lastViewedBook.publishedDate}
                    </li>
                    <li>
                        <strong>Description</strong>: {lastViewedBook.description}
                    </li>
                    <li>
                        <a rel="noreferrer" href={lastViewedBook.previewLink} target="_blank">Preview</a>
                    </li>
                </ol>
            </div>
            <div className="close-details">
                <a
                    href="/#"
                    className="close-search"
                    onClick={(e) => handleOnCloseDetailsPage(e)}
                >
                    Close
                </a>
            </div>
        </div>
    )

}

BookDetails.propTypes = {
    lastViewedBook: PropTypes.object,
    onCloseDetailsPage: PropTypes.func.isRequired
};

export default BookDetails;