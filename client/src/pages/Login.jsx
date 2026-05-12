import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
    useLoginUserMutation,
    useRegisterUserMutation
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
});
    const [loginInput, setLoginInput] = useState(
        { email: "", password: "" }
    );

    const [registerUser, {
        data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsSuccess
    }] = useRegisterUserMutation();

    const [loginUser, {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess
    }] = useLoginUserMutation();

    const navigate = useNavigate();

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput(prev => ({ ...prev, [name]: value }));
        } else {
            setLoginInput(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;

    if (type === "signup" && !inputData.role) {
        inputData.role = "student";
    }

    console.log("SEND:", inputData);

    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
};

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup successful.");
setSignupInput({
    name: "",
    email: "",
    password: "",
    role: "student"
});        }
        if (registerError) {
            const errorMsg = registerError?.data?.message || registerError?.message || "Signup failed";
            toast.error(errorMsg);
        }
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successful.");
            navigate("/");
        }
        if (loginError) {
            const errorMsg = loginError?.data?.message || loginError?.message || "Login failed";
            toast.error(errorMsg);
        }
    }, [
        loginIsLoading,
        registerIsLoading,
        loginData,
        registerData,
        loginError,
        registerError,
        loginIsSuccess,
        registerIsSuccess,
        navigate
    ]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-muted px-4 py-8 sm:px-6 lg:px-8">
            <Tabs defaultValue="login" className="w-full max-w-[420px] sm:max-w-[480px]">

                <TabsList className="grid w-full grid-cols-2 mb-4 h-11">
                    <TabsTrigger value="login" className="text-sm sm:text-base">Login</TabsTrigger>
                    <TabsTrigger value="signup" className="text-sm sm:text-base">Signup</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Card className="shadow-lg">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-lg sm:text-xl">Login to your account</CardTitle>
                            <CardDescription className="text-sm">
                                Login to your account after signup.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-4 sm:p-6 pt-0">
                            <form className="flex flex-col gap-3 sm:gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-sm sm:text-base">Email</Label>
                                    <Input
                                        name="email"
                                        value={loginInput.email}
                                        onChange={(e) => changeInputHandler(e, "login")}
                                        type="email"
                                        placeholder="abc@example.com"
                                        className="h-10 sm:h-11"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-sm sm:text-base">Password</Label>
                                    <Input
                                        name="password"
                                        value={loginInput.password}
                                        onChange={(e) => changeInputHandler(e, "login")}
                                        type="password"
                                        placeholder="password"
                                        className="h-10 sm:h-11"
                                        required
                                    />
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col gap-2 p-4 sm:p-6 pt-0">
                            <Button
                                disabled={loginIsLoading}
                                onClick={() => handleRegistration("login")}
                                className="w-full h-11 sm:h-12 text-sm sm:text-base"
                            >
                                {loginIsLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                    </>
                                ) : "Login"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>



                <TabsContent value="signup">
                    <Card className="shadow-lg">
                        <CardHeader className="p-4 sm:p-6">
                            <CardTitle className="text-lg sm:text-xl">Create an account</CardTitle>
                            <CardDescription className="text-sm">
                                Create a new account and click signup when you're done.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-4 sm:p-6 pt-0">
                            <form className="flex flex-col gap-3 sm:gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-sm sm:text-base">Name</Label>
                                    <Input
                                        name="name"
                                        value={signupInput.name}
                                        onChange={(e) => changeInputHandler(e, "signup")}
                                        placeholder="Your name"
                                        className="h-10 sm:h-11"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-sm sm:text-base">Email</Label>
                                    <Input
                                        name="email"
                                        value={signupInput.email}
                                        onChange={(e) => changeInputHandler(e, "signup")}
                                        type="email"
                                        placeholder="abc@example.com"
                                        className="h-10 sm:h-11"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-sm sm:text-base">Password</Label>
                                    <Input
                                        name="password"
                                        value={signupInput.password}
                                        onChange={(e) => changeInputHandler(e, "signup")}
                                        type="password"
                                        placeholder="password"
                                        className="h-10 sm:h-11"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label className="text-sm sm:text-base">
                                        Select Role
                                    </Label>

                                   <select
    name="role"
    value={signupInput.role}
    onChange={(e) => changeInputHandler(e, "signup")}
    className="h-10 sm:h-11 border rounded-md px-3 bg-white"
>
    <option value="student">Student</option>
    <option value="instructor">Instructor</option>
</select>
                                </div>

                            </form>
                        </CardContent>

                        <CardFooter className="p-4 sm:p-6 pt-0">
                            <Button
                                disabled={registerIsLoading}
                                onClick={() => handleRegistration("signup")}
                                className="w-full h-11 sm:h-12 text-sm sm:text-base"
                            >
                                {registerIsLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                    </>
                                ) : "Signup"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
};

export default Login;