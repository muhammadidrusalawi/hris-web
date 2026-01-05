import {DashboardLayout} from "@/layouts/DashboardLayout.tsx";
import Webcam from "react-webcam";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useRef, useState} from "react";

export default function EmployeeDashboard() {
    const webcamRef = useRef<Webcam>(null)
    const [snapshot, setSnapshot] = useState<string | null>(null)
    const [absenStatus, setAbsenStatus] = useState<string>("Belum Absen")
    const [time, setTime] = useState(new Date())
    const [cameraOn, setCameraOn] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(interval)
    }, [])

    const formattedTime = time.toLocaleTimeString("id-ID")
    const formattedDate = time.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    const handleCapture = (type: "Masuk" | "Pulang") => {
        if (!webcamRef.current || !cameraOn) return
        const image = webcamRef.current.getScreenshot()
        if (image) {
            setSnapshot(image)
            setAbsenStatus(type === "Masuk" ? "Sudah Absen Masuk" : "Sudah Absen Pulang")
            console.log("Snapshot captured:", type, image)
            // TODO: kirim image ke backend untuk absensi
        }
    }
    return (
        <DashboardLayout>
            <div className="w-full h-full flex flex-col gap-6 p-4">
                {/* GREETING */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">Selamat datang 👋</h1>
                        <p className="text-sm text-gray-500">Welcome to your employee dashboard.</p>
                    </div>
                    <div className="text-lg font-mono text-gray-700">{formattedTime}</div>
                </div>

                {/* DASHBOARD GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        {formattedDate}
                    </div>
                    {/* WEBCAM PREVIEW */}
                    <div className="relative h-64 rounded-xl shadow-lg overflow-hidden bg-black">
                        {cameraOn ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                                Kamera Dimatikan
                            </div>
                        )}
                        {/* TOGGLE BUTTON */}
                        <Button
                            size="sm"
                            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-800 text-white"
                            onClick={() => setCameraOn(!cameraOn)}
                        >
                            {cameraOn ? "Matikan Kamera" : "Nyalakan Kamera"}
                        </Button>
                    </div>

                    {/* CONTROLS + SNAPSHOT */}
                    <div className="flex flex-col gap-4">
                        <Button
                            className="w-full bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleCapture("Masuk")}
                            disabled={!cameraOn}
                        >
                            Absen Masuk
                        </Button>
                        <Button
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => handleCapture("Pulang")}
                            disabled={!cameraOn}
                        >
                            Absen Pulang
                        </Button>

                        <p className="text-sm text-gray-500 mt-2">Status: {absenStatus}</p>

                        {snapshot && (
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Preview Snapshot:</p>
                                <img
                                    src={snapshot}
                                    alt="Snapshot"
                                    className="rounded-xl border border-gray-200 shadow"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

// import { useRef, useState, useEffect } from "react"
// import Webcam from "react-webcam"
// import { AppSidebar } from "@/components/app-sidebar"
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Separator } from "@/components/ui/separator"
// import {
//     SidebarInset,
//     SidebarProvider,
//     SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"
//
// export default function EmployeeDashboard() {
//     const webcamRef = useRef<Webcam>(null)
//     const [snapshot, setSnapshot] = useState<string | null>(null)
//     const [absenStatus, setAbsenStatus] = useState<string>("Belum Absen")
//     const [time, setTime] = useState(new Date())
//     const [cameraOn, setCameraOn] = useState(true)
//
//     useEffect(() => {
//         const interval = setInterval(() => setTime(new Date()), 1000)
//         return () => clearInterval(interval)
//     }, [])
//
//     const formattedTime = time.toLocaleTimeString("id-ID")
//     const formattedDate = time.toLocaleDateString("id-ID", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//     })
//
//     const handleCapture = (type: "Masuk" | "Pulang") => {
//         if (!webcamRef.current || !cameraOn) return
//         const image = webcamRef.current.getScreenshot()
//         if (image) {
//             setSnapshot(image)
//             setAbsenStatus(type === "Masuk" ? "Sudah Absen Masuk" : "Sudah Absen Pulang")
//             console.log("Snapshot captured:", type, image)
//             // TODO: kirim image ke backend untuk absensi
//         }
//     }
//
//     return (
//         <SidebarProvider>
//             <AppSidebar />
//             <SidebarInset>
//                 <header className="flex h-16 shrink-0 items-center gap-2">
//                     <div className="flex items-center gap-2 px-4">
//                         <SidebarTrigger className="-ml-1" />
//                         <Separator
//                             orientation="vertical"
//                             className="mr-2 data-[orientation=vertical]:h-4"
//                         />
//                         <Breadcrumb>
//                             <BreadcrumbList>
//                                 <BreadcrumbItem className="hidden md:block">
//                                     <BreadcrumbLink href="#">
//                                         Building Your Application
//                                     </BreadcrumbLink>
//                                 </BreadcrumbItem>
//                                 <BreadcrumbSeparator className="hidden md:block" />
//                                 <BreadcrumbItem>
//                                     <BreadcrumbPage>Data Fetching</BreadcrumbPage>
//                                 </BreadcrumbItem>
//                             </BreadcrumbList>
//                         </Breadcrumb>
//                     </div>
//                 </header>
//
//                 {/* MAIN CONTENT */}
//                 <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
//                     {/* GREETING */}
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
//                         <div>
//                             <h1 className="text-xl font-semibold text-gray-800">Selamat datang 👋</h1>
//                             <p className="text-sm text-gray-500">Welcome to your employee dashboard.</p>
//                         </div>
//                         <div className="text-lg font-mono text-gray-700">{formattedTime}</div>
//                     </div>
//
//                     {/* DASHBOARD GRID */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div>
//                             {formattedDate}
//                         </div>
//                         {/* WEBCAM PREVIEW */}
//                         <div className="relative h-64 rounded-xl shadow-lg overflow-hidden bg-black">
//                             {cameraOn ? (
//                                 <Webcam
//                                     audio={false}
//                                     ref={webcamRef}
//                                     screenshotFormat="image/png"
//                                     className="w-full h-full object-cover"
//                                 />
//                             ) : (
//                                 <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
//                                     Kamera Dimatikan
//                                 </div>
//                             )}
//                             {/* TOGGLE BUTTON */}
//                             <Button
//                                 size="sm"
//                                 className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-800 text-white"
//                                 onClick={() => setCameraOn(!cameraOn)}
//                             >
//                                 {cameraOn ? "Matikan Kamera" : "Nyalakan Kamera"}
//                             </Button>
//                         </div>
//
//                         {/* CONTROLS + SNAPSHOT */}
//                         <div className="flex flex-col gap-4">
//                             <Button
//                                 className="w-full bg-green-500 hover:bg-green-600 text-white"
//                                 onClick={() => handleCapture("Masuk")}
//                                 disabled={!cameraOn}
//                             >
//                                 Absen Masuk
//                             </Button>
//                             <Button
//                                 className="w-full bg-blue-500 hover:bg-blue-600 text-white"
//                                 onClick={() => handleCapture("Pulang")}
//                                 disabled={!cameraOn}
//                             >
//                                 Absen Pulang
//                             </Button>
//
//                             <p className="text-sm text-gray-500 mt-2">Status: {absenStatus}</p>
//
//                             {snapshot && (
//                                 <div>
//                                     <p className="text-sm text-gray-500 mb-2">Preview Snapshot:</p>
//                                     <img
//                                         src={snapshot}
//                                         alt="Snapshot"
//                                         className="rounded-xl border border-gray-200 shadow"
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </SidebarInset>
//         </SidebarProvider>
//     )
// }
//
// // import { AppSidebar } from "@/components/app-sidebar"
// // import {
// //     Breadcrumb,
// //     BreadcrumbItem,
// //     BreadcrumbLink,
// //     BreadcrumbList,
// //     BreadcrumbPage,
// //     BreadcrumbSeparator,
// // } from "@/components/ui/breadcrumb"
// // import { Separator } from "@/components/ui/separator"
// // import {
// //     SidebarInset,
// //     SidebarProvider,
// //     SidebarTrigger,
// // } from "@/components/ui/sidebar"
// //
// // export default function EmployeeDashboard() {
// //     return (
// //         <SidebarProvider>
// //             <AppSidebar />
// //             <SidebarInset>
// //                 <header className="flex h-16 shrink-0 items-center gap-2">
// //                     <div className="flex items-center gap-2 px-4">
// //                         <SidebarTrigger className="-ml-1" />
// //                         <Separator
// //                             orientation="vertical"
// //                             className="mr-2 data-[orientation=vertical]:h-4"
// //                         />
// //                         <Breadcrumb>
// //                             <BreadcrumbList>
// //                                 <BreadcrumbItem className="hidden md:block">
// //                                     <BreadcrumbLink href="#">
// //                                         Building Your Application
// //                                     </BreadcrumbLink>
// //                                 </BreadcrumbItem>
// //                                 <BreadcrumbSeparator className="hidden md:block" />
// //                                 <BreadcrumbItem>
// //                                     <BreadcrumbPage>Data Fetching</BreadcrumbPage>
// //                                 </BreadcrumbItem>
// //                             </BreadcrumbList>
// //                         </Breadcrumb>
// //                     </div>
// //                 </header>
// //                 <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
// //                     <h1 className="text-sm font-medium">Employee Dashboard</h1>
// //                     <p className="text-sm text-muted-foreground">
// //                         Welcome to your employee dashboard.
// //                     </p>
// //                 </div>
// //             </SidebarInset>
// //         </SidebarProvider>
// //     )
// // }