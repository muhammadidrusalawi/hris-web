import type {ReactNode} from "react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    illustration?: string;
}

export default function AuthLayout({ title, subtitle, children, illustration = "https://ui.shadcn.com/placeholder.svg", }: AuthLayoutProps) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border bg-white">
                <div className="flex w-full flex-col gap-4 p-8 md:w-1/2">
                    <div className="mb-2">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {title}
                        </h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>

                    {children}
                </div>

                <div className="hidden bg-gray-100 md:block md:w-1/2">
                    <img
                        src={illustration}
                        alt="Auth Illustration"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}