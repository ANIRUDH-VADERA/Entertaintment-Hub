import React, { useEffect, useState } from "react";
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
    
    const [isPending, setPending] = useState(true);
    const [isError, setError] = useState(false);
    const [api_key,setAPI] = useState(process.env.REACT_APP_API_KEY);

    useEffect(() => {
        const fetchData = async () => {
        setError(false);
        try {
            const results = await axios("https://api.themoviedb.org/3/genre/"+props.type+"/list?language=en-US", {
                params: {
                    api_key: api_key,
                }
            });
        props.setGenres(results.data.genres);
        setPending(false);
        }
        catch (err) {
        setPending(false);
        setError(true);
        console.log(err);
        }
    }
        fetchData();

        return ()=>{
            props.setGenres({});    
        }

    }, [api_key])
    
    console.log(props.genres);

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
                <ThemeProvider theme={darkTheme}>
                    <Chip 
                        label = {item.name}
                        style = {{margin : 2}}
                        clickable
                        size = "small"
                        key={item.id}
                        color = "primary"
                        onDelete={()=>{handleRemove(item)}}
                    />
                </ThemeProvider>
            )
        })}
        {props.genres &&  (props.genres).map((item)=>{
                    return(
                        <ThemeProvider theme={darkTheme}>
                            <Chip 
                                label = {item.name}
                                style = {{margin : 2}}
                                clickable
                                size = "small"
                                key={item.id}
                                onClick={()=>{handleAdd(item)}}
                            />
                        </ThemeProvider>
                    )
                })}
        </div>
     );
}
 
export default Genres;