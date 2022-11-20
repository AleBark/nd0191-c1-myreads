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

    const [shelves, setShelves] = useState([
        {
            id: 1, name: "Currently Reading", books: [
                {
                    id: 1,
                    title: "To Kill a Mockingbird",
                    author: "Harper lee",
                    imagePath: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
                },
                {
                    id: 2,
                    title: "Ender's Game",
                    author: "Orson Scott Card",
                    imagePath: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
                }
            ]
        },
        {
            id: 2, name: "Want to Read", books: [
                {
                    id: 3,
                    title: "1776",
                    author: "David McCullough",
                    imagePath: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
                },
                {
                    id: 4,
                    title: "Harry Potter and the Sorcerer's Stone",
                    author: "J.K. Rowling",
                    imagePath: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
                },
            ]
        },
        {
            id: 3, name: "Read", books: [
                {
                    id: 5,
                    title: "The Hobbit",
                    author: "J.R.R. Tolkien",
                    imagePath: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
                },
                {
                    id: 6,
                    title: "Oh, the Places You'll Go!",
                    author: "Seuss",
                    imagePath: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
                },
                {
                    id: 7,
                    title: "The Adventures of Tom Sawyer",
                    author: "Mark Twain",
                    imagePath: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"
                },
            ]
        }
    ]);

    const [bookSearchResults, setBookSearchResults] = useState([]);

    useEffect(() => {
        setShelves(JSON.parse(window.localStorage.getItem('shelves')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('shelves', JSON.stringify(shelves));
    }, [shelves]);

    function onAddBook(currentBook, shelfId) {
        const shelfIndex = shelves.findIndex(shelf => shelf.id === shelfId);
        const shelf = {...shelves[shelfIndex]};
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

    function onShelfChangeBook(currentBookId, fromShelfId, toShelfId) {
        const fromShelfIndex = shelves.findIndex(shelf => shelf.id === fromShelfId);
        const toShelfIndex = shelves.findIndex(shelf => shelf.id === toShelfId);

        const book = shelves[fromShelfIndex].books.find(book => book.id === currentBookId)

        const isBookAlreadyOnShelf = checkIfBookIsAlreadyOnShelf(book, toShelfIndex)

        if (isBookAlreadyOnShelf !== -1) {
            alert("This book is already on the selected shelf")
            return
        }

        onRemoveBook(book, fromShelfId)
        onAddBook(book, toShelfId)
    }

    function checkIfBookIsAlreadyOnShelf(currentBook, shelfIndex) {
        return shelves[shelfIndex].books.findIndex(book => book.id === currentBook.id)
    }

    function treatApiResults(results) {
        let treatedResults = [];
        if (results && results.length) {
            if (!results.hasOwnProperty('error')) {
                results.forEach(function (result) {
                    let bookObj = {
                        id: parseInt(result.id),
                        title: result.title ?? 'Unknown',
                        author: (result && result.authors) ? result.authors.join(',') : 'Unknown',
                        imagePath: (result && result.imageLinks) ? result.imageLinks.thumbnail : ''
                    }
                    treatedResults.push(bookObj);
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