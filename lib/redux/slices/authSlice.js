const { createSlice } = require("@reduxjs/toolkit")

const initialState={
    isLoading:false,
    isSuccess:false,
    isError:false
}

const createAuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetRegister:(state)=>{
            Object.assign(state,initialState)
        }
    },
    extraReducers:(builder)=>{
        
    }
})

export const { resetRegister } = createAuthSlice.actions
export default createAuthSlice.reducer;