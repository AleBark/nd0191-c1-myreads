import "./App.css";
import {useState} from "react";
import BookSearchBar from "./components/BooksSearchBar";
import BookList from "./components/BooksList";

function App() {
    const [showSearchPage, setShowSearchPage] = useState(false);

    return (
        <div className="app">
            {showSearchPage ? (
                <BookSearchBar setShowSearchPage={setShowSearchPage} showSearchPage={showSearchPage}/>
            ) : (
                <BookList />
            )}
        </div>
    );
}

export default App;
