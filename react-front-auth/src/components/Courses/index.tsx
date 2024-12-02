import { useSelector } from "react-redux";
import { AppLayout } from "../Layout/AppLayout"
import { CourseItem, Courses } from "./table"
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
import { BaseFilter } from "../BaseFilter";


// Define the context shape
interface ContextType {
  userIds: Array<string | number>;
  setUserIds: React.Dispatch<React.SetStateAction<Array<string | number>>>;
}

// Create the context with default values
export const R = createContext<ContextType>({
  userIds: [],
  setUserIds: () => {}
});

// Provide the context to your application
export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userIds, setUserIds] = useState<Array<string | number>>([]);

  return (
    <R.Provider value={{ userIds, setUserIds }}>
      {children}
    </R.Provider>
  );
};


export const CoursesIndex = () => {


    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
 
    const user_permissions: string[] = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("courses.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>(false);

    const [data, setData] = useState<CourseItem[]>([]);

    const fetchData = async () => {
        
        const response =  await Api.get('/courses?include=user,institution', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'    
        })

        const result: CourseItem[] = await response.data

        if(response.statusCode === 200) {
            setError(false);
            setData(result)
            setLoading(false);
        }else{
            setError(true);
            navigate(-1)
        }
    }

    useEffect(() => {fetchData()}, [])

    const users = (data.map(item => item.user).filter(item => item != null)); // filters both null and undefined
    return (<AppLayout>
        {
            error && <div className="mt-12"> <MessageToast message='Ha ocurrido un error' type="error"/></div>
        }
        {
            loading && <div className="mt-12"> <MessageToast message='Cargando...' type="loading"/></div> 
        }
        {
        !error && !loading && data &&    
                    <div className="mt-20">
                    <ContextProvider>
                    <BaseFilter users={users}/>
                    <Courses courses={data}/>
                        </ContextProvider>
                    </div>
        }
        </AppLayout>
    )
}