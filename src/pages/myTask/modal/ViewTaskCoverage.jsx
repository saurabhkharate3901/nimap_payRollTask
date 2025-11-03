import React, { useEffect, useState } from 'react'
import styles from "./Style.module.scss"
import { Box, Button, Divider, Modal } from '@mui/material';
import { TASK_STATUS_REPORT } from '../../../services/apiEndPoints';
import { privateGet } from '../../../services/privateRequest';
import Spinner from '../../../components/spinner/Spinner';

function ViewTaskCoverage({ open, handleClose,taskId }) {

  const [coverageData, setCoverageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCoverageData = async() => {
    setIsLoading(true)
      const res = await privateGet(TASK_STATUS_REPORT, {
          taskId: taskId
      })
      if(res){
          setCoverageData(res?.data?.data)
      }
      setIsLoading(false)
  }

  useEffect(() => {
      getCoverageData()
  }, [])

  return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box className={styles.mainDiv}>
            <div className={styles.heading}>View Task Coverage</div>
            {/* <Divider/> */}
            <div className={styles.content}>
              <div className={styles.contentText}>
              {
                isLoading ? 
                <Spinner size={"50px"}/>
                :
                (coverageData && Object.entries(coverageData)?.map(([key, val]) => (
                <div className={styles.coverageData}>
                    <span>{key === "Pending" ? "Partial Complete" : key === "Not Started" ? "Not Accepted" : key}</span>
                    <span>{`${val}%`}</span>
                </div>)
            ))}
              </div>
            </div>

            <Divider />
            <div style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
                padding: "14px",
            }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleClose()}
                >
                    Cancel
                </Button>
            </div>
        </Box>

    </Modal>
)
}

export default ViewTaskCoverage