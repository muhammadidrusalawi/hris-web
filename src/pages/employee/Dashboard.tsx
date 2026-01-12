import { DashboardLayout } from "@/layouts/DashboardLayout.tsx";
import { attendanceService } from "@/services/attendance.ts";
import { useEffect, useState } from "react";
import {Loader2, LogIn, LogOut, MapPin, Bell, Coffee, Sun, MoreHorizontal, Zap} from "lucide-react";
import type { CreateAttendanceForm } from "@/schemas/attendance/create-attendance-schema.ts";
import { useAuth } from "@/hooks/use-auth.ts";
import type {UpdateAttendanceForm} from "@/schemas/attendance/update-attendace-schema.ts";

export default function Dashboard() {
    const { user } = useAuth();
    const { data: attendances = [] } = attendanceService.useListFromEmployee();
    const createAttendance = attendanceService.useCreateFromEmployee();
    const updateAttendance = attendanceService.useUpdateFromEmployee();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const today = new Date().toISOString().split("T")[0];

    const todayAttendance = attendances.find(
        (a) => a.date === today && !a.clock_out
    );

    const handleCheckIn = async () => {
        const now = new Date();
        const data: CreateAttendanceForm = {
            date: now.toISOString().split("T")[0],
            clock_in: now.toLocaleTimeString("en-GB"),
        };

        try {
            await createAttendance.mutateAsync(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckOut = async (attendanceId: number) => {
        const now = new Date();
        const payload: UpdateAttendanceForm = {
            clock_out: now.toLocaleTimeString("en-GB"),
        };

        try {
             await updateAttendance.mutateAsync({
                id: attendanceId,
                payload,
            });

        } catch (err) {
            console.error("CHECKOUT ERROR", err);
        }
    };


    return (
        <DashboardLayout>
            <div className="flex w-full h-full flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                {user?.name?.charAt(0) ?? "U"}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-[#f4f7fe] rounded-full"></div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight leading-none">
                                {user?.name ?? "Guest"}
                            </h1>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-lg">
                                    Frontend Developer
                                </span>
                                <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> HQ - Jakarta
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end text-right border-r pr-4 border-slate-200">
                            <div className="flex items-center gap-2 text-slate-700 font-bold">
                                <Sun className="w-4 h-4 text-amber-500" />
                                <span>28°C</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Jakarta, Indonesia</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <span className="text-2xl font-black text-slate-700 tabular-nums">
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Attendance", value: "20/22", sub: "This Month", color: "text-blue-600", bg: "bg-blue-50" },
                                { label: "Leave / Sick", value: "1 Day", sub: "Remaining: 11", color: "text-amber-600", bg: "bg-amber-50" },
                                { label: "Overtime", value: "5h 20m", sub: "+12% MoM", color: "text-purple-600", bg: "bg-purple-50" },
                                { label: "Performance", value: "98%", sub: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border">
                                    <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
                                    <h3 className={`text-xl font-black mt-1 ${item.color}`}>{item.value}</h3>
                                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-linear-to-br from-slate-900 via-slate-900 to-blue-800 p-8 rounded-3xl relative">
                            <Zap className="absolute top-10 right-10 w-40 h-40 text-white/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-blue-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                        System Ready
                                    </div>
                                    <h2 className="text-4xl font-black text-white leading-[0.9] mb-4 tracking-tighter italic">
                                        READY TO <br/> <span className="text-blue-500">KICKSTART?</span>
                                    </h2>

                                    <div className="space-y-3 max-w-xs">
                                        <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                                            <span>Work Shift Progress</span>
                                            <span className="text-white">18%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 p-[2px]">
                                            <div className="w-[18%] h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 w-full md:w-auto">
                                    <button
                                        onClick={handleCheckIn}
                                        disabled={createAttendance.status === "pending"}
                                        className="group bg-blue-600 hover:bg-blue-500 p-1 pr-8 rounded-2xl flex items-center gap-4 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-900/40 cursor-pointer"
                                    >
                                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                            {createAttendance.status === "pending" ? <Loader2 className="animate-spin text-white" /> : <LogIn className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] font-black uppercase text-blue-200 opacity-60">Punch Your Time</p>
                                            <p className="font-black text-xl text-white uppercase tracking-tight">Check In</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => todayAttendance && handleCheckOut(todayAttendance.id)}
                                        disabled={!todayAttendance || updateAttendance.status === "pending"}
                                        className="group bg-slate-800/50 hover:bg-white/5 border border-slate-700 text-slate-600 p-1 pr-8 rounded-2xl flex items-center gap-4 grayscale transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                                    >
                                        <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
                                            {updateAttendance.status === "pending" ? (
                                                <Loader2 className="animate-spin text-white" />
                                            ) : (
                                                <LogOut className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <p className="font-black text-xl text-white uppercase tracking-tight italic">Check Out</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-black text-slate-800 flex items-center gap-2 underline decoration-blue-500 underline-offset-8">
                                    History of the week
                                </h3>
                                <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><MoreHorizontal className="w-5 h-5 text-slate-400" /></button>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { day: "Jumat", date: "09 Jan", in: "08:02", out: "17:05", status: "Ontime" },
                                    { day: "Kamis", date: "08 Jan", in: "08:15", out: "17:10", status: "Late" },
                                    { day: "Rabu", date: "07 Jan", in: "07:55", out: "17:00", status: "Ontime" },
                                ].map((row, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                                        <div className="flex items-center gap-4 w-32">
                                            <div className="text-center">
                                                <p className="text-xs font-black text-slate-800">{row.day}</p>
                                                <p className="text-[10px] font-bold text-slate-400">{row.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-8">
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">In</p>
                                                <p className="text-sm font-black text-slate-700">{row.in}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Out</p>
                                                <p className="text-sm font-black text-slate-700">{row.out}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-black px-3 py-1 rounded-full ${row.status === 'Ontime' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                            {row.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                            <Bell className="absolute top-2 right-2 w-20 h-20 text-white/10 -rotate-12 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold mb-2 flex items-center gap-2">
                                <Bell className="w-4 h-4" /> Announcement
                            </h3>
                            <p className="text-indigo-100 text-xs leading-relaxed font-medium">
                                The office gathering will be held this Saturday. Please make sure to confirm your attendance in the Events menu.
                            </p>
                            <button className="mt-4 text-[11px] font-black bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all">
                                Read Detail
                            </button>
                        </div>

                        <div className="bg-white rounded-xl border p-6">
                            <h3 className="font-black text-slate-800 text-sm mb-4 uppercase tracking-tighter">Rekan Tim (Online)</h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Andi Saputra", role: "UI Designer", color: "bg-amber-400" },
                                    { name: "Siti Aminah", role: "QA Engineer", color: "bg-emerald-400" },
                                    { name: "Budi Rejeki", role: "Backend", color: "bg-blue-400" },
                                    { name: "Lina Marlina", role: "HR Manager", color: "bg-pink-400" },
                                ].map((team, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl ${team.color} flex items-center justify-center text-white font-black text-xs`}>
                                            {team.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate">{team.name}</p>
                                            <p className="text-[10px] text-slate-400 font-medium tracking-tight">{team.role}</p>
                                        </div>
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full ring-4 ring-emerald-50"></div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-100 rounded-2xl text-[11px] font-bold text-slate-400 hover:border-blue-200 hover:text-blue-500 transition-all">
                                + Lihat Semua Anggota
                            </button>
                        </div>

                        <div className="bg-amber-50 rounded-3xl p-5 border border-amber-100 flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                <Coffee className="w-6 h-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-amber-900">Istirahat Siang</p>
                                <p className="text-[10px] text-amber-700 font-medium">12:00 - 13:00 (2 Jam lagi)</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}