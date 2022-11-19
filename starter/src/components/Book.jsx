import PropTypes from "prop-types";

const Book = ({id, title, author, imagePath, shelfId, onShelfChange}) => {

    const handleChange = event => {
        onShelfChange(id, shelfId, event.target.value);
        console.log(id, shelfId, event.target.value)
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
                        <option value="1">
                            Currently Reading
                        </option>
                        <option value="2">
                            Want to Read
                        </option>
                        <option value="3">
                            Read
                        </option>
                        <option value="4">
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
};
export default Book;