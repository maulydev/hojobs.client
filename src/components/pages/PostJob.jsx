import React from "react";
import Header from "../Header";
import axios from "../../api";

const PostJob = () => {
    const [categories, setCategories] = React.useState([]);
    const [veriCodeStatus, setVeriCodeStatus] = React.useState("");
    const [formData, setFormData] = React.useState({
        veriCode: "",
        jobTitle: "",
        jobType: "",
        jobCategory: "",
        companyName: "",
        jobLocation: "",
        salary: "",
        howToApply: "",
        closingDate: "",
        description: "",
        requirements: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/job/", formData)
            .then((res) => {
                if (res.status === 200) {
                    setVeriCodeStatus("😃 Job sumitted successfully!");
                }
            })
            .catch((err) => {
                setVeriCodeStatus(
                    "❌ Oops ☹, " +
                        err.response.data.warning +
                        " " +
                        "_NB: Verification Code can be used or left blank."
                );
            });
        window.my_modal_2.showModal();
    };

    React.useEffect(() => {
        axios
            .get("/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <Header title="Post A Job" />
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box text-center">
                    <p className="py-4">{veriCodeStatus}</p>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <section className="py-8 container mx-auto text-center">
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    className="flex flex-col gap-4 mx-auto bg-white max-w-xl shadow-lg p-8"
                >
                    <input
                        name="veriCode"
                        onChange={handleChange}
                        type="text"
                        placeholder="Verification Code (only verified users) "
                        className="input input-bordered w-full"
                    />
                    <input
                        name="jobTitle"
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Job title"
                        className="input input-bordered w-full"
                    />
                    <select
                        name="jobType"
                        onChange={handleChange}
                        defaultValue="default"
                        className="select select-bordered w-full max-w-lg"
                    >
                        <option value="default" disabled>
                            Choose job type
                        </option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="NSS Internship">NSS Internship</option>
                    </select>
                    <select
                        name="jobCategory"
                        onChange={handleChange}
                        defaultValue="default"
                        className="select select-bordered w-full max-w-lg"
                    >
                        <option value="default" disabled>
                            Choose job category
                        </option>
                        <option value="all">All</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <input
                        name="companyName"
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Company Name"
                        className="input input-bordered w-full"
                    />
                    <input
                        name="jobLocation"
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Job Location"
                        className="input input-bordered w-full"
                    />
                    <input
                        name="salary"
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Salary"
                        className="input input-bordered w-full"
                    />
                    <input
                        name="howToApply"
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="How to apply"
                        className="input input-bordered w-full"
                    />
                    <input
                        name="closingDate"
                        onChange={handleChange}
                        required
                        type="date"
                        className="input input-bordered w-full"
                    />
                    <textarea
                        name="description"
                        onChange={handleChange}
                        className="textarea textarea-bordered"
                        placeholder="Description"
                    ></textarea>
                    <textarea
                        name="requirements"
                        onChange={handleChange}
                        className="textarea textarea-bordered"
                        placeholder="Requirements"
                    ></textarea>
                    <button className="btn btn-block btn-neutral">
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
};

export default PostJob;
