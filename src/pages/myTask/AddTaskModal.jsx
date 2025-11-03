import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from "./AddTaskModal.module.scss"
import { Divider, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import AddForm from './AddForm';
import { Formik } from 'formik';
import * as Yup from "yup";
import { INITIAL_FILE_LABEL, REQUIRED } from '../../utils/constant';
import { getLeadsData, getMembersData } from '../../redux/slice/MyTaskSlice';
import { ASSIGN_TASK } from '../../services/apiEndPoints';
import toast from '../../components/toast/toast';
import dayjs from 'dayjs';
import { privatePost } from '../../services/privateRequest';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "7.5px",
    boxShadow: 24,
    width: "max-content"
};


export default function AddTaskModal({ open, handleClose, getData }) {

    const [activeTab, setActiveTab] = useState(0);
    const [value, setValue] = useState(0);
    const [label, setLabel] = useState(INITIAL_FILE_LABEL);
    const { leadsData, membersData } = useSelector(state => state.myTask)
    const dispatch = useDispatch();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleBackdropClick = (event) => {
        event.stopPropagation();
    };

    const initialValues = {
        title: "",
        description: "",
        file: "",
        customerName: "",
        customerSearchValue: "",
        dueDate: null,
        priority: "",
        users: [],
        usersSearch: "",
        members: [],
        membersSearch: ""
    };

    const selectOptions = useMemo(() => {
        const temp = leadsData.reduce((acc, item) => {
            acc[item?.LeadName] = item?.Id
            return acc
        }, {})
        return temp
    })

    const memberOptions = useMemo(() => {
        const temp = membersData.reduce((acc, item) => {
            acc[item?.Name] = item?.UserId
            return acc
        }, {})
        return temp
    })

    function getBase64(file) {
        return new Promise((res, rej) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                res(reader.result)
            };
            reader.onerror = function (error) {
                rej(error);
            };
        })
    }

    function formatDateToCustomString(date) {
        return dayjs(date).format("DD MMM YYYY hh:mm A");
    }

    const validationSchema = Yup.object({
        title: Yup.string().required(REQUIRED),
        description: Yup.string().required(REQUIRED),
        file: Yup.mixed()
            .required(REQUIRED)
            .test("fileSize", "File must be less than 2MB", (value) => {
                if (value?.size < 2000000) {
                    setLabel(value.name);
                    return true;
                }
                setLabel(INITIAL_FILE_LABEL);
                return false;
            }),
        customerName: Yup.string().required(REQUIRED),
        priority: Yup.string().required(REQUIRED),
        users: Yup.array().min(1, REQUIRED),
        members: Yup.array().min(1, REQUIRED),
        dueDate: Yup.mixed().required(REQUIRED)
    });

    const validationSchemaMe = Yup.object({
        title: Yup.string().required(REQUIRED),
        description: Yup.string().required(REQUIRED),
        file: Yup.mixed()
            .required(REQUIRED)
            .test("fileSize", "File must be less than 2MB", (value) => {
                if (value?.size < 2000000) {
                    setLabel(value.name);
                    return true;
                }
                setLabel(INITIAL_FILE_LABEL);
                return false;
            }),
        customerName: Yup.string().required(REQUIRED),
        priority: Yup.string().required(REQUIRED),
        members: Yup.array().min(1, REQUIRED),
        dueDate: Yup.mixed().required(REQUIRED)
    });

    const handleSubmit = async (values) => {
        console.log('values', values)
        const submitObj = {
            Id: "",
            AssignedToUserId: "",
            AssignedDate: "",
            CompletedDate: "",
            IntercomGroupIds: [],
            IsActive: true,
            Latitude: "",
            Location: "",
            Longitude: "",
            TaskStatus: "",
        };
        let obj = submitObj;
        const tempFile = await getBase64(values.file)
        const fileFullName = values.file.name.split(".")

        obj.Priority = values.priority;
        obj.Description = values.description;
        obj.Title = values.title;
        obj.TaskOwners = values.members.map(member => ({UserId: memberOptions[member],Name: member }));
        obj.TaskEndDate = formatDateToCustomString(values.dueDate);
        obj.MultimediaData = tempFile;
        obj.MultimediaExtension = "." + fileFullName[1];
        obj.MultimediaFileName = fileFullName[0];
        obj.MultimediaType = fileFullName[1] === "pdf" ? "D" : "I";
        obj.AssignedBy = Number(localStorage.getItem("userId"));
        obj.UserIds = values.users.length ? values.users.map(member => memberOptions[member]) : [obj.AssignedBy];
        obj.LeadId = selectOptions[values.customerName];

        const res = await privatePost(ASSIGN_TASK, obj)
        if (res) {
            toast.success("Task Assigned Successfully");
            getData();
            handleClose();
        }
    };

    useEffect(() => {
        dispatch(getLeadsData());
        dispatch(getMembersData());
    }, []);


    return (
        <Modal
            open={open}
            onClose={handleClose}
            BackdropProps={{
                onClick: handleBackdropClick,
            }}
        >
            <Box sx={style}>
                <div className={styles.addTaskModalHeader}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Task
                    </Typography>
                </div>
                <Divider />
                <div className={styles.addTaskModalBody}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            aria-label="Tabs with active indicator"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Assigned to Others" />
                            <Tab label="Assigned to Me" />
                        </Tabs>
                        <Box>
                            {activeTab === 0 && (
                                <Box sx={{ p: 3 }}>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ values, errors, touched, setTouched, setFieldValue }) => {
                                            console.log("values", values, errors, touched);
                                            return (
                                                <AddForm
                                                    values={values}
                                                    errors={errors}
                                                    touched={touched}
                                                    setFieldValue={setFieldValue}
                                                    setTouched={setTouched}
                                                    fileLabel={label}
                                                    setFileLabel={setLabel}
                                                    selectOptions={selectOptions}
                                                    memberOptions={memberOptions}
                                                />
                                            );
                                        }}
                                    </Formik>
                                </Box>
                            )}
                        </Box>

                        <Box>
                            {activeTab === 1 && (
                                <Box sx={{ p: 3 }}>
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchemaMe}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ values, errors, touched, setTouched, setFieldValue }) => {
                                            console.log("values", values, errors, touched);
                                            return (
                                                <AddForm
                                                    values={values}
                                                    errors={errors}
                                                    touched={touched}
                                                    setFieldValue={setFieldValue}
                                                    setTouched={setTouched}
                                                    fileLabel={label}
                                                    setFileLabel={setLabel}
                                                    selectOptions={selectOptions}
                                                    memberOptions={memberOptions}
                                                    assignToMe={true}
                                                />
                                            );
                                        }}
                                    </Formik>
                                </Box>
                            )}
                        </Box>
                    </Box>

                </div>
                <div className={styles.buttons}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleClose()}
                    >
                        Cancel
                    </Button>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Add
                    </Button> */}
                </div>

            </Box>

        </Modal>
    );
}
