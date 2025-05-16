import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "../style/tech_dashboard.css";
import logo_img from "../assets/LOGO.png";
import axios from 'axios';
import HM_PC_Details_Modal from '../components/Technical_Modal/HM_PC_Details_Modal';
import PC_Details_Modal from '../components/Technical_Modal/PC_Details_Modal';
import HM_Details_Modal from '../components/Technical_Modal/HM_Details_Modal';

ModuleRegistry.registerModules([AllCommunityModule]);

function TechnicalDashboard() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [hm_pc_id, setHm_pc_id] = useState("");
    const [hmpcData, setHmpcData] = useState();
    const [kycDetails, setKycDetails] = useState("");

    const handleActionClick = (rowData) => {
        setIsVisibleModal(true);
        const hm_pc_id = rowData.hm_pc_id;
        console.log("HM-PC ID:", hm_pc_id);
        setKycDetails(rowData.kyc_details);
        setHm_pc_id(hm_pc_id);
        fetchHm_PcData(hm_pc_id);
    };
    const hideModal = () => {
        setIsVisibleModal(false);
    }


    const fetchHm_PcData = async (hm_pc_id) => {
        console.log(hm_pc_id)
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL2}/hmpc/gethmpcdatabyid/${hm_pc_id}`
            );
            console.log(response.data.data[0]);
            setHmpcData(response.data.data[0]);
        } catch (error) {
            console.error("Error fetching HM-PC data:", error);
        }
    };

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_BASE_URL2}/hmpccrm/gethmpccrmdatabyid/${hm_pc_id}`)
    //         .then((res) => {
    //             console.log(res.data.data);
    //             setFormData(res.data.data[0]);
    //         })
    //         .catch((err) => console.error(err));
    // }, [hm_pc_id]);


    const columnDefs = [
        { headerName: "HM-PC ID", field: "hm_pc_id" },

        {
            headerName: "TimeStamp",
            field: "timestamp",
            width: 250
            // flex: 2  
        },
        { headerName: "Registration No.", field: "registration_no" },
        { headerName: "IHB Name", field: "ihb_name" },
        { headerName: "Executive Name", field: "executive_name" },
        { headerName: "KYC Details", field: "kyc_details" },
        { headerName: "HM Name", field: "hm_name" },
        { headerName: "HM Mobile Number", field: "hm_mobile_no" },
        { headerName: "HM Aadhaar Card Number", field: "hm_aadhaar_card_no" },
        // { headerName: "HM Aadhaar Card Picture", field: "hm_aadhaar_card_pic" },
        {
            headerName: "HM Aadhaar Card Picture",
            field: "hm_aadhaar_card_pic",
            cellRenderer: params => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">View</a>
            )
        },
        { headerName: "HM Bank Account Number", field: "hm_bank_account_no" },
        // { headerName: "HM Bank Passbook Picture", field: "hm_bank_pass_pic" },
        {
            headerName: "HM Bank Passbook Picture",
            field: "hm_bank_pass_pic",
            cellRenderer: params => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">View</a>
            )
        },
        { headerName: "DOB of HM", field: "dob_of_hm" },
        { headerName: "PC Name", field: "pc_name" },

        { headerName: "PC Mobile Number", field: "pc_mobile_no" },
        { headerName: "PC Aadhaar Card Number", field: "pc_aadhaar_card_no" },
        // { headerName: "PC Aadhaar Card Picture", field: "pc_aadhaar_card_pic" },
        {
            headerName: "PC Aadhaar Card Picture",
            field: "pc_aadhaar_card_pic",
            cellRenderer: params => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">View</a>
            )
        },
        { headerName: "PC Bank Account Number", field: "pc_bank_account_no" },
        // { headerName: "PC bank Passbook Picture", field: "pc_bank_pass_pic" },
        {
            headerName: "PC Bank Passbook Picture",
            field: "pc_bank_pass_pic",
            cellRenderer: params => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">View</a>
            )
        },
        { headerName: "DOB of PC", field: "dob_of_pc" },
        { headerName: "HM Bank Name", field: "hm_bank_name" },
        { headerName: "HM Branch Name", field: "hm_branch_name" },
        { headerName: "HM IFSC Code", field: "hm_ifsc_code" },
        { headerName: "PC Bank Name", field: "pc_bank_name" },
        { headerName: "PC Branch Name", field: "pc_branch_name" },
        { headerName: "PC IFSC Code", field: "pc_ifsc_code" },
        { headerName: "Remarks", field: "remarks_crm" },
        { headerName: "Code of HM", field: "code_of_hm" },
        { headerName: "Code of PC", field: "code_of_pc" },
        { headerName: "Status", field: "technical_ver" },
        { headerName: "Verification Date", field: "verify_date" },
        {
            headerName: "Action",
            field: "action",
            cellRenderer: (params) => {
                const isDisabled = params.data.technical_ver === "Verified" || params.data.technical_ver === "Rejected";

                return (
                    <button
                        onClick={() => handleActionClick(params.data)}
                        className='action_btn_tech'
                        disabled={isDisabled}
                    >
                        Action
                    </button>
                );
            }
        }
    ];

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
        // editable: true,
    }), []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL2}/hmpc/gethmpcdata`)
            .then((res) => {
                console.log(res.data.data);
                setRowData(res.data.data);
                // setHm_pc_id(res.data.data.hm_pc_id);
            })
            .catch((err) => console.error(err));
    }, []);


    return (
        <div className='main_container'>
            <div className="logo_content">
                <img
                    src={logo_img}
                    alt="logo"
                />
            </div>
            {/* <div className="underline"></div> */}
            <div className="title">
                <p className="title_t">HM-PC Verification for Technical</p>
            </div>
            <div className="ag-theme-alpine technical_table" style={{ height: '100vh', width: '100%' }}>

                {rowData && <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    theme="legacy"
                    rowSelection="multiple"
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={50}
                />}
            </div>

            {isVisibleModal && kycDetails === "HM" && (
                <HM_Details_Modal
                    toggleContainerHmPc={hideModal}
                    hm_pc_data={hmpcData}
                    hm_pc_id={hm_pc_id}
                />
            )}

            {isVisibleModal && kycDetails === "PC" && (
                <PC_Details_Modal
                    toggleContainerHmPc={hideModal}
                    hm_pc_data={hmpcData}
                    hm_pc_id={hm_pc_id}
                />
            )}
            {isVisibleModal && kycDetails === "Both Of Them" && (
                <PC_Details_Modal
                    toggleContainerHmPc={hideModal}
                    hm_pc_data={hmpcData}
                    hm_pc_id={hm_pc_id}
                />
            )}

        </div>
    );
}

export default TechnicalDashboard