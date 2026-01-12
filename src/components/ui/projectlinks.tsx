import { Database, Cloud, BarChart2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth.ts";
import type {ReactNode} from "react";

type Project = {
    title: string;
    icon: ReactNode;
    roles: string[];
};

const projects: Project[] = [
    { title: "ERP System", icon: <Database size={18} />, roles: ["admin", "manager"] },
    { title: "Cloud Migration", icon: <Cloud size={18} />, roles: ["admin", "manager"] },
    { title: "Marketing Dashboard", icon: <BarChart2 size={18} />, roles: ["admin", "manager"] },
];

export function ProjectLinks() {
    const { user } = useAuth();
    const role: string = user?.role ?? "employee";

    const filteredProjects: Project[] = projects.filter(p => p.roles.includes(role));
    if (filteredProjects.length === 0) return null;

    return (
        <>
            {filteredProjects.map((project: Project) => (
                <div
                    key={project.title}
                    className="w-full flex items-center p-2 rounded hover:bg-gray-200/40 text-sm"
                >
                    <div className="flex items-center gap-3">
                        {project.icon}
                        {project.title}
                    </div>
                </div>
            ))}
        </>
    );
}