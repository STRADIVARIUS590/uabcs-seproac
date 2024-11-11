import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children } : Props) => {
    return <div>
        <Navbar/>
        {/* <div className="p12"></div> */}
        <main className="p-12">
            { children }
        </main>
        <Footer/>

    </div>
}