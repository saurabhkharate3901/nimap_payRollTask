import {
  Box,
  Button,
  Divider,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from "./MyTask.module.scss"
import AddTaskModal from './AddTaskModal'
import FilterModal from './FilterModal'
import { getDateStringWithMonth, getUserId, getUserName } from '../../utils/utils'
import { getTaskData, removeFromFilterValues } from '../../redux/slice/MyTaskSlice'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../../components/pagination/Pagination'
import Spinner from '../../components/spinner/Spinner'
import Status from './Status'
import ActionIcons from './ActionIcons'
import { ClearIcon } from '@mui/x-date-pickers'
import { taskData } from '../../utils/data'

const statusOptions = {
  [-1]: "Not Accepted",
  [0]: "Accepted",
  [-2]: "Partial Completed",
  [100]: "Completed",
}

function MyTask() {
  const [open, setOpen] = useState(false)
  const [openFilterModal, setopenFilterModal] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [isNew, setIsNew] = useState(true)
  const [isNew1, setIsNew1] = useState(true)
  const [sortedData, setSortedData] = useState([]);
  // const [filterValues, setFilterValues] = useState({});

  const dispatch = useDispatch();

  const { loading, dataArray, totalCount, filterValues } = useSelector((state) => state.myTask);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenFilterModal = () => {
    setopenFilterModal((prev) => !prev);
  }

  const handleCloseFilterModal = () => {
    setopenFilterModal(false);
  };

  const handleRemove = (key) => {
    dispatch(removeFromFilterValues(key))
  }

 
  const getData = async () => {
    const from = page * rowsPerPage + 1;
    const to = from + rowsPerPage - 1;
    const payload = {
      From: from,
      To: to,
      FromDueDate: "",
      IsArchive: false,
      Priority: "",
      SortByDueDate: "",
      SortColumn: "",
      SortOrder:  "",
      TaskStatus: "",
      Title: "",
      ToDueDate: "",
      UserId: getUserId(),
      UserIds: [],
      ...filterValues,
    };
    dispatch(getTaskData(payload));
  };

  const filteredTaskList = taskData?.TaskList?.filter((row) => {
    const search = searchValue.toLowerCase();
    return (
      row?.Title?.toLowerCase().includes(search) ||
      row?.LeadName?.toLowerCase().includes(search) ||
      row?.AssignedByUserName?.toLowerCase().includes(search) ||
      getDateStringWithMonth(row?.CreateDate)?.toLowerCase().includes(search) ||
      getDateStringWithMonth(row?.TaskEndDate)?.toLowerCase().includes(search) ||
      row?.Priority?.toLowerCase().includes(search)
    );
  });

  const paginatedTaskList = filteredTaskList.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  useEffect(() => {
    !searchValue && getData();
  }, [searchValue, page, rowsPerPage, filterValues]);

  useEffect(() => {
    const x = setTimeout(() => {
      taskData.length && searchValue && getData();
    }, 500);
    return () => {
      clearTimeout(x);
    };
  }, [searchValue]);

  
 


  return (
    <div>
      <Box
        display="flex"
        // justifyContent="space-between"
        alignItems="center"
        gap={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenFilterModal}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Add Task
        </Button>
        <TextField
          sx={{ marginBottom: "20px", width: "25vw" }}
          id="standard-basic"
          label="Search"
          variant="standard"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Box>
      {Object.keys(filterValues).length ? (
        <div className={styles.filterButtonsDisplayDiv}>
          {Object.entries(filterValues).map(
            ([key, val]) =>
              <div className={styles.filterDisplayButtons}>
                <Button variant="contained">{key + " "}<ClearIcon fontSize="100px" onClick={() => handleRemove(key)} /></Button>
                <Button sx={{ width: "max-content" }} variant="outlined">{key === "TaskStatus" ? statusOptions[val] : key === "UserIds" ? getUserName() : val}</Button>
              </div>
          )}
        </div>
      ) : (
        ""
      )}
      <Box sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "20px" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tab label="My Task" />
          <Tab label="CC" />
          <Tab label="Assigned By Me" />
          <Tab label="Archive List" />
          <Tab label="Calendar View" />
        </Tabs>
      </Box>

      <Box sx={{ p: 3 }}>
        {activeTab === 0 && (
          <Box>

            <TableContainer>
              <Table
                sx={{ padding: "10px", overflowX: "scroll" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Assigned By</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}> Assigned Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Due Date </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!loading ? (
                    paginatedTaskList?.length > 0 ? (
                      paginatedTaskList.map((row) => (
                        <TableRow key={row?.TaskId}>
                          <TableCell scope="row">{row?.Title || "-"}</TableCell>
                          <TableCell>{row?.LeadName || "-"}</TableCell>
                          <TableCell>{row?.AssignedByUserName || "-"}</TableCell>
                          <TableCell>{getDateStringWithMonth(row?.CreateDate) || "-"}</TableCell>
                          <TableCell>{getDateStringWithMonth(row?.TaskEndDate) || "-"}</TableCell>
                          <TableCell>{row?.Priority || "-"}</TableCell>
                          <TableCell>
                            <Status num={row?.TaskStatus} />
                          </TableCell>
                          <TableCell>
                            <ActionIcons
                              status={row?.TaskStatus}
                              assignedBy={row?.AssignedByUserName}
                              id={row?.TaskId}
                              getData={getData}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <p className={styles.noDataFound}>No Data Found</p>
                        </TableCell>
                      </TableRow>
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Spinner size={"10vw"} />
                      </TableCell>
                    </TableRow>
                  )}

                </TableBody>
              </Table>
              <Divider />
              <Pagination
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                totalCount={filteredTaskList.length  || 0}
              />
            </TableContainer>
          </Box>
        )}
        {activeTab === 1 && (
          <Typography variant="body1">Content for "CC"</Typography>
        )}
        {activeTab === 2 && (
          <Typography variant="body1">Content for "Assigned By Me"</Typography>
        )}
        {activeTab === 3 && (
          <Typography variant="body1">Content for "Archive List"</Typography>
        )}
        {activeTab === 4 && (
          <Typography variant="body1">Content for "Calendar View"</Typography>
        )}
      </Box>

      {open && (<AddTaskModal
        open={open}
        handleClose={handleCloseModal}
        getData={getData}
      />)}

      {openFilterModal
        && <FilterModal
          open={open}
          handleClose={handleCloseFilterModal}
        />}
    </div>
  )
}

export default MyTask