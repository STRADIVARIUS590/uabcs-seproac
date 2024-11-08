import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
interface ProjectItem {
    id: string | number;
    name: string | undefined;
    description: string | undefined;
    user_id: string | number | undefined;
    objetives: string | undefined;
    colaborators: string | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
    type: string | undefined;
    period: string | undefined;
    user: {
        name: string | undefined
    }
}
export const AddEditForm = () => {
    
      // MIDDLEWARE
    const { token, user } = useSelector((state: RootState) => state.auth);
    
    const { id } = useParams<{ id?: string }>();
    
    const navigate = useNavigate();
    
    const user_permissions = user?.all_permissions || [];

    if (!user || user_permissions.indexOf("congresses.edit") === -1) {
        navigate("/dashboard");
    }

    // INITIALIZE
   
    const [isLoading, setLoading] = useState<boolean>(true);

    return <div>FORm</div>
}