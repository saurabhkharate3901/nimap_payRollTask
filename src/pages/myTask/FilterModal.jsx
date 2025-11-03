import React, { useEffect, useMemo, useRef } from 'react'
import styles from "./FilterModal.module.scss"
import { Button, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Form, Formik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dateObjToDateString,getUserId } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { setFilterValues } from '../../redux/slice/MyTaskSlice';


function FilterModal({ open, handleClose }) {
    const { filterValues } = useSelector(state => state.myTask)
    const dispatch = useDispatch();

    const handleChange = (e, name, setFieldValue) => {
        setFieldValue(name, e.target.value);
    };

    //  const initialValues = [{
    //         status: "",
    //         priority: "",
    //         member: "",
    //         fromDueDate: null,
    //         toDueDate: null,
    // }]

    const initialValues = useMemo(() => {
        return !Object.keys(filterValues).length ? {
            status: "",
            priority: "",
            member: "",
            fromDueDate: null,
            toDueDate: null,
        } :
            {
                status: filterValues.TaskStatus,
                priority: filterValues.Priority,
                member: filterValues?.UserIds?.[0],
                fromDueDate: filterValues.FromDueDate ? dayjs(filterValues.FromDueDate) : null,
                toDueDate: filterValues.ToDueDate ? dayjs(filterValues.ToDueDate) : null,
            };
    }, [filterValues])

    const statusOptions = {
        "Not Accepted": -1,
        "Accepted": 0,
        "Partial Completed": -2,
        "Completed": 100,
    }

    const priorityOptions = {
        "Low": "Low Priority",
        "High": "High Priority",
    }

    const handleSubmit = (values, { resetForm }) => {
        const temp = {
            TaskStatus: values.status,
            Priority: values.priority,
            UserIds: values.member ? [values.member] : "",
            FromDueDate: values.fromDueDate ? dateObjToDateString(values.fromDueDate) : null,
            ToDueDate: values.toDueDate ? dateObjToDateString(values.toDueDate) : null,
        }
        dispatch(setFilterValues(temp))
        handleClose();
    };

    return (
        <div className={styles.filterModalDiv}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, touched, errors, setFieldValue, setTouched, resetForm }) => {
                    console.log('values', values)
                    return (
                        <Form>
                            <div className={styles.inputField}>
                                <p className={styles.filterLabel}>By Status</p>
                                <FormControl variant="standard" sx={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Select Status
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={values.status}
                                        onChange={(e) => handleChange(e, "status", setFieldValue)}
                                        onBlur={() => handleBlur("status", touched, setTouched)}
                                        label="Age"
                                    >
                                        {Object?.entries(statusOptions)?.map(([key, val]) => <MenuItem value={val}>{key}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={styles.inputField}>
                                <p className={styles.filterLabel}>By Priority</p>
                                <FormControl variant="standard" sx={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Select Priority
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={values.priority}
                                        onChange={(e) => handleChange(e, "priority", setFieldValue)}
                                        onBlur={() => handleBlur("priority", touched, setTouched)}
                                        label="Age"
                                    >
                                        {Object?.entries(priorityOptions)?.map(([key, val]) => <MenuItem value={key}>{val}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={styles.inputField}>
                                <p className={styles.filterLabel}>By Member</p>
                                <FormControl variant="standard" sx={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-standard-label">
                                        Select Member
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={values.member}
                                        onChange={(e) => handleChange(e, "member", setFieldValue)}
                                        onBlur={() => handleBlur("member", touched, setTouched)}
                                        label="Age"
                                    >
                                        <MenuItem value={getUserId()}>Rijo Varghese</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={styles.doubleFields}>
                                <div className={styles.halfWidthInput}>
                                    <p className={styles.filterLabel}>From Due Date</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputBase-root": {
                                                    padding: 0,
                                                    "& .MuiButtonBase-root": {
                                                        paddingRight: "10px",
                                                        marginBottom: "-10px"
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        paddingTop: "20px",
                                                        paddingLeft: 0,
                                                    }
                                                }
                                            }}
                                            maxDate={values.toDueDate ? dayjs(values.toDueDate) : null}
                                            value={values.fromDueDate}
                                            onChange={(val) => setFieldValue("fromDueDate", val)}
                                            onBlur={() => handleBlur("fromDueDate", touched, setTouched)}
                                            slotProps={{ textField: { variant: 'standard' } }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className={styles.halfWidthInput}>
                                    <p className={styles.filterLabel}>To Due Date</p>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{
                                                width: "100%",
                                                "& .MuiInputBase-root": {
                                                    padding: 0,
                                                    "& .MuiButtonBase-root": {
                                                        paddingRight: "10px",
                                                        marginBottom: "-10px"
                                                    },
                                                    "& .MuiInputBase-input": {
                                                        paddingTop: "20px",
                                                        paddingLeft: 0,
                                                    }
                                                }
                                            }}
                                            minDate={values.fromDueDate ? dayjs(values.fromDueDate) : null}
                                            value={values.toDueDate}
                                            onChange={(val) => setFieldValue("toDueDate", val)}
                                            onBlur={() => handleBlur("toDueDate", touched, setTouched)}
                                            slotProps={{ textField: { variant: 'standard' } }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <br />
                            <Divider />
                            <div className={styles.addTaskModalFooter}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        resetForm()
                                        Object?.keys(filterValues).length && dispatch(clearFilterValues())
                                        handleClose();
                                    }}

                                >
                                    Clear
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    type="submit"
                                >
                                    Apply
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default FilterModal