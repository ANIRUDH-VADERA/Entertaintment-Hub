import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@material-ui/core/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

const customPagination = (props) => {
    
    const handlePageChange = (page)=>{
        props.setCurrentPage(page);
        window.scroll(0,0);
    }
    
    return ( 
        <div style={
            {
                width : "100%",
                display : "flex",
                justifyContent : "center",
                marginTop : 10,
            }
        }>
            <Stack spacing={2}>
                <ThemeProvider theme={darkTheme}>
                    <Pagination onChange = {(event,value)=>{handlePageChange(value)}} count={props.count} color={props.color} />
                </ThemeProvider>
            </Stack>
        </div>
     );
}
 
export default customPagination;