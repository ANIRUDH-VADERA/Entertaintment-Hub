import React, { useEffect } from "react";
import axios from "axios";
import Chip from '@mui/material/Chip';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@material-ui/core/styles';

const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

const Genres = (props) => {
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const results = await axios("https://api.themoviedb.org/3/genre/"+props.type+"/list?language=en-US", {
                params: {
                    api_key: api_key,
                }
            });
        props.setGenres(results.data.genres);
        }
        catch (err) {
        console.log(err);
        }
    }
        fetchData();

        return ()=>{
            props.setGenres({});    
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api_key])

    const handleAdd = (genre)=>{
        props.setSelectedGenres([...props.selectedGenres , genre]);
        props.setGenres(
            props.genres.filter((item)=>(item.id !== genre.id))
        );
        props.setCurrentPage(1);
    }
    
    const handleRemove = (genre)=>{
        props.setGenres([...props.genres , genre]);
        props.setSelectedGenres(
            props.selectedGenres.filter((item)=>(item.id !== genre.id))
        );
        props.setCurrentPage(1);
    }

    return ( 
        <div style={{padding : "6px 0"}}>
        {props.selectedGenres &&  (props.selectedGenres).map((item)=>{
            return(
                <ThemeProvider theme={darkTheme} key={item.id}>
                    <Chip 
                        key={item.id}
                        label = {item.name}
                        style = {{margin : 2}}
                        clickable
                        size = "small"
                        color = "primary"
                        onDelete={()=>{handleRemove(item)}}
                    />
                </ThemeProvider>
            )
        })}
        {props.genres &&  (props.genres).map((item)=>{
                    return(
                        <ThemeProvider theme={darkTheme} key={item.id}>
                            <Chip 
                                key={item.id}
                                label = {item.name}
                                style = {{margin : 2}}
                                clickable
                                size = "small"
                                onClick={()=>{handleAdd(item)}}
                            />
                        </ThemeProvider>
                    )
                })}
        </div>
     );
}
 
export default Genres;