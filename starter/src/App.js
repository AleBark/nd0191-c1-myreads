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
                    title: "To Kill a Mockingbird",
                    author: "Harper lee",
                    imagePath: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
                },
                {
                    title: "Ender's Game",
                    author: "Orson Scott Card",
                    imagePath: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
                }
            ]
        },
        {
            id: 2, name: "Want to Read", books: [
                {
                    title: "1776",
                    author: "David McCullough",
                    imagePath: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"
                },
                {
                    title: "Harry Potter and the Sorcerer's Stone",
                    author: "J.K. Rowling",
                    imagePath: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"
                },
            ]
        },
        {
            id: 3, name: "Read", books: [
                {
                    title: "The Hobbit",
                    author: "J.R.R. Tolkien",
                    imagePath: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
                },
                {
                    title: "Oh, the Places You'll Go!",
                    author: "Seuss",
                    imagePath: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"
                },
            ]
        }
    ]);


    function onAddBook(book, shelfId) {
        const shelfIndex = shelves.findIndex(shelf => shelf.id === shelfId);
        const shelf = {...shelves[shelfIndex]};
        shelf.books.push(book);
        shelves.splice(shelfIndex, 1, shelf);
        setShelves([...shelves]);
    }

    function onRemoveBook(book, shelfId) {
        const shelfIndex = shelves.findIndex(shelf => shelf.id === shelfId);
        const shelf = {...shelves[shelfIndex]};
        const bookIndex = shelf.books.findIndex(book => book.title === book.title)

        shelf.books.splice(bookIndex, 1, shelf.books);
        setShelves([...shelves]);
    }

    function onShelfChangeBook(book, shelfId) {
        //TODO implement change shelf logic
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
                    onAddBook={onAddBook}
                    onRemoveBook={onRemoveBook}
                    shelves={shelves}
                    setShowSearchPage={setShowSearchPage}
                    showSearchPage={showSearchPage}
                />
            )}
        </div>
    );
}

export default App;
