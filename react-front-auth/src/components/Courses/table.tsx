import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
import Button from "../Buttons/Button";
import { R } from ".";

interface Props {
    courses: CourseItem[];
}

export interface CourseItem {
    id: string | number;
    user_id: string | number;
    institution_id: string | undefined | null;
    total_hours: number | string | undefined;
    name: string | undefined;
    total_students: number | string | undefined;
    educative_level: number | string | undefined;
    period: number | string | undefined;
    start_date: number | string | undefined;
    end_date: number | string | undefined;
    user: {
        id: string;
        name: string;
    };
    institution: {
        id: string;
        name: string;
    };
}

export const Courses = ({ courses }: Props) => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const user_permissions: string[] = user?.all_permissions || [];

    const [canDelete, setCanDelete] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);

    const [data, setData] = useState<CourseItem[]>(courses);

    const context = useContext(R); // Using context for filtering
    const { userIds } = context; // Access user IDs from context

    useEffect(() => {
        if (!user || user_permissions.indexOf("courses.get") === -1) {
            navigate(-1);
        }

        if (user && user_permissions.indexOf("courses.destroy") > -1) {
            setCanDelete(true);
        }

        if (user && user_permissions.indexOf("courses.edit") > -1) {
            setCanEdit(true);
        }
    }, [user, user_permissions, navigate]);

    useEffect(() => {
        if (userIds.length > 0) {
            setData(courses.filter(course => userIds.includes(course.user_id))); // Apply filtering
        } else {
            setData(courses); // Reset to all courses when no filter is applied
        }
    }, [userIds, courses]); // Run effect when userIds or courses change

    const deleteCourse = async (id: number | string) => {
        const response = await Api.delete(`/courses/${id}`, {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
        });

        if (response.statusCode === 200) {
            const updatedData = data.filter(course => course.id !== id);
            setData(updatedData);
        } else {
            console.error("Error deleting course");
        }
    };

    if (!data.length) {
        return <MessageToast message="No courses available" type="info" />;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1>Cursos</h1>
            <table className="w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        <th scope="col" className="px-6 py-3">Nombre</th>
                        <th scope="col" className="px-6 py-3">Horas</th>
                        <th scope="col" className="px-6 py-3">Estudiantes</th>
                        <th scope="col" className="px-6 py-3">Nivel educativo</th>
                        <th scope="col" className="px-6 py-3">Fecha de Inicio</th>
                        <th scope="col" className="px-6 py-3">Fecha de Fin</th>
                        <th scope="col" className="px-6 py-3">Institución</th>
                        <th scope="col" className="px-6 py-3">Usuario</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(course => (
                        <tr
                            key={course.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.id}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.total_hours}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.total_students}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.educative_level}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.start_date}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.end_date}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.institution.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {course.user?.name}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <Button
                                    value="Eliminar"
                                    onClick={() => deleteCourse(course.id)}
                                    className={
                                        canDelete || user?.id === course.user_id
                                            ? "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            : "hidden"
                                    }
                                    disabled={!canDelete && user?.id !== course.user_id}
                                />
                                <Button
                                    value="Editar"
                                    onClick={() => navigate(`/courses/edit/${course.id}`)}
                                    className={
                                        canEdit || user?.id === course.user_id
                                            ? "text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                                            : "hidden"
                                    }
                                    disabled={!canEdit && user?.id !== course.user_id}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
