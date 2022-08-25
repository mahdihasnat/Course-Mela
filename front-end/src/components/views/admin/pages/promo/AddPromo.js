import { Box, Container, MenuItem, Stack, TextField, Select, InputLabel, Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import List from '../../components/table/Table';

const promoCategories = [
    { id: "1", name: "Top Viewers" },
    { id: "2", name: "Who joined recently" },
    { id: "3", name: "Who bought courses recently" },
    { id: "4", name: "Who bought 5 or more courses" },
];

const promoOffers = [
    { id: "1", name: "20% discount on Thermo-1" },
    { id: "2", name: "All courses 10% off" },
];

const selectedStudents = [
    { id: "1", name: "Humayun Kabir" },
    { id: "2", name: "Amir Hossain" },
    { id: "3", name: "Golam Mostafa" },
    { id: "4", name: "Ariful Haque" },
    { id: "5", name: "Humayun Kabir" },
    { id: "6", name: "Amir Hossain" },
    { id: "7", name: "Golam Mostafa" },
    { id: "8", name: "Ariful Haque" },
    { id: "9", name: "Humayun Kabir" },
    { id: "10", name: "Amir Hossain" },
    { id: "11", name: "Golam Mostafa" },
    { id: "12", name: "Ariful Haque" },
    { id: "13", name: "Humayun Kabir" },
    { id: "14", name: "Amir Hossain" },
    { id: "15", name: "Golam Mostafa" },
]

function AddPromo() {

    const [nStudents, setNStudents] = useState(0);
    const [promoCat, setPromoCat] = useState("");
    const [promoOff, setPromoOff] = useState("");
    const navigate = useNavigate();

    const handleStudentCountChange = e => {
        setNStudents(e.target.value);
    }

    const handlePromoCatergoriesChange = e => {
        setPromoCat(e.target.value);
    }

    const handlePromoOffersChange = e => {
        setPromoOff(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        navigate("/admin");
    }

    return (
        <Container sx={{ marginTop: 5 }}>
            <Stack>
                <span style={{ fontSize: "1.72rem", textAlign: "center", fontWeight: "bold" }}>Add a Promo</span>
            </Stack>
            <hr />
            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <Box>
                        <TextField
                            label={"No. of Students"}
                            required
                            onChange={handleStudentCountChange}
                        ></TextField>
                    </Box>

                    <Box>
                        <InputLabel id='promoCat-select'>Select Promo Category</InputLabel>
                        <Select
                            labelId='promoCat-select'
                            value={promoCat}
                            label="Select Promo Category"
                            onChange={handlePromoCatergoriesChange}
                        >
                        {
                            promoCategories.map(promoCategory => (
                                <MenuItem key={ promoCategory.id } value={ promoCategory.id }>
                                    {promoCategory.name}
                                </MenuItem>
                            ))
                        }
                        </Select>
                    </Box>

                    <Box>
                        <InputLabel id='promoCat-offer'>Select Promo Offer</InputLabel>
                        <Select
                            labelId='promoCat-offer'
                            value={promoOff}
                            label="Select Promo Category"
                            onChange={handlePromoOffersChange}
                        >
                        {
                            promoOffers.map(promoOffer => (
                                <MenuItem key={ promoOffer.id } value={ promoOffer.id }>
                                    {promoOffer.name}
                                </MenuItem>
                            ))
                        }
                        </Select>
                    </Box>

                    <Box>
                        <Button variant='contained' type='submit'>
                            Submit
                        </Button>
                    </Box>
                </Stack>
            </form>
            <Box sx={{ marginTop: 4 }}>
                <span style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center" }}>List of Such Students</span>
                { nStudents !== 0 && promoCat && <List n={nStudents} rows={ selectedStudents } />}
            </Box>
        </Container>
    )
}

export default AddPromo;