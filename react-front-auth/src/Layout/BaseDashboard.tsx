import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { Api } from "../services/Api";
import { MessageToast } from "../components/MessageToast";


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
    const { token } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const [data, setData] = useState<Data | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            const response = await Api.get("/dashboard", {
                Authorization: "Bearer " + token,
                accept: "application/json",
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    if (error) {
        return <MessageToast message="Ha ocurrido un error" type="error" />;
    }
    if (loading) {
        return <MessageToast message="Cargando..." type="loading" />;
    }

    const cards = [
        {
            title: "Producción Académica",
            values: [
                { label: "Artículos", value: data?.projects?.tags[0]?.projects_count ?? 0 },
                { label: "Libros", value: data?.projects?.tags[1]?.projects_count ?? 0 },
                { label: "Capítulos", value: data?.projects?.tags[2]?.projects_count ?? 0 },
            ],
        },
        {
            title: "Proyectos de Investigación",
            values: [
                { label: "Interno", value: data?.projects?.tags[0]?.projects_count ?? 0 },
                { label: "Externo", value: data?.projects?.tags[1]?.projects_count ?? 0 },
            ],
        },
        {
            title: "Cursos Impartidos",
            values: [
                { label: "Licenciatura", value: data?.courses?.tags[0]?.courses_count ?? 0 },
                { label: "Maestría", value: data?.courses?.tags[1]?.courses_count ?? 0 },
                { label: "Doctorado", value: data?.courses?.tags[2]?.courses_count ?? 0 },
            ],
        },
        {
            title: "Participación en Congresos",
            values: [
                { label: "Nacionales", value: data?.congresses?.tags[0]?.congresses_count ?? 0 },
                { label: "Internacionales", value: data?.congresses?.tags[1]?.congresses_count ?? 0 },
            ],
        },
        {
            title: "Trabajos de Titulación",
            values: [
                { label: "Licenciatura", value: data?.publications?.tags[0]?.publications_count ?? 0 },
                { label: "Maestría", value: data?.publications?.tags[1]?.publications_count ?? 0 },
                { label: "Doctorado", value: data?.publications?.tags[2]?.publications_count ?? 0 },
            ],
        },
    ];
    return (
            <div className="bg-white p-10 rounded-lg shadow-lg flex flex-wrap justify-center gap-6 max-w-full w-full">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 w-72 sm:w-80 md:w-80 lg:w-80 xl:w-80">
                        <div className="text-center text-lg font-semibold text-blue-900 border-b-2 border-red-500 pb-2 mb-4">
                            {card.title}
                        </div>
                        {card.values.map((value, i) => (
                            <div key={i} className="text-center text-blue-800 mb-2">
                                <p className="text-lg">{value.label}</p>
                                <p className="text-2xl font-bold">{value.value}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
    );
    
    
};

export default BaseDashBoard;
