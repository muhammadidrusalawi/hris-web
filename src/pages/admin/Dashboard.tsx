import { DashboardLayout } from "@/layouts/DashboardLayout.tsx";
import { UserPlus, MoreVertical, Filter, ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <div className="text-[13px]">
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Executive Overview</h1>
                            <p className="text-gray-500">Update terakhir: 11 Jan 2026, 09:41 WIB</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 font-medium transition">
                                <Filter size={14} /> Filter
                            </button>
                            <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 font-medium shadow-sm transition">
                                <UserPlus size={14} /> Add Employee
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                        {[
                            { label: "Total Headcount", val: "1,284", change: "+2.4%", up: true },
                            { label: "Active Job Ads", val: "12", change: "-1", up: false },
                            { label: "Attendance Rate", val: "98.2%", change: "+0.4%", up: true },
                            { label: "Payroll Budget", val: "$420k", change: "+12%", up: false },
                            { label: "Turnover Rate", val: "1.2%", change: "-0.2%", up: true },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border p-3 rounded-lg shadow-sm">
                                <p className="text-gray-500 font-medium mb-1">{item.label}</p>
                                <div className="flex items-baseline justify-between">
                                    <h3 className="text-lg font-bold">{item.val}</h3>
                                    <span className={`flex items-center text-[11px] font-bold ${item.up ? 'text-green-600' : 'text-red-600'}`}>
                    {item.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {item.change}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MAIN CONTENT GRID */}
                    <div className="grid grid-cols-12 gap-4">

                        {/* LEFT: ATTENDANCE TREND (Simulated Graph Area) */}
                        <div className="col-span-12 lg:col-span-8 space-y-4">
                            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50/50">
                                    <h2 className="font-bold text-gray-800">Attendance Insight</h2>
                                    <select className="text-xs bg-transparent border rounded p-1 outline-none font-medium">
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                    </select>
                                </div>
                                <div className="p-4 h-[240px] flex items-end gap-2">
                                    {/* Mock Bar Chart */}
                                    {[40, 70, 45, 90, 65, 80, 95, 50, 70, 85, 30, 60].map((h, i) => (
                                        <div key={i} className="flex-1 bg-indigo-100 rounded-t-sm hover:bg-indigo-500 transition-all relative group cursor-pointer" style={{ height: `${h}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {h}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* EMPLOYEE LIST TABLE (COMPACT) */}
                            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b flex justify-between items-center">
                                    <h2 className="font-bold text-gray-800">Recent Onboarding</h2>
                                    <button className="text-indigo-600 font-semibold hover:underline flex items-center gap-1">View Directory <ChevronRight size={14} /></button>
                                </div>
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b text-gray-500 uppercase text-[10px] tracking-wider font-bold">
                                    <tr>
                                        <th className="px-4 py-2">Employee</th>
                                        <th className="px-4 py-2">Department</th>
                                        <th className="px-4 py-2">Start Date</th>
                                        <th className="px-4 py-2">Work Mode</th>
                                        <th className="px-4 py-2 text-right">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                    {[
                                        { name: "Siska Kohl", role: "Product Designer", dept: "Design", date: "Jan 10, 2026", type: "Remote", color: "bg-blue-50 text-blue-700" },
                                        { name: "Bambang Sugar", role: "Backend Eng.", dept: "Tech", date: "Jan 08, 2026", type: "On-site", color: "bg-orange-50 text-orange-700" },
                                        { name: "Anita Wijaya", role: "HR Manager", dept: "HR", date: "Jan 05, 2026", type: "Hybrid", color: "bg-purple-50 text-purple-700" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50">
                                            <td className="px-4 py-2.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-7 w-7 rounded-full bg-gray-100 border flex-shrink-0"></div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{row.name}</p>
                                                        <p className="text-[11px] text-gray-500">{row.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2.5 font-medium">{row.dept}</td>
                                            <td className="px-4 py-2.5 text-gray-500">{row.date}</td>
                                            <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${row.color}`}>
                            {row.type}
                          </span>
                                            </td>
                                            <td className="px-4 py-2.5 text-right">
                                                <button className="p-1 hover:bg-gray-200 rounded"><MoreVertical size={14}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: WIDGETS */}
                        <div className="col-span-12 lg:col-span-4 space-y-4">

                            {/* WHO'S OUT TODAY */}
                            <div className="bg-white border rounded-xl p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="font-bold text-gray-800">Who's Out Today?</h2>
                                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 rounded-full">4 People</span>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="flex items-center justify-between group cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">JS</div>
                                                <div>
                                                    <p className="font-bold text-gray-800">Joko Susanto</p>
                                                    <p className="text-[11px] text-gray-500">Sick Leave • Back tomorrow</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* TASK LIST / REMINDERS */}
                            <div className="bg-indigo-900 text-white rounded-xl p-4 shadow-sm relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="font-bold mb-1 italic">HR Tip of the Day</h2>
                                    <p className="text-indigo-200 text-xs leading-relaxed">
                                        Jangan lupa untuk menyelesaikan review performa untuk departemen Engineering sebelum Jumat ini!
                                    </p>
                                    <button className="mt-3 text-[11px] font-bold bg-white text-indigo-900 px-3 py-1 rounded-full">
                                        View My Tasks
                                    </button>
                                </div>
                                {/* Decorative circle */}
                                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-indigo-800 rounded-full opacity-50"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}