import React, { Children, useState } from "react";
import BaseDashBoard from "../../Layout/BaseDashboard";
import { AcademicGradesTab } from "../AcademicGrades/AcademicGradesTab";

// Tab Component
const Tab = () => {
  const [open, setOpen] = useState("home");

  // Function to handle tab switching
  const handleTabOpen = (tabCategory: string) => {
    setOpen(tabCategory);
  };

  return (
    <>
      <section className="py-4 dark:bg-dark">
        <div className="container">
          <div className="">
            <div className="">
              <div className="mb-14 w-full">
                <div className="flex flex-col flex-wrap rounded-lg border border-[#E4E4E4] px-4 py-3 dark:border-dark-3 sm:flex-row">
                  {/* Home Tab */}
                  <a
                    onClick={() => handleTabOpen("home")}
                    className={`cursor-pointer rounded-lg py-3 text-sm font-medium md:text-base lg:px-6 ${  
                      open === "home"
                        ? " bg-blue-800" // Active tab: white text, primary background
                        : " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    }`}
                  >
                    Dashboard
                  </a>
                
                  <a
                    onClick={() => handleTabOpen("about")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "about"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-red-900 hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Trayectoria Academica
                  </a> 

                  {/* Our Team Tab */}
                  {/* <a
                    onClick={() => handleTabOpen("team")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "team"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-red-900 hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Produccion Academica
                  </a> 

                  {/* Company Details Tab */}
                  {/* <a
                    onClick={() => handleTabOpen("company")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "company"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-red-900 hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Proyectos de Investigacion
                  </a> */}
              

                  {/* Company Details Tab */}
                  {/* <a
                    onClick={() => handleTabOpen("company")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "company"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-red-900 hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Cursos Impartidos
                  </a> */}


                    {/* Company Details Tab */}
                  {/* <a
                    onClick={() => handleTabOpen("company")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "company"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-red-900 hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Participacion en Cogresos
                  </a> */}
                
                  {/* Company Details Tab */}
                  {/* <a
                //     onClick={() => handleTabOpen("company")}
                //     className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                //       open === "company"
                //         ? "bg-primary text-white"
                //         : "text-body-color hover:bg-red-900 hover:text-white dark:text-dark-6 dark:hover:text-white"
                //     }`}
                //   >
                //     Trabajos de Investigacion
                //   </a> */}
                
                </div>

                {/* Tab Content */}
                <TabContent
                  children={<BaseDashBoard/>}
                  // details={'asd'}
                  tabCategory="home"
                  open={open}
                />
                <TabContent
                  // details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! "
                  tabCategory="about"
                  children={<AcademicGradesTab/>}
                  open={open}
                />
                <TabContent
                  details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod.

              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit mollitia nam eligendi reprehenderit reiciendis saepe laboriosam maiores voluptas. Quo, culpa amet fugiat ipsam sed quod hic, veritatis ducimus recusandae repellat quasi eaque, suscipit praesentium totam?"
                  tabCategory="team"
                  open={open}
                />
                <TabContent
                  details="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia nisi, doloribus nulla cumque molestias corporis eaque harum vero! Quas sit odit optio debitis nulla quisquam, dolorum quaerat animi iusto quod."
                  tabCategory="company"
                  open={open}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tab;

// TabContent Component for rendering content based on the active tab
interface Props {
  open: string;
  tabCategory: string;
  details?: string;
  children?: React.ReactNode
}

export const TabContent = ({ open, tabCategory, details, children }: Props) => {
  return (
    <div>
      <div
        className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${
          open === tabCategory ? "block" : "hidden"
        } `}
        >
        {details}
        <div>
           {
            open === tabCategory && children
           } 
            </div>
      </div>
    </div>
  );
};
