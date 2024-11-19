import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store";
// import { Navbar } from "../components/Layout/Navbar";
import { AppLayout } from "../components/Layout/AppLayout";
import { useEffect, useState } from "react";
import { Api } from "../services/Api";
import { MessageToast } from "../components/MessageToast";

// interface WidgetItem {
//     name: string;
//     value: string;
// }

interface Data {
    publications: {
        count: number;
        tags: {id: string, name: string, publications_count : number}[]
    },
    courses: {
        count: number;
        tags: {id: string, name: string, courses_count : number}[]
    },
    projects: {
        count: number;
        tags: {id: string, name: string, projects_count : number}[]
    },
    congresses: {
        count: number;
        tags: {id: string, name: string, congresses_count : number}[]
    }
 }

const BaseDashBoard = () => {

    const { token, user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const [data, setData] = useState<Data | null >();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const fetchData = async () => {
        
        try {
            const response = await Api.get('/dashboard', {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            })
            
            const result = await response.data; // Assuming response.data is the body
            
            setData(result);

            setLoading(false);


        } catch (error) {
            setLoading(false);
            setError(true);
            // console.error("Error fetching dashboard data", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

  
    if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
    if(loading){     return <MessageToast message='Cargando...' type="loading"/> }


    const widgetContainerStyle = {
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        marginTop: "20px",
     };

    const widgetCardStyle: React.CSSProperties = {
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "45%",
        textAlign: "center", // Ensure 'center', 'left', or 'right' are used
    };
  const widgetTitleStyle = {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
  };

  const widgetValueStyle = {
      fontSize: "24px",
      fontWeight: "600",
      color: "#4CAF50", // Green color for positive metrics
  };
    
    return (            
        <div> <div style={widgetContainerStyle}>
            {/* projects widget */}
           <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Proyectos</div>
            <div style={widgetValueStyle}>{data?.projects?.count}</div>
                {data?.projects?.tags.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.projects_count ?? 0}</p> 
                    </div>
                ))}
          </div> 

                {/* congress widgets */}
          <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Congresos</div>
            <div style={widgetValueStyle}>{data?.congresses?.count ?? 0}</div>
             {data?.congresses?.tags.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.congresses_count ?? 0}</p> 
                    </div>
                ))}
            
          </div> 
                {/* courses widget */}
           <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Cursos</div>
            <div style={widgetValueStyle}>{data?.courses.count ?? 0}</div>
             {data?.courses?.tags.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.courses_count ?? 0}</p> 
                    </div>
                ))}
          </div> 
{           /* publications widget */}
          <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Publicaciones</div>
            <div style={widgetValueStyle}>{data?.publications?.count ?? 0}
                 {data?.publications?.tags.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.publications_count ?? 0}</p> 
                    </div>
                ))}
            </div>
          </div>
          
        </div>
 
            {/* <Outlet /> */}
         </div>

    );
};

export default BaseDashBoard;
