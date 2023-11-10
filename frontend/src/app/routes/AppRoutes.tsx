import { Route, Routes } from "react-router-dom";
import { StartPage } from "../layout/start/StartPage";
import { SignUp } from "../layout/signUp/SignUp";
import { Login } from "../layout/login/Login";
import { ExpenseList } from "../layout/expenseList/ExpenseList";
import { ExpenseChart } from "../layout/expenseChart/ExpenseChart";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<StartPage/>} />
            <Route path='/expenseList' element={<ExpenseList/>} />
            <Route path='/expenseChart' element={<ExpenseChart/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signUp' element={<SignUp/>} />
        </Routes>
    )
};