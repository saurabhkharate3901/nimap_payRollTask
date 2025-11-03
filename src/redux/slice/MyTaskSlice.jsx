import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { privateGet, privatePost } from "../../services/privateRequest";
import { GET_MEMBERS_DATA, LEADS_DATA, TASKS_ASSIGNED_TO_ME } from "../../services/apiEndPoints";


const initialState = {
    loading: false,
    dataArray: [],
    totalCount: 0,
    leadsData : [],
    membersData: [],
    filterOpen: false,
    filterValues: {},
}

export const getTaskData = createAsyncThunk("myTask/getTaskData", async(payload) => {
    return privatePost(TASKS_ASSIGNED_TO_ME, payload).then(res => res?.data)
})

export const getLeadsData = createAsyncThunk("myTask/getLeadsData", async(payload) => {
    return privatePost(LEADS_DATA,{
        From: 1,
        Text: "",
        To: -1,
        }).then(res => res?.data)
})

export const getMembersData = createAsyncThunk("myTask/getMembersData", async() => {  
     return privateGet(GET_MEMBERS_DATA, {
        from: 1,
        to: 1000
    }).then(res => res?.data)
})


const myTaskSlice = createSlice({
    name: "myTask",
    initialState,
    reducers: {
        openFilterModal: (state) => {
            state.filterOpen = true;
        },
        closeFilterModal: (state) => {
            state.filterOpen = false;
        },
        setFilterValues: (state, action) => {
            state.filterValues = action.payload
        },
        removeFromFilterValues: (state, action) => {
            delete state.filterValues[action.payload]
        },
        clearFilterValues : (state) => {
            state.filterValues = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTaskData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getTaskData.fulfilled, (state, action) => {
            state.loading = false
            state.dataArray = action.payload?.data?.TaskList || []
            state.totalCount = action.payload?.data?.TotalCount
        })
        builder.addCase(getTaskData.rejected, (state) => {
            state.loading = false
            state.dataArray = []
            state.totalCount = 0
        })
        builder.addCase(getLeadsData.fulfilled, (state, action) => {
            state.leadsData = action.payload?.data?.Leads || []
        })
        builder.addCase(getLeadsData.rejected, (state) => {
            state.leadsData = []
        })
        builder.addCase(getMembersData.fulfilled, (state, action) => {
            state.membersData = action.payload?.data?.Members || []
        })
        builder.addCase(getMembersData.rejected, (state) => {
            state.membersData = []
        })
    }
})

export default myTaskSlice.reducer;
export const { 
    openFilterModal, 
    closeFilterModal, 
    setFilterValues,
    removeFromFilterValues, 
    clearFilterValues 
} = myTaskSlice.actions;