import React, { useEffect, useState } from 'react'
import styles from "./Style.module.scss"
import { Box, Button, Divider, Modal } from '@mui/material';
import { privateGet, privatePost } from '../../../services/privateRequest';
import { USER_TASK_STATUS } from '../../../services/apiEndPoints';
import toast from '../../../components/toast/toast';

function PartialComplete({ open, handleClose,taskId,getData }) {

  const [statusData, setStatusData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    const getStatusData = async() => {
      setIsLoading(true)
        const res = await privateGet(USER_TASK_STATUS, {
            taskId: taskId
        })
        if(res){
            setStatusData(res?.data?.data)
        }
        setIsLoading(false)
    }

    const handleClick = async() => {
      setIsLoading(true)
        const res = await privatePost(UPDATE_TASK_STATUS, {
            TaskId: taskId,
            TaskStatusValue: currentStatus
        })
        if(res){
            toast.success("Task Status Updated Successfully")
            getData()
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getStatusData()
    }, [])

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box className={styles.mainDiv}>
            <div className={styles.heading}>Partial Complete</div>
            {/* <Divider/> */}
            <div className={styles.content}> Do you want to delete this Task?</div>
            <Divider />
            <div  className={styles.btnContainer}>
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
                >
                    Done
                </Button>
            </div>
        </Box>

    </Modal>
)
}

export default PartialComplete