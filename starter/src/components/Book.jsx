import PropTypes from "prop-types";

const Book = ({id, title, author, imagePath, shelfId, onShelfChange}) => {

    const handleChange = event => {
        const toShelfId = event.target.value;
        onShelfChange(id, shelfId, toShelfId);
    };

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imagePath})`
                    }}
                />
                <div className="book-shelf-changer">
                    <select name="shelves" value={shelfId} onChange={handleChange}>
                        <option value="shelfId" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">
                            Want to Read
                        </option>
                        <option value="read">
                            Read
                        </option>
                        <option value="none">
                            None
                        </option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author}</div>
        </div>
    )
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
};
export default Book;