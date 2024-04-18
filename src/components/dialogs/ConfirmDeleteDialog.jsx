import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Button } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({ open, handleClose, deleteHandle }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button color='error' onClick={deleteHandle}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog