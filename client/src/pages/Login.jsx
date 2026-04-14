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
    const [signupInput, setSignupInput] = useState(
        { name: "", email: "", password: "" }
    );
    const [loginInput, setLoginInput] = useState(
        { email: "", password: "" }
    );

    const [registerUser, {
        data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsScuccess
    },
    ] = useRegisterUserMutation();

    const [loginUser, {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess
    },
    ] = useLoginUserMutation();
    const navigate = useNavigate();


    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    };


    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;

        await action(inputData);
    };
   
    useEffect(() => {
        if(registerIsScuccess && registerData){
            toast.success(registerData.message || "Signup successfull.")
        }
        if(registerError){
            toast.error(registerData.data.message || "Signup failed");
        }
        if(loginIsSuccess && loginData){
            toast.success(loginData.message || "login successfull.")
            navigate("/");
        }
        if(loginError){
            toast.error(loginData.data.message || "login failed.")
        }
    },[
        loginIsLoading,
        registerIsLoading,
        loginData,
        registerData,
        loginError,
        registerError
    ])
    return (
        <div className="flex justify-center items-center min-h-screen bg-muted mt-20">
            <Tabs defaultValue="login" className="w-full max-w-sm">

                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                login your account after signup.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="flex flex-col gap-4">
                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input
                                        name="email"
                                        value={loginInput.email}
                                        onChange={(e) => changeInputHandler(e, "login")}
                                        type="email"
                                        placeholder="abc@example.com"
                                        required />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex justify-between">
                                        <Label>Password</Label>
                                    </div>
                                    <Input
                                        name="password"
                                        value={loginInput.password}
                                        onChange={(e) => changeInputHandler(e, "login")} type="password"
                                        placeholder="password"
                                        required
                                    />
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col gap-2">
                            <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")} className="w-full">
                                {
                                    loginIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                        </>
                                    ) : "Login"
                                }
                            </Button>

                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>
                                Create a new account and click signup when you are done.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="flex flex-col gap-4">
                                <div className="grid gap-2">
                                    <Label>Name</Label>
                                    <Input
                                        name="name"
                                        value={signupInput.name}
                                        onChange={(e) => changeInputHandler(e, "signup")}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input
                                        name="email"
                                        value={signupInput.email}
                                        onChange={(e) => changeInputHandler(e, "signup")}
                                        type="email"
                                        placeholder="abc@example.com"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Password</Label>
                                    <Input
                                        name="password"
                                        value={signupInput.password}
                                        onChange={(e) => changeInputHandler(e, "signup")}
                                        type="password"
                                        placeholder="password"
                                        required
                                    />
                                </div>
                            </form>
                        </CardContent>

                        <CardFooter>
                            <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")} className="w-full">
                                {
                                    registerIsLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                        </>
                                    ) : "Signup"
                                }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
};

export default Login;