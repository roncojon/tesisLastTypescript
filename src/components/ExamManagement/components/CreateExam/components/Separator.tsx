import { Box } from '@mui/material'
import React from 'react'

const Separator = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
            <hr style={{ marginTop: '15px', marginBottom: '20px', width: '80%' }} />
        </Box >
    )
}

export default Separator