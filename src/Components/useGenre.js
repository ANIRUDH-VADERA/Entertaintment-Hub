const useGenre = (selectedGenre)=>{
    if(selectedGenre.length<1)
    {
        return "";
    }
    else 
    {
        const GenreIDs = selectedGenre.map((item)=>item.id);
        return GenreIDs.reduce((acc,curr)=>acc+","+curr);
    }
}

export default useGenre;