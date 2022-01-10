import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "./SingleContent.js"
import CustomPagination from "./CustomPagination.js";
import Genres from "./Genres.js";
import useGenre from "./useGenre.js";

const Movies = () => {
    
    const [TrendingData, setData] = useState([]);
    const api_key = process.env.REACT_APP_API_KEY;
    const [currentPage,setCurrentPage] = useState(1);
    const [total_pages,setTotalPages] = useState(0);
    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres,setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);


    useEffect(() => {
        const fetchData = async () => {
        try {
            const results = await axios("https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate", {
                params: {
                    api_key: api_key,
                    page : currentPage,
                    with_genres : genreforURL,
                }
            });
        setData(results.data.results);
        setTotalPages(results.data.total_pages);
        }
        catch (err) {
        console.log(err);
        }
    }
        fetchData();
    }, [currentPage,api_key,total_pages,genreforURL])
    
    return ( 
        <div>
            <span className="pagetitle">Movies</span>
            <Genres 
                key={1}
                type="movie"
                selectedGenres = {selectedGenres}
                genres = {genres}
                setGenres = {setGenres}
                setSelectedGenres = {setSelectedGenres}
                setCurrentPage = {setCurrentPage}
            />
            <div className="trending">
                {TrendingData && TrendingData.map((item)=>{
                    return(
                    <SingleContent 
                        key = {item.id}
                        id={item.id}
                        poster = {item.poster_path}
                        title = {item.title || item.name}
                        date = {item.date || item.release_date}
                        media_type = {item.media_type}
                        vote_average = {item.vote_average}
                    />
                    )
                })}
            </div>
            {total_pages>1 && <CustomPagination setCurrentPage = {setCurrentPage} count={total_pages} color="primary" page={currentPage} />}
            
        </div>
     );
}
 
export default Movies;
