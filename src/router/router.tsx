import React from "react";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import GroupsIcon from '@mui/icons-material/Groups';

interface Route{
    path: string;
    content: string;
    icon: React.ReactElement;
}

const routes: Route[] = [
    {
        path: "/",
        content: "Asosiy",
        icon: <DashboardCustomizeRoundedIcon />
    },
    {
        path: "/orders",
        content: "Buyurtmalar",
        icon: <DryCleaningIcon />
    },
    {
        path: "/services",
        content: "Xizmatlar",
        icon: <CleaningServicesIcon />
    },
    {
        path: "/clients",
        content: "Mijozlar",
        icon: <GroupsIcon />
    },
]

export default routes;