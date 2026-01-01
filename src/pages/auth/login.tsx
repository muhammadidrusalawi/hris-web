import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IdCardLanyard} from "lucide-react";
import {useState} from "react";

export default function Login(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({
            email,
            password,
        });
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-row w-full max-w-4xl bg-white rounded-2xl border overflow-hidden">
                <div className="w-full md:w-1/2 p-8 flex flex-col gap-4">
                    <div className="mb-2">
                        <h2 className="text-3xl font-bold text-gray-800">Sign In to Your Account</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Sign in using your email and password
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative mt-1 flex flex-col gap-1">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@rhcp.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative mt-1 flex flex-col gap-1">
                                <div className="relative flex items-center justify-between">
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    name="remember"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-1 block text-xs text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>
                            <a
                                href="#"
                                className="text-xs font-medium text-gray-800 hover:text-black"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full disabled:opacity-50"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="flex items-center">
                        <div className="flex-grow border-t "></div>
                        <span className="px-3 text-gray-500 text-xs">Or</span>
                        <div className="flex-grow border-t "></div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <IdCardLanyard className="h-4 w-4" />
                        Sign In using Employee Code
                    </Button>
                </div>

                <div className="hidden md:block md:w-1/2 bg-gray-100">
                    <img
                        src="https://ui.shadcn.com/placeholder.svg"
                        alt="Login Illustration"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}