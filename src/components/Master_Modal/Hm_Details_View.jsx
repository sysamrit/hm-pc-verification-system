import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../../style/Modal.css";
import { Commet } from "react-loading-indicators";

function Hm_Details_View({ toggleContainerHmPc, hm_pc_id, hm_pc_data }) {
    console.log(hm_pc_id);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormData(hm_pc_data || {});
    }, [hm_pc_data]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clickAadhaar = () => {
        if (formData.hm_aadhaar_card_pic) {
            window.open(formData.hm_aadhaar_card_pic, "_blank");
        } else {
            alert("No Aadhaar Card photo available.");
        }
    }

    const clickBankPassbook = () => {
        if (formData.hm_bank_pass_pic) {
            window.open(formData.hm_bank_pass_pic, "_blank");
        } else {
            alert("No Passbook photo available.");
        }
    }


    const clickClose = () => {
        toggleContainerHmPc();
        // window.location.reload();
    }

    return (hm_pc_data &&
        <>
            <div className='view_container'>
                <div>
                    <h4 className="heading_contant">HM Details</h4>
                    <hr className="header-line" />
                </div>
                <div className='sub_div'>
                    <div className='lead_details_container'>
                        {loading && (
                            <div className="loading-indicator-container">
                                <Commet color="red" size="medium" text="" textColor="" />
                            </div>
                        )}
                        <div className="fields">
                            <label>Registration Number:</label>
                            <input type='text' name='registration_no' id='registration_no' value={formData.registration_no || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>IHB Name:</label>
                            <input type='text' name='ihb_name' id='ihb_name' value={formData.ihb_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>Executive Name</label>
                            <input type="text" name="executive_name" id="executive_name" value={formData.executive_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>HM Name</label>
                            <input type="text" name="hm_name" id="hm_name" value={formData.hm_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>HM Mobile Number</label>
                            <input type="number" name="hm_mobile_no" id="hm_mobile_no" value={formData.hm_mobile_no || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>HM Aadhaar Card Number</label>
                            <input type="text" name="hm_aadhaar_card_no" id="hm_aadhaar_card_no" value={formData.hm_aadhaar_card_no || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="view_btn_container">
                            <button className="view-btn" onClick={clickAadhaar}>View Aadhaar Card Photo </button>
                        </div>
                        <div className="view_btn_container">
                            <button className="view-btn" onClick={clickBankPassbook}>View Bank Passbook Photo </button>
                        </div>
                        <div className="fields">
                            <label>HM Bank Account Number</label>
                            <input type="number" name="hm_bank_account_no" id="hm_bank_account_no" value={formData.hm_bank_account_no || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>HM Bank Name</label>
                            <input type="text" name="hm_bank_name" id="hm_bank_name" value={formData.hm_bank_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>HM Branch Name</label>
                            <input type="text" name="hm_branch_name" id="hm_branch_name" value={formData.hm_branch_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>HM IFSC Code</label>
                            <input type="text" name="hm_ifsc_code" id="hm_ifsc_code" value={formData.hm_ifsc_code || ""} onChange={handleInputChange} readOnly />
                        </div>

                        <div className="fields">
                            <label>HM DOB</label>
                            <input type="text" name="dob_of_hm" id="dob_of_hm" value={formData.dob_of_hm || ""} onChange={handleInputChange} readOnly />
                        </div>

                    </div>

                    <div className='button-container'>
                        <button className="close_btn"
                            type='button'
                            onClick={clickClose}
                        >
                            Close
                        </button>
                    </div>
                </div>

            </div>
        </>
    );

}
export default Hm_Details_View