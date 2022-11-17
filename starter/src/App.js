import "./App.css";
import {useState} from "react";
import BookSearchBar from "./components/BooksSearchBar";
import BookList from "./components/BooksList";

function App() {
    const [showSearchPage, setShowSearchPage] = useState(false);

    const [shelves, setShelves] = useState([
        {
            id: 1, name: "Currently Reading", books: [
                {
                    id: "Test",
                    title: "Test title",
                    author: "Test author",
                    imagePath: "Test image path"
                }
            ]
        },
        {id: 2, name: "Want to Read", books: []},
        {id: 3, name: "Read", books: []}
    ]);

    const addBookToShelf = (book, shelfId) => {
        const shelf = shelves.find(shelf => shelf.id === shelfId)
        shelf.books.push(book)

        setShelves(shelves)
    }

    return (
        <div className="app">
            {showSearchPage ? (
                <BookSearchBar
                    setShowSearchPage={setShowSearchPage}
                    showSearchPage={showSearchPage}
                />
            ) : (
                <BookList
                    shelves={shelves}
                    setShowSearchPage={setShowSearchPage}
                    showSearchPage={showSearchPage}
                />
            )}
        </div>
    );
}

export default App;
