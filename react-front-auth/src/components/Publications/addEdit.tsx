// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Api } from "../../services/Api";
// import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { AddEditForm, } from "./addEditForm";
// import { AddEditForm } from "../Congresses/addEditForm";

// interface PublicationItem {
//     id: string;
//     title: string | undefined;
//     user_id: string | undefined;
//     type: string | undefined;
//     issn_isbn: string | undefined;
//     doi: string | undefined;
//     magazine_name : string | undefined;
//     authors: string | undefined;
//     publication_date: string | undefined;
//     period: string | undefined;
//     user: {
//         name: string | undefined
//     }
// }


export const AddEditPublicationPage = () => {

    return <div>
        <AddEditForm/>
    </div>
    
}