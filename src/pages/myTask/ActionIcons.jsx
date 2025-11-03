import React, { useState } from 'react'
import styles from "./ActionIcons.module.scss"
import Icons from './Icons';
import DeleteModal from './modal/DeleteModal';
import Archrive from './modal/Archrive'
import ViewTaskCoverage from './modal/ViewTaskCoverage'
import Complete from './modal/Complete'
import PartialComplete from './modal/PartialComplete'
import Accept from './modal/Accept';
import { privatePost } from '../../services/privateRequest';
import { UPDATE_TASK_STATUS } from '../../services/apiEndPoints';
import toast from '../../components/toast/toast';


const iconsUrl = {
    archieve: "https://qa.fieldforceconnect.com/assets/media/task/TaskArchive.svg",
    accept: "https://qa.fieldforceconnect.com/assets/media/task/TaskAccept.svg",
    viewTaskCoverage: "https://qa.fieldforceconnect.com/assets/media/task/TaskViewTaskCoverage.svg",
    delete: "https://qa.fieldforceconnect.com/assets/media/task/TaskDelete.svg",
    complete: "https://qa.fieldforceconnect.com/assets/media/task/TaskComplete.svg",
    partialComplete: "https://qa.fieldforceconnect.com/assets/media/task/TaskPartialComplete.svg"
};

const size = "20px";

// pure function
// what happend when component re-render
// usememo, usecallback
// 

function ActionIcons({ assignedBy, status, id, getData }) {

    const [isLoading, setIsLoading] = useState(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openArchiveModal, setOpenArchiveModal] = useState(false);
    const [openViewTaskCoverageModal, setOpenViewTaskCoverageModal] = useState(false);
    const [openCompleteModal, setOpenCompleteModal] = useState(false);
    const [openPartialCompleteModal, setOpenPartialCompleteModal] = useState(false);
    const [openAcceptModal, setOpenAcceptModal] = useState(false)

    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleOpenArchiveModal = () => setOpenArchiveModal(true);
    const handleCloseArchiveModal = () => setOpenArchiveModal(false);

    const handleOpenViewTaskCoverageModal = () => setOpenViewTaskCoverageModal(true);
    const handleCloseViewTaskCoverageModal = () => setOpenViewTaskCoverageModal(false);

    const handleOpenCompleteModal = () => setOpenCompleteModal(true);
    const handleCloseCompleteModal = () => setOpenCompleteModal(false);

    const handleOpenPartialCompleteModal = () => setOpenPartialCompleteModal(true);
    const handleClosePartialCompleteModal = () => setOpenPartialCompleteModal(false);


    const handleAccept = async () => {
        setIsLoading(true)
        const res = await privatePost(UPDATE_TASK_STATUS, {
            TaskId: id,
            TaskStatusValue: 100,
        })
        if (res) {
            toast.success("Task Completed Successfully")
            getData()
        }
        setIsLoading(false)
    };

    return (
        <>
            <div className={styles.iconsMainConatiner}>
                <div className={styles.actionIcons}>
                    <div onClick={handleOpenArchiveModal}>
                        <Icons
                            srcUrl={iconsUrl.archieve}
                            altText={"Archieve"}
                            size={size}
                            cursorPointer={true}
                        />
                    </div>
                    {status === -1 ?
                        <div onClick={handleAccept}>
                            <Icons
                                srcUrl={iconsUrl.accept}
                                altText={"Accept"}
                                size={size}
                                cursorPointer={true}
                            />
                        </div>
                        : "-"}
                    <div onClick={handleOpenViewTaskCoverageModal}>
                        <Icons
                            srcUrl={iconsUrl.viewTaskCoverage}
                            altText={"View Task Coverage"}
                            size={size}
                            cursorPointer={true}
                        />
                    </div>
                    <div onClick={handleOpenDeleteModal}>
                        <Icons
                            srcUrl={iconsUrl.delete}
                            altText={"Delete"}
                            size={size}
                            cursorPointer={true}
                        />
                    </div>
                    {status >= 0 && status < 100 ? (
                        <>
                            <div onClick={handleOpenCompleteModal}>
                                <Icons
                                    srcUrl={iconsUrl.complete}
                                    altText="Complete"
                                    size={size}
                                    cursorPointer={true}
                                />
                            </div>
                            <div onClick={handleOpenPartialCompleteModal}>
                                <Icons
                                    srcUrl={iconsUrl.partialComplete}
                                    altText="Partial Complete"
                                    size={size}
                                    cursorPointer={true}
                                />
                            </div>
                        </>
                    ): "-"}

                </div>
            </div>

            {openDeleteModal && (
                <DeleteModal
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    taskId={id}
                    getData={getData}
                />
            )}

            {openArchiveModal && (
                <Archrive
                    open={openArchiveModal}
                    handleClose={handleCloseArchiveModal}
                    taskId={id}
                    getData={getData}
                />
            )}

            {openViewTaskCoverageModal && (
                <ViewTaskCoverage
                    open={openViewTaskCoverageModal}
                    handleClose={handleCloseViewTaskCoverageModal}
                    taskId={id}
                />
            )}

            {openCompleteModal && (
                <Complete
                    open={openCompleteModal}
                    handleClose={handleCloseCompleteModal}
                />
            )}

            {openPartialCompleteModal && (
                <PartialComplete
                    open={openPartialCompleteModal}
                    handleClose={handleClosePartialCompleteModal}
                />
            )}

            {/* {openAcceptModal && (
                <Accept
                    open={openAcceptModal}
                    handleClose={handleCloseAcceptModal}
                    taskId={id}
                    getData={getData}
                />
            )} */}
        </>
    );
}

export default ActionIcons;
