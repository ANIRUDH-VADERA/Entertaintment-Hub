import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "./SingleContent.js"
import CustomPagination from "./CustomPagination.js";

const Trending = () => {
    
    const [TrendingData, setData] = useState([]);
    const [isPending, setPending] = useState(true);
    const [isError, setError] = useState(false);
    const [api_key,setAPI] = useState(process.env.REACT_APP_API_KEY);
    const [currentPage,setCurrentPage] = useState(1);
    const [total_pages,setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
        setError(false);
        try {
            const results = await axios("https://api.themoviedb.org/3/trending/all/week", {
                params: {
                    api_key: api_key,
                    page : currentPage
                }
            });
        console.log(results.data.results);
        setData(results.data.results);
        setTotalPages(results.data.total_pages);
        setPending(false);
    }
        catch (err) {
        setPending(false);
        setError(true);
        console.log(err);
        }
    }
        fetchData();
    }, [currentPage,api_key])

    return (  
        <div>
            <span className="pagetitle">Trending</span>
            <div className="trending">
                {TrendingData && TrendingData.map((item)=>{
                    return(
                    <SingleContent key = {item.id}
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
            <CustomPagination setCurrentPage = {setCurrentPage} count={total_pages} color="primary" page={currentPage} />
        </div>
    );
}
 
export default Trending;