import React, { useState } from 'react'
import styles from "./Style.module.scss"
import { Box, Button, Divider, Modal } from '@mui/material';
import { privatePost } from '../../../services/privateRequest';
import { UPDATE_TASK_STATUS } from '../../../services/apiEndPoints';
import toast from '../../../components/toast/toast';

function Complete({ open, handleClose,taskId,getData }) {

  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async() => {
    setIsLoading(true)
    const res = await privatePost(UPDATE_TASK_STATUS, {
        TaskId: taskId,
        TaskStatusValue: 100,
    })
    if(res) {
        toast.success("Task Completed Successfully")
        getData()
    }
    setIsLoading(false)
};

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box className={styles.mainDiv}>
            <div className={styles.heading}>Complete Task</div>
            {/* <Divider/> */}
            <div className={styles.content}>Are you sure this Task is complete?</div>
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
                    onClick={()=>handleComplete()}
                >
                    Yes
                </Button>
            </div>
        </Box>

    </Modal>
)
}

export default Complete