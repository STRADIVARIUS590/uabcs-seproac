import { AppLayout } from "../Layout/AppLayout"
import { Projects } from "./table"
import { Context } from "../scripts/Context";

export const ProjectsIndex = () => {
    return <AppLayout>
        <div>
            <Context>
                <Projects />
            </Context>
        </div>
    </AppLayout>
}
