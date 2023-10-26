import { Route, Routes } from "react-router-dom"
import { StartPage } from "../layout/start/StartPage"
import { AddExpense } from "../layout/addExpense/AddExpense";
import { SignUp } from "../layout/signUp/SignUp";
import { Login } from "../layout/login/Login";
import { ExpenseList } from "../layout/expenseList/ExpenseList";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<StartPage/>} />
            <Route path='/addExpense' element={<AddExpense/>} />
            <Route path='/expenseList' element={<ExpenseList/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signUp' element={<SignUp/>} />
        </Routes>
    )
};