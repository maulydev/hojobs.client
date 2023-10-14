import React from "react";
import { MdLocationPin } from "react-icons/md";
import { FcOrganization, FcLink, FcBriefcase } from "react-icons/fc";
import { Link } from "react-router-dom";
import transformDate from "../datemaker";
import { HiBadgeCheck } from "react-icons/hi";

const JobCard = ({ job }) => {
    // function transformDate(dateString) {
    //     const date = new Date(dateString);
    //     const options = { year: "numeric", month: "short", day: "numeric" };
    //     return date.toLocaleDateString(undefined, options);
    // }

    return (
        <ul className="bg-white shadow p-4 space-y-2">
            <Link
                to={`/jobs/${job.id}`}
                className="text-2xl font-bold flex items-center gap-4"
            >
                {job.title} <FcLink className="link" />
            </Link>
            <li className="flex items-center gap-2"> <FcBriefcase /> {job.job_type}</li>
            <li className="flex items-center gap-2">
                <FcOrganization /> {job.company}{" "}
                {job.verification_code !== "" ? (
                    <HiBadgeCheck className="text-success text-lg" />
                ) : (
                    ""
                )}
            </li>
            <li className="flex items-center gap-2">
                <MdLocationPin className="text-red-500" /> {job.location}
            </li>
            <li className="line-clamp-1 text-slate-600">{job.description}</li>
            <li className="text-slate-500">
                Posted: {transformDate(job.created)}
            </li>
        </ul>
    );
};

export default JobCard;
