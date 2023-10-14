import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import axios from "../../api";
import transformDate from "../../datemaker";
import { HiBadgeCheck } from "react-icons/hi";

const JobDetail = () => {
    const { id } = useParams();
    const [jobdetail, setJobdetail] = React.useState({});

    React.useEffect(() => {
        axios
            .get(`/job/${id}`)
            .then((res) => setJobdetail(res.data))
            .catch((err) => log(err));
    }, []);

    return (
        <section>
            <Header title={jobdetail.job_category} />
            <main className="grid md:grid-cols-3 container mx-auto p-4">
                <section className="space-y-4 col-span-2 p-4 bg-white shadow-lg">
                    <h2 className="text-2xl font-bold">{jobdetail.title}</h2>
                    <p>{jobdetail.description}</p>
                    <ul className="space-y-4">
                        <label className="text-lg font-bold">Overview</label>
                        <li>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span> 💼 &nbsp; Job type:</span>{" "}
                            <span>{jobdetail.job_type}</span>
                        </li>
                        <li>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span> 🌏 &nbsp; Location:</span>{" "}
                            <span>{jobdetail.location}</span>
                        </li>
                        <li className="flex gap-1">
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span> 🏢 &nbsp; Company:</span>
                            <span className="flex items-center gap-2">
                                {jobdetail.company}{" "}
                                {jobdetail.verification_code !== "" ? (
                                    <HiBadgeCheck className="text-success text-lg" />
                                ) : (
                                    ""
                                )}
                            </span>
                        </li>
                        <li>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <span> 💰 &nbsp; Salary:</span>{" "}
                            <span>{jobdetail.salary}</span>
                        </li>
                        <li>
                            <span className="text-lg font-bold">
                                Requirements:
                            </span>
                            <p>{jobdetail.requirements}</p>
                        </li>
                        <li>
                            <span className="text-lg font-bold">
                                How to apply:
                            </span>
                            <p>{jobdetail.requirements}</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-lg font-bold">
                                Closing date:
                            </span>
                            <p>{jobdetail.closing_date}</p>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-lg font-bold">Posted:</span>
                            <p>{transformDate(jobdetail.created)}</p>
                        </li>
                    </ul>
                </section>
                <aside className=""></aside>
            </main>
        </section>
    );
};

export default JobDetail;
