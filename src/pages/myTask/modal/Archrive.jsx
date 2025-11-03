import React, { useState } from 'react'
import styles from "./Style.module.scss"
import { Box, Button, Divider, Modal } from '@mui/material';
import { privatePost } from "../../../services/privateRequest"
import { ARCHIVE_TASK } from '../../../services/apiEndPoints'
import toast from '../../../components/toast/toast';
import { set } from 'react-hook-form';

function Achrive({ open, handleClose,taskId,getData }) {

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async() => {
    setIsLoading(true);
    const res = await privatePost(ARCHIVE_TASK, {
        taskId: taskId,
        IsArchive:true
    })
    if(res) {
        toast.success("Task deleted successfully")
        getData();
        handleClose();
    }
    setIsLoading(false);
};

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box className={styles.mainDiv}>
            <div className={styles.heading}>Achrive</div>
            {/* <Divider/> */}
            <div className={styles.content}> Do you want to archive this Task?</div>
            <Divider />
            <div 
            className={styles.btnContainer}
            >
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
                    onClick={() => handleDelete()}
                >
                    Yes
                </Button>
            </div>
        </Box>

    </Modal>
)
}

export default Achrive