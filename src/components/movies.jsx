import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService'
import {paginate} from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component
{
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: {path: 'title', order: 'asc'}
    }

    componentDidMount() {
        const genres = [{_id: '', name: 'All Genres'}, ...getGenres()]

        this.setState({movies: getMovies(), genres});
    }

    handleDelete = (movie) => {
        const movi = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({movies: movi})
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page})
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    handleSort = (sortColumn) => {
        this.setState({sortColumn})
    }

    getPagedData = () => {

        const allMovies = this.state.movies;

        const filtered = this.state.selectedGenre && this.state.selectedGenre._id ? allMovies.filter(m => m.genre._id === this.state.selectedGenre._id) : allMovies

        const sorted = _.orderBy(filtered, [this.state.sortColumn.path], [this.state.sortColumn.order])

        const movies = paginate(sorted, this.state.currentPage, this.state.pageSize)

        return { totalCount: filtered.length, data: movies}
    }

    render()
    {
        const count = this.state.movies;
        if (count === 0)
        return  <p>There are no movies in the database</p>

        const { totalCount, data: movies} = this.getPagedData();

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies in the database.</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={this.state.sortColumn}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleSort}
                    />
                    <Pagination 
                        itemsCount={totalCount}
                        pageSize={this.state.pageSize} 
                        currentPage={this.state.currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>   
        );                    
    }
}

export default Movies;