import "./App.css";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import BookSearchBar from "./components/BooksSearchBar";
import BookList from "./components/BooksList";
import AddBookButton from "./components/AddBookButton";
import * as BooksAPI from "./BooksAPI"
import BooksGrid from "./components/BooksGrid";

function App() {
    let navigate = useNavigate();

    const [showSearchPage, setShowSearchPage] = useState(false);
    const [shelvesFromApi, setShelvesFromApi] = useState({});
    const [bookSearchResults, setBookSearchResults] = useState([]);

    const [shelves, setShelves] = useState([
        {
            id: "currentlyReading", name: "Currently Reading", books: []
        },
        {
            id: "wantToRead", name: "Want to Read", books: []
        },
        {
            id: "read", name: "Read", books: []
        },
    ]);

    useEffect(() => {
        setShelves(JSON.parse(window.localStorage.getItem('shelves')));
        setShelvesFromApi(JSON.parse(window.localStorage.getItem('shelvesFromApi')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('shelves', JSON.stringify(shelves));
        window.localStorage.setItem('shelvesFromApi', JSON.stringify(shelvesFromApi));
    }, [shelves, shelvesFromApi]);

    function onAddBook(currentBook, shelfId) {
        const shelfIndex = shelves.findIndex(shelf => shelf.id === shelfId);
        const shelf = {...shelves[shelfIndex]};
        const isBookAlreadyOnShelf = checkIfBookIsAlreadyOnShelf(currentBook, shelfIndex)

        if (isBookAlreadyOnShelf !== -1) {
            alert("This book is already on the selected shelf")
            return
        }

        shelf.books.push(currentBook);
        shelves.splice(shelfIndex, 1, shelf);

        setShelves([...shelves]);
    }

    function onRemoveBook(currentBook, shelfId) {
        const shelfIndex = shelves.findIndex(shelf => shelf.id === shelfId);
        const shelf = {...shelves[shelfIndex]};
        const bookIndex = shelf.books.findIndex(book => book.id === currentBook.id)
        shelf.books.splice(bookIndex, 1);


        setShelves([...shelves]);
    }

    function onUpdateBooksShelfFromApi(shelves) {
        setShelvesFromApi(shelves);
    }

    function onShelfChangeBook(currentBookId, fromShelfId, toShelfId) {
        const fromShelfIndex = shelves.findIndex(shelf => shelf.id === fromShelfId);
        const toShelfIndex = shelves.findIndex(shelf => shelf.id === toShelfId);
        const getBookFromApi = async (currentBookId) => {
            return await BooksAPI.get(currentBookId)
        };
        const updateBookShelfFromApi = async (book, toShelfId) => {
            return await BooksAPI.update(book, toShelfId)
        }

        if (bookIsBeingRemovedFromShelves(toShelfId)) {
            getBookFromApi(currentBookId).then((book) => {
                onRemoveBook(treatBookObject(book), fromShelfId)
                return book;
            }).then((book) => {
                updateBookShelfFromApi(book, toShelfId).then(shelves => onUpdateBooksShelfFromApi(shelves))
            });
        }

        if (bookIsBeingAddFromApi(fromShelfId)) {
            getBookFromApi(currentBookId).then((book) => {
                onAddBook(treatBookObject(book), toShelfId)
                return book;
            }).then((book) => {
                updateBookShelfFromApi(book, toShelfId).then(shelves => onUpdateBooksShelfFromApi(shelves))
            });
        }

        if (bookIsBeingMovedBetweenShelves(fromShelfId, toShelfId)) {
            const book = shelves[fromShelfIndex].books.find(book => book.id === currentBookId)
            const isBookAlreadyOnShelf = checkIfBookIsAlreadyOnShelf(book, toShelfIndex)

            if (isBookAlreadyOnShelf !== -1) {
                alert("This book is already on the selected shelf")
                return
            }

            onRemoveBook(book, fromShelfId)
            onAddBook(book, toShelfId)
            updateBookShelfFromApi(book, toShelfId).then(shelves => onUpdateBooksShelfFromApi(shelves))
        }

    }

    function bookIsBeingMovedBetweenShelves(fromShelfId, toShelfId) {
        return (fromShelfId !== "none") && (toShelfId !== "none");
    }

    function bookIsBeingAddFromApi(fromShelfId) {
        return fromShelfId === "none";
    }

    function bookIsBeingRemovedFromShelves(toShelfId) {
        return toShelfId === "none";
    }

    function checkIfBookIsAlreadyOnShelf(currentBook, shelfIndex) {
        return shelves[shelfIndex].books.findIndex(book => book.id === currentBook.id)
    }

    function resolveShelfByApiResults(currentBookId) {
        let selectedShelf = "none";
        Object.keys(shelvesFromApi).forEach(shelf => {
            if (shelvesFromApi[shelf].includes(currentBookId)) {
                selectedShelf = shelf;
            }
        });

        return selectedShelf;
        //     // {
        //     //     "currentlyReading": [
        //     //     "nggnmAEACAAJ",
        //     //     "sJf1vQAACAAJ",
        //     //     "ycTADgAAQBAJ",
        //     //     "PKpPCwAAQBAJ"
        //     // ],
        //     //     "wantToRead": [
        //     //     "evuwdDLfAyYC",
        //     //     "74XNzF_al3MC"
        //     // ],
        //     //     "read": [
        //     //     "jAUODAAAQBAJ",
        //     //     "IOejDAAAQBAJ",
        //     //     "1wy49i-gQjIC"
        //     // ]
        //     // }
        //     //
        //
        //     if (currentShelf.includes(currentBoookId)) {
        //         return true;
        //     }

    }

    function treatBookObject(rawBook) {
        return {
            id: rawBook.id,
            title: rawBook.title ?? 'Unknown',
            author: (rawBook && rawBook.authors) ? rawBook.authors.join(',') : 'Unknown',
            shelfId: resolveShelfByApiResults(rawBook.id),
            imagePath: (rawBook && rawBook.imageLinks) ? rawBook.imageLinks.thumbnail : ''
        }
    }

    function treatApiResults(results) {
        let treatedResults = [];
        if (results && results.length) {
            if (!results.hasOwnProperty('error')) {
                results.forEach(function (result) {
                    treatedResults.push(treatBookObject(result));
                })
            }
        }

        return treatedResults;
    }

    function onBooksSearch(event) {
        const searchTerm = event.target.value;
        const getBooks = async (searchTerm) => {
            return await BooksAPI.search(searchTerm)
        };

        getBooks(searchTerm).then((results) => {
            const treatedResults = treatApiResults(results)
            setBookSearchResults(treatedResults)
        })
    }

    function onOpenSearchPage() {
        navigate("/search");
    }

    function onCloseSearchPage() {
        navigate("/");
        setBookSearchResults([]);
    }

    return (
        <div className="app">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <BookList
                            shelves={shelves}
                            onShelfChangeBook={onShelfChangeBook}
                            setShowSearchPage={setShowSearchPage}
                            showSearchPage={showSearchPage}
                        />
                    }
                />
                <Route
                    path="/search"
                    element={
                        <BookSearchBar
                            onCloseSearchPage={onCloseSearchPage}
                            onBooksSearch={onBooksSearch}
                            booksSearchResult={bookSearchResults}
                            onShelfChangeBook={onShelfChangeBook}
                        />
                    }
                />
            </Routes>
            <div className="open-search">
                <AddBookButton onOpenSearchPage={onOpenSearchPage}/>
            </div>
            <BooksGrid booksFromAPI={bookSearchResults} onShelfChangeBook={onShelfChangeBook}/>
        </div>
    );
}

export default App;