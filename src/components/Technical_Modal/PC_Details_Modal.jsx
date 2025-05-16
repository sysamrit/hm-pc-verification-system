import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../../style/Modal.css";
import { Commet } from "react-loading-indicators";

function PC_Details_Modal({ toggleContainerHmPc, hm_pc_id, hm_pc_data }) {
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
        if (formData.pc_aadhaar_card_pic) {
            window.open(formData.pc_aadhaar_card_pic, "_blank");
        } else {
            alert("No Aadhaar Card photo available.");
        }
    }

    const clickBankPassbook = () => {
        if (formData.pc_bank_pass_pic) {
            window.open(formData.pc_bank_pass_pic, "_blank");
        } else {
            alert("No Passbook photo available.");
        }
    }

    const clickVerified = async () => {
        const remarks = prompt("Please Enter Remarks");
        if (remarks == null || remarks.trim() == "") {
            alert("Remarks is required");
            return;
        }
        setLoading(true);
        const timestamp = new Date();
        const formatted_date = timestamp.getFullYear() + "-" + (timestamp.getMonth() + 1) + "-" + timestamp.getDate() + " " + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
        const completeData = {
            // ...formData,
            timestamp: formatted_date,
            hm_pc_id: hm_pc_id,
            remarks: remarks,
        };
        await sendRemarks(completeData, "Verified");
        setLoading(false);
        console.log(completeData);
        toggleContainerHmPc();
        window.location.reload();
    }

    const clickReject = async () => {
        const remarks = prompt("Please Enter Remarks");
        if (remarks == null || remarks.trim() == "") {
            alert("Remarks is required");
            return;
        }
        setLoading(true);
        const timestamp = new Date();
        const formatted_date = timestamp.getFullYear() + "-" + (timestamp.getMonth() + 1) + "-" + timestamp.getDate() + " " + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
        const completeData = {
            // ...formData,
            timestamp: formatted_date,
            hm_pc_id: hm_pc_id,
            remarks: remarks,
        };
        await sendRemarks(completeData, "Rejected");
        setLoading(false);
        console.log(completeData);
        toggleContainerHmPc();
        window.location.reload();
    }

    const sendRemarks = async (responseData, status) => {
        const payload = {
            responseData,
            action: status, // Verified or Reject
        };
        console.log(payload);

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL2}/hmpc/sethmpctechver`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();
            console.log("Success:", result);
            alert(result.message);

        } catch (error) {
            console.error("Error sending data:", error);
            alert("An error occurred while sending data. Please try again.");
            setLoading(false);

        }
    };

    const clickClose = () => {
        toggleContainerHmPc();
        // window.location.reload();
    }

    return (hm_pc_data &&
        <>
            <div className='view_container'>
                <div>
                    <h4 className="heading_contant">PC Details</h4>
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
                            <label>PC Name</label>
                            <input type="text" name="pc_name" id="pc_name" value={formData.pc_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>PC Mobile Number</label>
                            <input type="number" name="pc_mobile_no" id="pc_mobile_no" value={formData.pc_mobile_no || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>PC Aadhaar Card Number</label>
                            <input type="text" name="pc_aadhaar_card_no" id="pc_aadhaar_card_no" value={formData.pc_aadhaar_card_no || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="view_btn_container">
                            <button className="view-btn" onClick={clickAadhaar}>View Aadhaar Card Photo </button>
                        </div>
                        <div className="view_btn_container">
                            <button className="view-btn" onClick={clickBankPassbook}>View Bank Passbook Photo </button>
                        </div>
                        <div className="fields">
                            <label>PC Bank Account Number</label>
                            <input type="number" name="pc_bank_account_no" id="pc_bank_account_no" value={formData.pc_bank_account_no || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>PC Bank Name</label>
                            <input type="text" name="pc_bank_name" id="pc_bank_name" value={formData.pc_bank_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>PC Branch Name</label>
                            <input type="text" name="pc_branch_name" id="pc_branch_name" value={formData.pc_branch_name || ""} onChange={handleInputChange} readOnly />
                        </div>
                        <div className="fields">
                            <label>PC IFSC Code</label>
                            <input type="text" name="pc_ifsc_code" id="pc_ifsc_code" value={formData.pc_ifsc_code || ""} onChange={handleInputChange} readOnly />
                        </div>

                        <div className="fields">
                            <label>PC DOB</label>
                            <input type="text" name="dob_of_pc" id="dob_of_pc" value={formData.dob_of_pc || ""} onChange={handleInputChange} readOnly />
                        </div>

                    </div>

                    <div className='button-container'>
                        <button className="accept_btn" type='button' onClick={clickVerified}>
                            Verified
                        </button>

                        <button className="reject_btn" type='button' onClick={clickReject}>
                            Rejected
                        </button>

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


export default PC_Details_Modal