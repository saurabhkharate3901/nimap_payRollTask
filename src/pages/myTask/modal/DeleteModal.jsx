import React, { useState } from 'react'
import { Box, Button, Divider, Modal } from '@mui/material';
import styles from "./Style.module.scss"
import privateGet from "../../../services/privateRequest"
import { DELETE_TASK } from '../../../services/apiEndPoints'
import toast from '../../../components/toast/toast';




function DeleteModal({ open, handleClose,taskId,getData }) {

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async() => {
        setIsLoading(true)
        const res = await privateGet(DELETE_TASK, {
            taskId: taskId
        })
        if(res) {
            toast.success("Task deleted successfully")
            getData();
            handleClose();
        }
        setIsLoading(false)
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={styles.mainDiv}>
                <div className={styles.heading}>Delete Task</div>
                {/* <Divider/> */}
                <div className={styles.content}> Do you want to delete this Task?</div>
                <Divider />
                <div className={styles.btnContainer}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={()=>handleDelete()}
                    >
                        Delete
                    </Button>
                </div>
            </Box>

        </Modal>
    )
}

export default DeleteModal