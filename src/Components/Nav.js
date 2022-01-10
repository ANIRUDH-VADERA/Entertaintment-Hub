import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useEffect,useState } from 'react';
import {useNavigate} from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    if(value===0)
    {
        navigate("/");
    }
    if(value===1)
    {
        navigate("/Movies");
    }
    if(value===2)
    {
        navigate("/Series");
    }
    if(value===3)
    {
        navigate("/Search");
    }
  },[value,navigate])

  return (
    <Box sx={{ 
        backgroundColor : "#2d313a !important",
        width: "100%",
        position : "fixed",
        bottom : 0,
        zIndex : 100,
         }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
        style={{ 
            color : "white"
         }}
        label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction 
        style={{ 
            color : "white"
         }}
        label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction 
        style={{ 
            color : "white"
         }}
        label="TV Series" icon={<TvIcon />} />
      <BottomNavigationAction 
        style={{ 
            color : "white"
         }}
        label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}