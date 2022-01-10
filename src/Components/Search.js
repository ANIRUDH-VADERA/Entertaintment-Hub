import { TextField } from "@material-ui/core";
import { useState,useEffect } from "react";
import useGenre from "./useGenre.js";
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import SingleContent from "./SingleContent.js"
import CustomPagination from "./CustomPagination.js";

const Search = () => {
    
    const [TrendingData, setData] = useState([]);
    const [isPending, setPending] = useState(true);
    const [isError, setError] = useState(false);
    const [api_key,setAPI] = useState(process.env.REACT_APP_API_KEY);
    const [currentPage,setCurrentPage] = useState(1);
    const [total_pages,setTotalPages] = useState(0);
    const [selectedGenres,setSelectedGenres] = useState([]);
    const [genres,setGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);
    const [type,setType] = useState(0);
    const [searchResult,setSearchResult] = useState("");

    const handleChange = (event)=>{
        setSearchResult(event.target.value);
    }

    const
     darkTheme = createTheme({
        palette: {
          type: "dark",
          primary : {
              main : "#ffffff",
          },
        },
      });

      const fetchData = async () => {
        setError(false);
        try {
            const results = await axios("https://api.themoviedb.org/3/search/"+(type ? "tv" : "movie")+"?language=en-US&include_adult=false", {
                params: {
                    api_key: api_key,
                    page : currentPage,
                    query : searchResult,
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

      useEffect(() => {
        fetchData();
    }, [currentPage,api_key,total_pages,type])

    return ( 
        <div>
            <ThemeProvider theme={darkTheme} >
                <div style={{display : "flex",margin : "15px 0 "}}>
                    <TextField 
                    style={{flex:1}}
                    label="Search" 
                    variant="filled"
                    className="searchBox"
                    onChange={handleChange}
                    />
                    <Button color="primary" onClick={fetchData} variant = "contained" style={{marginLeft:10}}> <SearchIcon fontSize="large" /> </Button>
                </div>
                <Tabs 
                value={type} 
                indicatorColor = "primary" 
                textColor = "primary"
                onChange = {(event,newValue)=>{
                    setType(newValue);
                    setCurrentPage(1);
                }}
                style={{paddingBottom : 5}}
                aria-label="disabled tabs example"
                >
                    <Tab style={{width : "50%"}} label = "Search Movies" />
                    <Tab style={{width : "50%"}} label = "Search Tv Series" />
                </Tabs>
            </ThemeProvider>
            <div className="trending">
                {TrendingData && TrendingData.map((item)=>{
                    return(
                    <SingleContent key = {item.id}
                        id={item.id}
                        poster = {item.poster_path}
                        title = {item.title || item.name}
                        date = {item.date || item.release_date}
                        media_type = {type ? "tv" : "movie"}
                        vote_average = {item.vote_average}
                    />
                    )
                })}
                {searchResult && !TrendingData && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2> )}
            </div>
            {total_pages>1 && <CustomPagination setCurrentPage = {setCurrentPage} count={total_pages} color="primary" page={currentPage} />}
            
        </div>
     );
}
 
export default Search;