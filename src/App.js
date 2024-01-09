// App.js
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BookTiles from './components/BookTiles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

function App() {

  const [books, setBooks] = useState([
    {
      name: "The Great Gatsby",
      date: "1925-04-10",
      picture: "https://i0.wp.com/americanwritersmuseum.org/wp-content/uploads/2018/02/CK-3.jpg?resize=267%2C400&ssl=1",
      description: "A novel by F. Scott Fitzgerald about the American Dream during the Roaring Twenties.",
    },
    {
      name: "To Kill a Mockingbird",
      date: "1960-07-11",
      picture: "https://media.glamour.com/photos/56e1f3c462b398fa64cbd304/master/w_1600%2Cc_limit/entertainment-2016-02-18-main.jpg",
      description: "Harper Lee's classic novel dealing with racial injustice and moral growth in the American South.",
    },
    {
      name: "1984",
      date: "1949-06-08",
      picture: "https://149522020.v2.pressablecdn.com/wp-content/uploads/2017/01/2a34d8_a6741e88335241308890543d203ad89dmv2.jpg",
      description: "George Orwell's dystopian novel exploring the dangers of a totalitarian government.",
    },
    {
      name: "The Hobbit",
      date: "1937-09-21",
      picture: "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
      description: "J.R.R. Tolkien's fantasy novel that follows the journey of Bilbo Baggins as he helps dwarves reclaim their homeland.",
    },
    {
      name: "Harry Potter and the Sorcerer's Stone",
      date: "1997-06-26",
      picture: "https://m.media-amazon.com/images/I/71-++hbbERL.jpg",
      description: "J.K. Rowling's first book in the Harry Potter series, introducing the young wizard to the magical world.",
    },
    {
      name: "The Catcher in the Rye",
      date: "1951-07-16",
      picture: "https://cdn.britannica.com/94/181394-050-2F76F7EE/Reproduction-cover-edition-The-Catcher-in-the.jpg",
      description: "J.D. Salinger's novel narrated by the teenage protagonist Holden Caulfield, exploring themes of adolescence and identity.",
    },

  ]);


  const [newBook, setNewBook] = useState({
    name: '',
    date: '',
    picture: '',
    description: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleAddButtonClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };


  const handleAddBook = () => {
    const newBookWithId = { ...newBook, id: Date.now() };
    setBooks((prevBooks) => [...prevBooks, newBookWithId]);
    setNewBook({
      name: '',
      date: '',
      picture: '',
      description: '',
    });
    setShowForm(false); // Close the form after adding a book
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveBook = (bookToRemove) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book !== bookToRemove));
  };

  const [favoriteBooks, setFavoriteBooks] = useState([]);
  
  const handleToggleFavorite = (bookToToggle) => {
    setFavoriteBooks((prevFavoriteBooks) =>
      prevFavoriteBooks.includes(bookToToggle)
        ? prevFavoriteBooks.filter((book) => book !== bookToToggle)
        : [...prevFavoriteBooks, bookToToggle]
    );
  };

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    const isAFavorite = favoriteBooks.includes(a);
    const isBFavorite = favoriteBooks.includes(b);
    return isBFavorite - isAFavorite;
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Personal Book Manager
            </Typography>
            <Search>
              <SearchIcon />
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleSearch}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      <Container sx={{ margin: 0 }}>
        <Typography variant='h4' mt="20px" p={3} >Current Books</Typography>
      </Container>

      <Container maxWidth="xl" sx={{ margin: 0, padding: "3rem", display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
        {sortedBooks.map((book, index) => (
          <BookTiles
            key={index}
            book={book}
            onRemove={handleRemoveBook}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favoriteBooks.includes(book)}
          />
        ))}
      </Container>


      <Container maxWidth="md" sx={{ margin: "2rem auto", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddButtonClick}
        >
          Add New Book
        </Button>


        {showForm && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddBook();
            }}
          >
            <TextField
              label="Book Name"
              name="name"
              value={newBook.name}
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Publication Date"
              name="date"
              value={newBook.date}
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Image URL"
              name="picture"
              value={newBook.picture}
              onChange={handleInputChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={newBook.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              margin="normal"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Book
            </Button>
          </form>
        )}
      </Container>
    </>
  );
}

export default App;
