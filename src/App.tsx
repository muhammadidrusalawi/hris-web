import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "@/pages/Welcome.tsx";
import Login from "@/pages/auth/login.tsx";

export default function App(){
    return (
        <Router>
            <Routes>
                {/*  Public routes */}
                <Route path="/" element={<Welcome />} />

                {/*  Auth routes */}
                <Route path="/auth/sign-in" element={<Login />} />
            </Routes>
        </Router>
    )
}