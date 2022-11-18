import PropTypes from "prop-types";

const Book = ({title, author, imagePath, shelfName}) => {

    const camelCaseShelfName = shelfName.split(' ').map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');

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
                    <select name="shelves" value={camelCaseShelfName}>
                        <option value="none" disabled>
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
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
};
export default Book;