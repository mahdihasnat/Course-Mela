import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

function Selection({ labelId, value, label, onChangeHandler, li }) {
  return (
    <Box sx={{ marginTop: 3 }}>
        <FormControl style={{ minWidth: "150px" }}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
            labelID={labelId}
            value={value}
            label={label}
            onChange={onChangeHandler}
        >
            {
                li.map(l => (
                    <MenuItem key={l.id} value={l.id}>
                        {l.name}
                    </MenuItem>
                ))
            }
        </Select>
        </FormControl>
    </Box>
  )
}

export default Selection