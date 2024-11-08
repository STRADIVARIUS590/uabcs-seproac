import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store";
// import { Navbar } from "../components/Layout/Navbar";
import { AppLayout } from "../components/Layout/AppLayout";
import { useEffect, useState } from "react";
import { Api } from "../services/Api";

// interface WidgetItem {
//     name: string;
//     value: string;
// }

interface Data {
    // name: string | null;
    widgets: {
        projects_count :  number,
        congresses_count: number,
        courses_count: number,
        publications_count: number
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

    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
            console.error("Error fetching dashboard data", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    if (loading) {
        return <p>Loading...</p>; // Return the loading message when loading state is true
    }

    if (!data) {
        return <p>No data available</p>; // Handle case where data is not set yet
    }

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
        <AppLayout>
               
        <h1>Dashboard</h1>

        {/* Widget Container */}
        <div style={widgetContainerStyle}>
          {/* Project Widget */}
          <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Proyectos</div>
            <div style={widgetValueStyle}>{data.widgets.projects_count}</div>
          </div>

          {/* Congress Widget */}
          <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Congresos</div>
            <div style={widgetValueStyle}>{data.widgets.congresses_count}</div>
          </div>

          {/* course Widget */}
          <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Cursos</div>
            <div style={widgetValueStyle}>{data.widgets.courses_count}</div>
          </div>
             {/* Congress Widget */}
          <div style={widgetCardStyle}>
            <div style={widgetTitleStyle}>Publicaciones</div>
            <div style={widgetValueStyle}>{data.widgets.publications_count}</div>
          </div>
          
        </div>

        
            <Outlet />
        </AppLayout>
    );
};

export default BaseDashBoard;
