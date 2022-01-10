import { TextField } from "@material-ui/core";
import { useState,useEffect } from "react";
import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from "axios";
import SingleContent from "./SingleContent.js"
import CustomPagination from "./CustomPagination.js";
import { makeStyles } from '@material-ui/styles';

const Search = () => {
    
    const [TrendingData, setData] = useState([]);
    const api_key = process.env.REACT_APP_API_KEY;
    const [currentPage,setCurrentPage] = useState(1);
    const [total_pages,setTotalPages] = useState(0);
    const [type,setType] = useState(0);
    const [searchResult,setSearchResult] = useState("");

    const handleChange = (event)=>{
        setSearchResult(event.target.value);
    }

    const useStyles = makeStyles({
        tabs: {
      
          "& .MuiTabs-indicator": {
            backgroundColor: "white",
          },
          "& .MuiTab-root.Mui-selected": {
            color: 'white'
          },
          "& .MuiTab-root": {
            color: 'white'
          },
          "& .MuiTabs-flexContainer ": {
            justifyContent : "center"
          }
        }
      })

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
        try {
            var results = ""
            if(searchResult !== "")
            {
                results = await axios("https://api.themoviedb.org/3/search/"+(type ? "tv" : "movie")+"?language=en-US&include_adult=false", {
                    params: {
                        api_key: api_key,
                        page : currentPage,
                        query : searchResult,
                    }
                });
                setData(results.data.results);
                setTotalPages(results.data.total_pages);
            }    
        }
        catch (err) {
        console.log(err);
        }
    }
    useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage,api_key,total_pages,type])

    const classes = useStyles();

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
                    <Button color="secondary" onClick={fetchData} variant = "contained" style={{marginLeft:10}}> <SearchIcon fontSize="large" /> </Button>
                </div>
                <Tabs 
                value={type} 
                onChange = {(event,newValue)=>{
                    setType(newValue);
                    setCurrentPage(1);
                }}
                className={classes.tabs}
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