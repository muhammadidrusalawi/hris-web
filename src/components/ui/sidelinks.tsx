import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {PieChart, Users, Settings, Network, Bell, FolderOpen, FileText, ChevronRight} from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible.tsx"
import { useAuth } from "@/hooks/use-auth.ts"

const groupedItems = [
    {
        groupTitle: "Overview",
        icon: <PieChart size={18} />,
        roles: ["admin", "manager", "employee"],
        items: [
            { title: "Dashboard", href: "dashboard", roles: ["admin", "manager", "employee"] },
            { title: "Analytics", href: "analytics", roles: ["admin", "manager"] },
            { title: "Reports", href: "reports", roles: ["admin"] },
        ],
    },
    {
        groupTitle: "Human Resources",
        icon: <Users size={18} />,
        roles: ["admin", "manager"],
        items: [
            { title: "Employees", href: "employees", roles: ["admin", "manager"] },
            { title: "Attendance", href: "attendance", roles: ["admin", "manager"] },
            { title: "Leave Management", href: "leave", roles: ["admin", "manager"] },
            { title: "Payroll", href: "payroll", roles: ["admin"] },
            { title: "Departments", href: "departments", roles: ["admin"] },
            { title: "Positions", href: "positions", roles: ["admin"] },
            { title: "Training", href: "training", roles: ["admin", "manager"] },
        ],
    },
    {
        groupTitle: "Projects",
        icon: <FolderOpen size={18} />,
        roles: ["admin", "manager"],
        items: [
            { title: "All Projects", href: "projects", roles: ["admin", "manager"] },
            { title: "Create Project", href: "projects/create", roles: ["admin"] },
            { title: "Archived Projects", href: "projects/archived", roles: ["admin", "manager"] },
        ],
    },
    {
        groupTitle: "Settings",
        icon: <Settings size={18} />,
        roles: ["admin", "manager", "employee"],
        items: [
            { title: "Profile Settings", href: "my-profile", roles: ["admin", "manager", "employee"] },
            { title: "Account Settings", href: "account", roles: ["admin"] },
        ],
    },
    {
        groupTitle: "Integrations",
        icon: <Network size={18} />,
        roles: ["admin"],
        items: [
            { title: "API Keys", href: "api-keys", roles: ["admin"] },
            { title: "Webhooks", href: "webhooks", roles: ["admin"] },
        ],
    },
    {
        groupTitle: "Notifications",
        icon: <Bell size={18} />,
        roles: ["admin", "manager", "employee"],
        items: [
            { title: "Notification Center", href: "notifications", roles: ["admin", "manager", "employee"] },
            { title: "Preferences", href: "preferences", roles: ["admin", "manager", "employee"] },
        ],
    },
    {
        groupTitle: "Reports",
        icon: <FileText size={18} />,
        roles: ["admin", "manager"],
        items: [
            { title: "Monthly Reports", href: "reports/monthly", roles: ["admin", "manager"] },
            { title: "Annual Reports", href: "reports/annual", roles: ["admin"] },
        ],
    },
]


export default function SideLinks() {
    const { user } = useAuth()
    const role = user?.role ?? "employee"
    const location = useLocation()

    const filteredGroups = groupedItems
        .filter(g => g.roles.includes(role))
        .map(g => ({
            ...g,
            items: g.items.filter(i => i.roles.includes(role)),
        }))

    const defaultOpenGroups = filteredGroups
        .filter(g => g.items.some(i => location.pathname === `/${role}/${i.href}`))
        .map(g => g.groupTitle)

    const [openGroups, setOpenGroups] = useState<string[]>(defaultOpenGroups)

    const toggleGroup = (groupTitle: string) => {
        setOpenGroups(prev =>
            prev.includes(groupTitle)
                ? prev.filter(g => g !== groupTitle)
                : [...prev, groupTitle]
        )
    }

    return (
        <>
            {filteredGroups.map(group => {
                const isOpen = openGroups.includes(group.groupTitle)
                return (
                    <Collapsible key={group.groupTitle} open={isOpen}>
                        <CollapsibleTrigger
                            onClick={() => toggleGroup(group.groupTitle)}
                            className="w-full flex justify-between items-center p-2 rounded hover:bg-gray-200/40 text-sm"
                        >
                            <div className="flex items-center gap-3">{group.icon}{group.groupTitle}</div>
                            <ChevronRight
                                size={18}
                                className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                            />
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                            <div className="flex">
                                {/* BORDER VERTICAL UTAMA DI SINI */}
                                <div className="ml-4 my-1 border-l border-gray-300" />
                                <div className="flex-1 flex flex-col">
                                    {group.items.map(item => {
                                        const href = `/${role}/${item.href}`
                                        const isActive = location.pathname === href
                                        return (
                                            <div key={item.title} className="px-2 py-1.5">
                                                <Link
                                                    to={href}
                                                    className={`block pl-3.5 text-sm ${
                                                        isActive ? "text-blue-500 font-medium" : "text-gray-700"
                                                    } hover:text-blue-500`}
                                                >
                                                    {item.title}
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                )
            })}
        </>
    )
}


// import { useState } from "react"
// import { Link, useLocation } from "react-router-dom"
// import {PieChart, Users, Settings, Network, Bell, ChevronRight} from "lucide-react"
// import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible.tsx"
// import { useAuth } from "@/hooks/use-auth.ts"
//
// const groupedItems = [
//     {
//         groupTitle: "Overview",
//         icon: <PieChart size={18} />,
//         roles: ["admin", "manager", "employee"],
//         items: [
//             { title: "Dashboard", href: "#", roles: ["admin", "manager", "employee"] },
//             { title: "Analytics", href: "#", roles: ["admin", "manager"] },
//             { title: "Reports", href: "#", roles: ["admin"] },
//         ],
//     },
//     {
//         groupTitle: "Human Resources",
//         icon: <Users size={18} />,
//         roles: ["admin", "manager"],
//         items: [
//             { title: "Employees", href: "#", roles: ["admin", "manager"] },
//             { title: "Attendance", href: "#", roles: ["admin", "manager"] },
//             { title: "Leave Management", href: "#", roles: ["admin", "manager"] },
//             { title: "Payroll", href: "#", roles: ["admin"] },
//             { title: "Departments", href: "#", roles: ["admin"] },
//             { title: "Positions", href: "#", roles: ["admin"] },
//             { title: "Training", href: "#", roles: ["admin", "manager"] },
//         ],
//     },
//     {
//         groupTitle: "Settings",
//         icon: <Settings size={18} />,
//         roles: ["admin", "manager", "employee"],
//         items: [
//             { title: "Profile Settings", href: "/dashboard/my-profile", roles: ["admin", "manager", "employee"] },
//             { title: "Account Settings", href: "#", roles: ["admin"] },
//         ],
//     },
//     {
//         groupTitle: "Integrations",
//         icon: <Network size={18} />,
//         roles: ["admin"],
//         items: [
//             { title: "API Keys", href: "#", roles: ["admin"] },
//             { title: "Webhooks", href: "#", roles: ["admin"] },
//         ],
//     },
//     {
//         groupTitle: "Notifications",
//         icon: <Bell size={18} />,
//         roles: ["admin", "manager", "employee"],
//         items: [
//             { title: "Notification Center", href: "#", roles: ["admin", "manager", "employee"] },
//             { title: "Preferences", href: "#", roles: ["admin", "manager", "employee"] },
//         ],
//     },
// ]
//
// export default function SideLinks() {
//     const { user } = useAuth()
//     const role = user?.role ?? "employee"
//     const location = useLocation()
//
//     const [openGroups, setOpenGroups] = useState<string[]>([])
//
//     const toggleGroup = (groupTitle: string) => {
//         setOpenGroups(prev =>
//             prev.includes(groupTitle)
//                 ? prev.filter(g => g !== groupTitle)
//                 : [...prev, groupTitle]
//         )
//     }
//
//     const filteredGroups = groupedItems
//         .filter(g => g.roles.includes(role))
//         .map(g => ({
//             ...g,
//             items: g.items.filter(i => i.roles.includes(role)),
//         }))
//
//     return (
//         <>
//             {filteredGroups.map(group => {
//                 const isOpen = openGroups.includes(group.groupTitle)
//                 return (
//                     <Collapsible key={group.groupTitle} open={isOpen}>
//                         <CollapsibleTrigger
//                             onClick={() => toggleGroup(group.groupTitle)}
//                             className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-200/40 text-sm"
//                         >
//                             <span className="flex items-center gap-2">{group.icon}{group.groupTitle}</span>
//                             <ChevronRight className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}  size={18}/>
//                         </CollapsibleTrigger>
//
//                         <CollapsibleContent>
//                             <div className="flex">
//                                 <div className="ml-4 my-1 border-l" />
//                                 <div className="flex-1 flex flex-col">
//                                     {group.items.map((item) => {
//                                         const isActive = item.href === location.pathname;
//                                         return (
//                                             <div key={item.title} className="px-2 py-1.5">
//                                                 <Link
//                                                     to={item.href}
//                                                     className={`block pl-2.5 text-sm ${
//                                                         isActive ? "text-blue-500 font-medium" : "text-muted-foreground"
//                                                     } hover:text-blue-500`}
//                                                 >
//                                                     {item.title}
//                                                 </Link>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         </CollapsibleContent>
//                     </Collapsible>
//                 )
//             })}
//         </>
//     )
// }