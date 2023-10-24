import { Route, Routes } from "react-router-dom"
import { StartPage } from "../layout/start/StartPage"
import { AddExpense } from "../layout/addExpense/AddExpense";
import { SignUp } from "../layout/signUp/SignUp";
import { Login } from "../layout/login/Login";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<StartPage/>} />
            <Route path='/addExpense' element={<AddExpense/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signUp' element={<SignUp/>} />
        </Routes>
    )
};