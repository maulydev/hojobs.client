import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import JobListing from "./components/pages/JobListing";
import PostJob from "./components/pages/PostJob";
import JobAlert from "./components/pages/JobAlert";
import JobDetail from "./components/pages/JobDetail";
import Verification from "./components/pages/Verification";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<JobListing />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/job" element={<PostJob />} />
                <Route path="/subscription" element={<JobAlert />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/jobs/type/:job_type" element={<JobListing />} />
                <Route
                    path="/jobs/category/:job_category"
                    element={<JobListing />}
                />
            </Routes>
        </div>
    );
};

export default App;
