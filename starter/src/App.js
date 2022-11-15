import "./App.css";
import {useState} from "react";
import BookSearchBar from "./components/BooksSearchBar";
import BooksShelf from "./components/BooksShelf";

function App() {
    const [showSearchPage, setShowSearchpage] = useState(false);

    return (
        <div className="app">
            {showSearchPage ? (
                <BookSearchBar setShowSearchPage={setShowSearchpage} showSearchPage={showSearchPage}/>
            ) : (
                <BooksShelf/>
            )}
        </div>
    );
}

export default App;
