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
        content: "Dashboard",
        icon: <DashboardCustomizeRoundedIcon />
    },
    {
        path: "/orders",
        content: "Orders",
        icon: <DryCleaningIcon />
    },
    {
        path: "/services",
        content: "Services",
        icon: <CleaningServicesIcon />
    },
    {
        path: "/clients",
        content: "Clients",
        icon: <GroupsIcon />
    },
]

export default routes;