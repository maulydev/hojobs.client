import React from "react";
import Header from "../Header";
import axios from "../../api";

const Verification = () => {
    // const [formData, setFormData] = React.useState({
    //     name: "",
    //     company: "",
    //     company_location: "",
    //     phone_number: "",
    //     company_telephone: "",
    //     email: "",
    // });
    const [name, setName] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [companyLocation, setCompanyLocation] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [companyTelephone, setCompanyTelephone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [empVerifyStatus, setEmpVerifyStatus] = React.useState("");

    const formHandler = (e) => {
        e.preventDefault();
        axios
            .post("/employer/verify/", {
                name: name,
                company: company,
                company_location: companyLocation,
                phone_number: phoneNumber,
                company_telephone: companyTelephone,
                email: email,
            })
            .then((res) => {
                if (res.status === 202) {
                    setEmpVerifyStatus("Details submitted successfully ✔");
                    window.my_modal_2.showModal();
                }
            })
            .catch((err) => {
                setEmpVerifyStatus(
                    "❌ Oops ☹, Kindly crosscheck the informations provided for accuracy, It may already have been submitted"
                );
                window.my_modal_2.showModal();
            });
    };

    return (
        <div>
            <Header title="Verification" />
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box text-center">
                    <p className="py-4">{empVerifyStatus}</p>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            <section className="container mx-auto mt-8 text-center p-2 md:p-4">
                <h3 className="text-2xl font-black my-2">
                    Submit details for verification.
                </h3>
                <p className="text-lg max-w-md mx-auto">
                    A verification code will be sent via phone/email as you're
                    verified within 5 business working days!
                </p>
                <form
                    onSubmit={formHandler}
                    className="my-4 flex flex-col lg:grid  grid-cols-2 gap-4 max-w-lg mx-auto"
                >
                    <input
                        onChange={(e) => setName(e.target.value)}
                        name="emp_name"
                        required
                        type="text"
                        placeholder="employer name"
                        className="input input-bordered w-full"
                    />
                    <input
                        onChange={(e) => setCompany(e.target.value)}
                        name="org_name"
                        required
                        type="text"
                        placeholder="organization name"
                        className="input input-bordered w-full"
                    />
                    <input
                        onChange={(e) => setCompanyLocation(e.target.value)}
                        name="org_location"
                        required
                        type="text"
                        placeholder="company location"
                        className="input input-bordered w-full"
                    />
                    <input
                        onChange={(e) => setCompanyTelephone(e.target.value)}
                        name="org_phone"
                        required
                        type="tel"
                        placeholder="organization telephone"
                        className="input input-bordered w-full"
                    />
                    <input
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        name="emp_phone"
                        required
                        type="tel"
                        placeholder="employer phone number"
                        className="input input-bordered w-full"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        required
                        type="email"
                        placeholder="email"
                        className="input input-bordered w-full"
                    />
                    <button className="btn btn-neutral col-span-2">
                        Submit
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Verification;
