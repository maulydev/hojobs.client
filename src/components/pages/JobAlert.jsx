import React from "react";
import Header from "../Header";
import axios from "../../api";

const JobAlert = () => {
    const [categories, setCategories] = React.useState([]);
    const [email, setEmail] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [subscription, setSubcription] = React.useState({});

    const emailStateHandler = (e) => {
        setEmail(e.target.value);
    };

    const categoryStateHandler = (e) => {
        setCategory(e.target.value);
    };

    const subscriber = () => {
        if (email !== "" || category !== "") {
            axios
                .post("/subscribe/", {
                    email: email,
                    category: category,
                })
                .then((res) => {
                    if (res.status === 200) {
                        setEmail("");
                        setSubcription({
                            title: "Subscribed ✔",
                            body: "Thank you for subscribing to our job alerts!",
                            user: email,
                        });
                        window.my_modal_2.showModal();
                    }
                })
                .catch(() => {
                    setSubcription({
                        title: "Error ❌",
                        body: "Something went wrong, check your email or category!",
                    });
                    window.my_modal_2.showModal();
                });
        } else {
            setSubcription({
                title: "Invalid input! ‼",
                body: "email or category cannot be empty",
            });
            window.my_modal_2.showModal();
        }
    };

    // const resubscriber = () => {
    //     axios
    //         .post("/resubscribe/", {
    //             email: email,
    //         })
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 setEmail("");
    //                 setSubcription({
    //                     title: "Subscribed ✔",
    //                     body: "Thank you for subscribing to our job alerts!",
    //                     user: email,
    //                 });
    //                 window.my_modal_2.showModal();
    //             }
    //         })
    //         .catch(() => {
    //             setSubcription({
    //                 title: "Error ❌",
    //                 body: "Something went wrong, \ncheck your email field & category!",
    //                 user: "",
    //             });
    //             window.my_modal_2.showModal();
    //         });
    // };

    const unsubscriber = () => {
        if (email !== "") {
            axios
                .post("/unsubscribe/", {
                    email: email,
                })
                .then((res) => {
                    setEmail("");
                    if (res.status === 200) {
                        setSubcription({
                            title: "Unsubscribed ✔",
                            body: "😔 Sorry to see you go!",
                            user: email,
                        });
                        window.my_modal_2.showModal();
                    }
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        setSubcription({
                            title: "404 NOT FOUND",
                            body: `${email} not subscribed`,
                        });
                        window.my_modal_2.showModal();
                    }
                });
        } else {
            setSubcription({
                title: "Invalid input! ‼",
                body: "email cannot be empty",
            });
            window.my_modal_2.showModal();
        }
    };

    React.useEffect(() => {
        axios
            .get("/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            <Header title="Job Alerts" />

            <section className="text-center container mx-auto mt-8">
                <dialog id="my_modal_2" className="modal">
                    <form method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">
                            {subscription.title}
                        </h3>
                        <p className="py-4">{subscription.body}</p>
                        <p>{subscription.email}</p>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <h3 className="text-2xl font-black my-2">
                    Subscribe to new job alerts.
                </h3>
                <p className="text-xl">
                    Enter your email below to be notified of new jobs in Ho.{" "}
                    <br /> You can unsubscribe at any time.
                </p>
                <form className="flex flex-col items-center px-2">
                    <div className="form-control w-full max-w-lg my-4 space-y-4">
                        <input
                            value={email}
                            required
                            onChange={emailStateHandler}
                            type="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full max-w-lg"
                        />
                        <select
                            required
                            onChange={categoryStateHandler}
                            defaultValue="default"
                            className="select select-bordered w-full max-w-lg"
                        >
                            <option value="default" disabled>
                                Choose alert category
                            </option>
                            <option value="all">All</option>
                            {categories?.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.title}
                                >
                                    {category.title}
                                </option>
                            ))}
                        </select>
                        <label className="text-sm text-neutral/50">alert category only required for subscription</label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-max">
                        <button
                            onClick={subscriber}
                            type="button"
                            className="btn btn-accent w-full sm:w-max"
                        >
                            Subscribe
                        </button>
                        {/* <button
                            onClick={resubscriber}
                            type="button"
                            className="btn btn-warning w-full sm:w-max"
                        >
                            Resubscribe
                        </button> */}
                        <button
                            onClick={unsubscriber}
                            type="button"
                            className="btn btn-error w-full sm:w-max"
                        >
                            Unsubscribe
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default JobAlert;
