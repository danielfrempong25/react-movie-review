import React, { Component } from "react";
import axios from "axios";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.fetchMovies();

    // Start polling for updated data every 5 seconds
    this.pollingInterval = setInterval(this.fetchMovies, 5000);
  }

  componentWillUnmount() {
    // Clear the polling interval before unmounting the component
    clearInterval(this.pollingInterval);
  }

  fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=paENCGu6KsE0c7NwMdbzAsuwEnWxPaoV"
      );

      const data = await response.data.results;

      this.setState({ movies: await data });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        {movies.map((movie, index) => (
          <div key={index} className="movie">
            <p>
              <span className="h3">Title:</span> {movie.display_title}
            </p>
            <p>
              <span className="h3">Byline:</span> {movie.byline}
            </p>
            <p>
              <span className="h3">Critics Pick:</span> {movie.critics_pick}
            </p>
            <p>
              <span className="h3">Headline:</span> {movie.headline}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default React.memo(Movies);
