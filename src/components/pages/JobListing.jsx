import React from "react";
import Header from "../Header";
import JobCard from "../JobCard";
import axios from "../../api";
import { Link, useParams } from "react-router-dom";

const JobListing = () => {
    const [jobs, setJobs] = React.useState([]);
    const [original_jobs, setOrignalJobs] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [typeFilter, setTypeFilter] = React.useState("");
    const [categoryFilter, setCategoryFilter] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [pageCount, setPageCount] = React.useState();

    const { job_type, job_category } = useParams();

    console.log(job_type);
    console.log(job_category);

    React.useEffect(() => {
        axios
            .get("/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, []);

    const getJobs = () => {
        axios
            .get(
                `/jobs?page=${page}${
                    job_type
                        ? "&type=" + job_type
                        : job_category
                        ? "&category=" + job_category
                        : ""
                }`
            )
            .then((res) => {
                setPageCount(Math.ceil(res.data.count / 5));
                setJobs(res.data.results);
                setOrignalJobs(res.data.results);
            });

        console.log(pageCount);
    };

    React.useEffect(() => {
        getJobs();
    }, [page, job_type, job_category]);

    // const filterHandler = (e) => {
    //     if (e.target.accessKey === "job_type") {
    //         if (e.target.innerText === "All") {
    //             setJobs(original_jobs);
    //             return;
    //         }
    //         const elText = e.target.innerText;
    //         const filtered_jobs = original_jobs.filter(
    //             (job) => job.job_type === elText
    //         );
    //         setJobs(filtered_jobs);
    //     } else {
    //         const elText = e.target.innerText;
    //         const filtered_jobs = original_jobs.filter(
    //             (job) => job.job_category === elText
    //         );
    //         setJobs(filtered_jobs);
    //     }
    // };

    const searchHandler = (e) => {
        e.preventDefault();

        const titleResult = original_jobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const locationResult = original_jobs.filter((job) =>
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const requirementsResult = original_jobs.filter((job) =>
            job.requirements.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (titleResult.length !== 0) {
            setJobs(titleResult);
        } else if (locationResult.length !== 0) {
            setJobs(locationResult);
        } else {
            setJobs(requirementsResult);
        }
    };

    return (
        <div>
            <Header showForm={false} title="Find Jobs in Ho" />
            <main className="grid md:grid-cols-3 container mx-auto">
                <section className="space-y-4 col-span-2 p-4 overflow-y-auto h-scree">
                    {jobs?.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                    {jobs.length === 0 ? (
                        <div className="text-lg text-slate-500">
                            No Jobs Available
                        </div>
                    ) : (
                        ""
                    )}
                </section>
                <aside className="p-4">
                    <form
                        onSubmit={searchHandler}
                        className="flex flex-col lg:flex-row gap-2"
                    >
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="input input-sm input-bordered w-full rounded-none"
                        />
                        <button className="btn btn-neutral btn-sm rounded-none">
                            Search
                        </button>
                    </form>
                    <section className="mt-4 space-y-4">
                        <div className="collapse collapse-arrow">
                            <input type="checkbox" />
                            <div className="collapse-title font-medium border-b mb-4">
                                Job Type
                            </div>
                            <div className="collapse-content">
                                <div className="[&>*]:link-hover [&>*]:cursor-pointer flex flex-col gap-2">
                                    <Link to="/jobs/type/Full-time">
                                        Full-time
                                    </Link>
                                    <Link to="/jobs/type/Part-time">
                                        Part-time
                                    </Link>
                                    <Link to="/jobs/type/Contract">
                                        Contract
                                    </Link>
                                    <Link to="/jobs/type/Internship">
                                        Internship
                                    </Link>
                                    <Link to="/jobs/type/NSS Internship">
                                        NSS Internship
                                    </Link>
                                    {/* <p
                                        accessKey="job_type"
                                        onClick={filterHandler}
                                    >
                                        All
                                    </p>
                                    <p
                                        accessKey="job_type"
                                        onClick={filterHandler}
                                    >
                                        Full-time
                                    </p>
                                    <p
                                        accessKey="job_type"
                                        onClick={filterHandler}
                                    >
                                        Part-time
                                    </p>
                                    <p
                                        accessKey="job_type"
                                        onClick={filterHandler}
                                    >
                                        Contract
                                    </p>
                                    <p
                                        accessKey="job_type"
                                        onClick={filterHandler}
                                    >
                                        Internship
                                    </p>
                                    <p
                                        accessKey="job_type"
                                        onClick={filterHandler}
                                    >
                                        NSS Internship
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow">
                            <input type="checkbox" />
                            <div className="collapse-title font-medium border-b mb-4">
                                Category
                            </div>
                            <div className="collapse-content">
                                <div className="flex flex-col gap-2 [&>*]:link-hover [&>*]:cursor-pointer">
                                    {categories?.map((category) => (
                                        <Link
                                            to={`/jobs/category/${category.title}`}
                                            key={category.id}
                                        >
                                            {category.title}
                                        </Link>
                                        // <p
                                        //     accessKey="job_category"
                                        //     key={category.id}
                                        //     onClick={filterHandler}
                                        // >
                                        //     {category.title}
                                        // </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </aside>
                {jobs.length !== 0 ? (
                    <div className="join mx-auto col-span-2 mb-8">
                        <button
                            onClick={() => page > 1 && setPage(page - 1)}
                            className={`${
                                page === 1 ? "btn-disabled" : ""
                            } text-lg join-item btn rounded-none btn-neutral`}
                        >
                            «
                        </button>
                        <button className="join-item px-4 select-none font-medium">
                            Page {page} of {pageCount}
                        </button>
                        <button
                            onClick={() =>
                                page < pageCount && setPage(page + 1)
                            }
                            className={`${
                                page === pageCount ? "btn-disabled" : ""
                            } text-lg join-item btn rounded-none btn-neutral`}
                        >
                            »
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </main>
        </div>
    );
};

export default JobListing;
