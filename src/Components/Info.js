import { Box, Typography } from "@mui/material";
import React from "react";

const Info = () => {


    return (
        <Box sx={{borderLeft:{
            md:"1px dashed gray",
            xs:0
            }, 
            borderTop:{
                xs: "1px dashed gray",
                md:0
            }
            ,p:3}}>

            <Typography color="primary" variant="h5">
                MET BANK'a hoşgeldiniz. 
            </Typography>

            <Typography sx={{mt:3}}>Bu sayfada, yandaki forma bilgilerinizi girerek aldığınız kredi için geri ödeme planı oluşturabilirsiniz. Kar oranı aylık olarak hesaplanmıştır</Typography>

            <Typography sx={{mt:3}} color="secondary" variant="h6">
                BSMV ve KKDF nedir?
            </Typography>

            <Typography sx={{mt:2}}>
            Banka ve Sigorta Muameleleri Vergisi (BSMV) ve Kaynak Kullanımını Destekleme Fonu (KKDF) vergileri kredinin brüt tutarı üzerinden kesilen vergilerdir
            </Typography>

            <Typography sx={{mt:2}}>
            Türkiyede KKDF ve BSMV vergilerinin oranları sırasıyla 15 ve 5'tir. Konut kredilerinde ise bu vergiler tahsil edilmemektedir
            </Typography>

            <Typography sx={{mt:2}}>
            Eğer Konut kredisi alıyorsanız BSMV ve KKDF kutularına 0 yazabilirsiniz. 
            </Typography>

            <Typography sx={{mt:2}}>
            Bunların dışında farklı oranlar da girebilirsiniz
            </Typography>

        </Box>
    );
} 

export default Info