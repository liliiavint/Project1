import express from 'express';
const app = express();
const port = 3002;

app.use(express.json());
  app.get('/', (req, res) => {
    return res.send('Welcome')
  });

  let movies = [];
  let currentId = 1;

app.post('/movies/item', (req, res) => {
    const { title, productionDate, producer, rating} = req.body;
    const newMovie = { id: currentId++, title, productionDate, producer, rating};
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
    const movieId = +req.params.id;
    const movieIndex = movies.findIndex(u => u.id === movieId);
    
    if (movieIndex !== -1) {
        const deletedMovie = movies.splice(movieIndex, 1)[0]; 
        res.status(200).json({ message: `Movie "${deletedMovie.title}" with id ${movieId} deleted successfully` });;
    } else {
        res.status(404).send('Movie not found');
    }
});

app.get('/movies/', (req, res) => {
  return res.send(JSON.stringify({movies}));
});

app.get('/movies/:id', (req, res) => {
    const movieId = +req.params.id;
    const movie = movies.filter(index => index.id === movieId);
    if (movie.length > 0) {
        res.json(movie);
    } else {
        res.status(404).send('Movie not found');
    }
});

  app.put('/movies/:id', (req, res) => {
    const movieId = +req.params.id;
    const { rating } = req.body;
    const movieIndex = movies.findIndex(index => index.id === movieId);
    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found' });
    }else{ movies[movieIndex].rating = rating;
    res.json(movies[movieIndex]);
  }});

app.get('*', (req, res) => {
    console.log('404');
    return res.send('404 - content not found');
});

app.use((req, res, next) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log(`URL: http://localhost:${port}`);
});
