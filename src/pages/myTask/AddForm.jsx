import React, { useRef } from 'react'
import styles from "./AddForm.module.scss"
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Form } from 'formik';
import { INITIAL_FILE_LABEL } from '../../utils/constant';
import dayjs from 'dayjs';


function AddForm({ values, errors, touched, setFieldValue, setTouched, fileLabel, setFileLabel, selectOptions, memberOptions, assignToMe }) {

    const fileRef = useRef(null);
    const handleChange = (e, name, setFieldValue) => {
        setFieldValue(name, e.target.value)
    };

    const handleBlur = (name, touched, setTouched) => {
        setTouched({
            ...touched,
            [name]: true
        })
    };

    return (
        <div className={styles.mainContainer}>
            <Form>
                <div className={styles.inputField}>
                    <TextField
                        id="standard-basic"
                        label="Title *"
                        value={values?.title}
                        onChange={(e) => handleChange(e, "title", setFieldValue)}
                        onBlur={() => handleBlur("title", touched, setTouched)}
                        variant="standard"
                        sx={{ width: '100%' }}
                    />
                    {errors.title && touched.title ? <p className={styles.errorText}>{errors.title}</p> : ""}
                </div>
                <div className={styles.inputFieldDescription}>
                    <TextField
                        id="standard-basic"
                        label="Description *"
                        value={values?.description}
                        onChange={(e) => handleChange(e, "description", setFieldValue)}
                        onBlur={() => handleBlur("description", touched, setTouched)}
                        variant="standard"
                        sx={{ width: '100%' }}
                    />
                    {errors.description && touched.description ? <p className={styles.errorText}>{errors.description}</p> : ""}
                </div>
                <div className={styles.inputField}>
                    <input
                        id="fileupload"
                        label="File"
                        variant="standard"
                        ref={fileRef}
                        type='file'
                        onChange={(e) => {
                            setFieldValue("file", e.target.files[0])
                        }}
                        style={{ display: "none" }}
                    />
                    <div className='d-flex'>
                        <label
                            for="fileupload"
                            className={styles.fileLabel}
                            onClick={() => {
                                setTimeout(() => {
                                    handleBlur("file", touched, setTouched)
                                }, 1000);
                            }}
                        >
                            {fileLabel}
                        </label>
                        {fileLabel !== INITIAL_FILE_LABEL ? <span className={styles.removeFile} onClick={(e) => {
                            setFieldValue("file", "")
                            setFileLabel(INITIAL_FILE_LABEL)
                            fileRef.current.value = ""
                        }}>
                            Remove
                        </span> : ""}
                    </div>
                    {errors.file && touched.file ? <p className={styles.errorText}>{errors.file}</p> : ""}
                </div>
                <div className={styles.inputField}>
                    <Autocomplete
                        value={values.customerName}
                        onChange={(event, newValue) => {
                            setFieldValue("customerName", newValue);
                        }}
                        inputValue={values.customerSearchValue}
                        onInputChange={(event, newInputValue) => {
                            setFieldValue("customerSearchValue", newInputValue);
                        }}
                        onBlur={() => handleBlur("customerName", touched, setTouched)}
                        id="controllable-states-demo"
                        options={Object.keys(selectOptions)}
                        // sx={{ width: 300 }}
                        renderInput={(params) => <TextField variant='standard' {...params} label="Customer Name *" />}
                    />
                    {errors?.customerName && touched?.customerName ? <p className={styles.errorText}>{errors?.customerName}</p> : ""}
                </div>
                <div className={styles.inputField}>
                    <p className={styles.dueDateLabel}>Due Date *</p>
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
                        minDate={dayjs(new Date())}
                        value={values.dueDate}
                        onChange={(val) => setFieldValue("dueDate", val)}
                        onBlur={() => handleBlur("dueDate", touched, setTouched)}
                        slotProps={{ textField: { variant: 'standard'}}}
                    />
                    </LocalizationProvider>
                    {errors.dueDate && touched.dueDate ? <p className={styles.errorText}>{errors.dueDate}</p> : ""}
                </div>
                <div className={styles.inputField}>
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-standard-label">Select Priority *</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={values.priority}
                            onChange={e => handleChange(e, "priority", setFieldValue)}
                            onBlur={() => handleBlur("priority", touched, setTouched)}
                            label="Age"
                        >
                            <MenuItem value={"High"}>High Priority</MenuItem>
                            <MenuItem value={"Low"}>Low Priority</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.priority && touched.priority ? <p className={styles.errorText}>{errors.priority}</p> : ""}
                </div>
                {!assignToMe ? <div className={styles.inputField}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        name="users"
                        value={values.users}
                        onChange={(event, newValue) => {
                            setFieldValue("users", newValue);
                        }}
                        inputValue={values.usersSearch}
                        onInputChange={(event, newInputValue) => {
                            setFieldValue("usersSearch", newInputValue);
                        }}
                        onBlur={() => handleBlur("users", touched, setTouched)}
                        options={Object.keys(memberOptions)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Add Users *"
                                placeholder="Users"
                            />
                        )}
                    />
                    {errors.users && touched.users ? <p className={styles.errorText}>{errors.users}</p> : ""}
                </div> : ""}
                <div className={styles.inputField}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        name="members"
                        value={values.members}
                        onChange={(event, newValue) => {
                            setFieldValue("members", newValue);
                        }}
                        inputValue={values.membersSearch}
                        onInputChange={(event, newInputValue) => {
                            setFieldValue("membersSearch", newInputValue);
                        }}
                        onBlur={() => handleBlur("members", touched, setTouched)}
                        options={Object.keys(memberOptions)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Add CC Members *"
                                placeholder="CC Members"
                            />
                        )}
                    />
                    {errors.members && touched.members ? <p className={styles.errorText}>{errors.members}</p> : ""}
                </div>
                <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddForm