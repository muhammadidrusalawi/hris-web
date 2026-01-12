import {Bell, Building2, Loader2, LogOut, PanelRight, Settings, UserRoundPen} from "lucide-react";
import * as React from "react";
import {useAuth} from "@/hooks/use-auth.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {authService} from "@/services/auth.ts";
import {useEffect, useState} from "react";
import {SideLinks} from "@/components/ui/sidelinks.tsx";
import {ProjectLinks} from "@/components/ui/projectlinks.tsx";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const {user} = useAuth()
    const logoutMutation = authService.useLogout();
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(() => {
        const stored = localStorage.getItem("sidebarVisible");
        return stored === null ? true : stored === "true";
    });

    useEffect(() => {
        localStorage.setItem("sidebarVisible", String(isSidebarVisible));
    }, [isSidebarVisible]);
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside
                className={`fixed top-0 left-0 h-full w-64 flex flex-col py-6 px-2 transition-all duration-500 ease-in-out bg-white border-r z-40 ${
                    isSidebarVisible ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <a href="#" className="flex items-center gap-2 px-4 ">
                    <div className="bg-blue-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <Building2 className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">Acme Inc</span>
                        <span className="truncate text-xs">Enterprise</span>
                    </div>
                </a>

                <nav className="w-full flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 mt-6 px-2">
                    <h1 className="text-[13px] font-medium mb-1">Platform</h1>
                    <SideLinks />

                    <h1 className="text-[13px] font-medium mt-6 mb-1">Projects</h1>
                    <ProjectLinks/>
                </nav>

                <div className="flex w-full items-center mt-auto px-4 pt-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="w-full flex items-center gap-3 cursor-pointer">
                                <div className="h-8 w-8">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User Avatar"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium">{user?.name ?? "—"}</p>
                                        <p className="text-xs text-gray-500">{user?.email ?? "—"}</p>
                                    </div>
                                </div>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-60 ml-2">
                            <div className="w-full flex flex-col items-start gap-2">
                                <Button
                                    onClick={() => navigate("/auth/profile")}
                                    variant="outline"
                                    className="w-full flex items-center justify-start"
                                    >
                                    <UserRoundPen size={18} className="mr-3" /> Profile
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-start"
                                >
                                    <Settings size={18} className="mr-3" /> Settings
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full flex items-center justify-start"
                                    onClick={() => logoutMutation.mutate()}
                                    disabled={logoutMutation.isPending}
                                >
                                    {logoutMutation.isPending ?
                                        <Loader2 className="h-4 w-4 animate-spin" /> :
                                        <>
                                            <LogOut size={18} className="mr-3" />
                                            Logout
                                        </>
                                    }
                                </Button>

                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </aside>

            {isSidebarVisible && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 md:hidden"
                    onClick={() => setIsSidebarVisible(false)}
                ></div>
            )}

            <div
                className={`flex-1 flex flex-col transition-all duration-500 ${
                    isSidebarVisible ? "md:ml-64" : "ml-0"
                } overflow-y-auto`}
            >
                <header className="sticky top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                        >
                            <PanelRight />
                        </Button>
                       <h2 className="font-medium text-sm">
                           Dashboard
                       </h2>
                    </div>
                    <Button variant="ghost">
                        <Bell />
                    </Button>
                </header>
                <main className="flex-1 px-4">
                    {children}
                </main>
            </div>
        </div>
    );
}