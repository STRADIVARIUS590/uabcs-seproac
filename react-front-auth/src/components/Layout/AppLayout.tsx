import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children } : Props) => {
    return <div>
        <Navbar/>
        <main>
            { children }
        </main>
        <Footer/>

    </div>
}