import {Route, Routes} from "react-router";
import LatestTrain from "@/pages/LatestTrain.tsx";
import CreateTrain from "@/pages/CreateTrain.tsx";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LatestTrain />} />
            <Route path="/CreateTrain" element={<CreateTrain/>}/>
        </Routes>
    )
}
export default AppRoutes;