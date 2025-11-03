import React from 'react'
import styles from "./Style.module.scss"

function Accept({ open, handleClose,taskId,getData }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={styles.mainDiv}>
                <div className={styles.heading}>Accept</div>
                {/* <Divider/> */}
                <div className={styles.content}> Do you want to archive this Task?</div>
                <Divider />
                <div 
                // style={{
                //     display: "flex",
                //     justifyContent: "end",
                //     gap: "10px",
                //     padding: "14px",
                // }}
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

export default Accept