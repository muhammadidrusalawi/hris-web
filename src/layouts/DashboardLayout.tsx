import {Building2, LogOut, Settings, UserRoundPen} from "lucide-react";
import * as React from "react";
import SideLinks from "@/components/ui/sidelinks.tsx";
import {useAuth} from "@/hooks/use-auth.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const {user, logout} = useAuth()
    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="fixed w-64 top-0 left-0 h-screen flex flex-col py-6 px-2">
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
                    <SideLinks />
                </nav>

                <div className="flex w-full items-center mt-auto px-4 pt-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="w-full flex items-center gap-3 cursor-pointer">
                                <div className="h-8 w-8">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="User Avatar"
                                        className="w-full h-full object-cover rounded-full"
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
                                <button
                                    className="w-full flex items-center text-sm font-medium px-4 py-2 border border-gray-300 rounded-md"
                                >
                                    <UserRoundPen size={18} className="mr-3" /> Profile
                                </button>
                                <button className="w-full flex items-center text-sm font-medium px-4 py-2 border border-gray-300 rounded-md">
                                    <Settings size={18} className="mr-3" /> Settings
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center text-sm font-medium px-4 py-2 border border-gray-300 rounded-md">
                                    <LogOut size={18} className="mr-3" /> Logout
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </aside>

            <main className="ml-64 flex flex-1 bg-white my-2 mr-2 rounded-lg shadow-sm">
                {children}
            </main>
        </div>
    );
}