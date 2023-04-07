import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar } from '@mui/material';
import { Api } from '../../../Utils/Api';
import CustomerCard from './CustomerCard';



export default function WaitingCustomers({ token }) {

    const [allTokens, setAllTokens] = React.useState([])


    const getAllTokes = () => {
        try {

            Api.token.getAllTokens().then((data) => {
                console.log(data);
                if (data.length === 0) {
                    return;
                }
                var arr = data.filter((e) => e.tokenId !== token.tokenId);
                
                const uniqueArr = arr.reduce((acc, obj) => {
                    const found = acc.some(item => item.tokenId === obj.tokenId);
                    if (!found) {
                    acc.push(obj);
                    }
                    return acc;
                }, []);
                
                setAllTokens(uniqueArr);
            })

        } catch (error) {

        }
    }

    React.useEffect(() => {
        getAllTokes();
    }, [])




    return (
        <div>

            <Box sx={{ flexGrow: 1, mt: 5 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        allTokens.map((item) => {
                            return <CustomerCard item={item} />
                        })
                    }
                </Grid>
            </Box>
        </div>
    );
}