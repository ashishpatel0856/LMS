import { Menu, School, User, LogOut, BookOpen, LayoutDashboard, ChevronDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation, useLoadUserQuery } from '@/features/api/authApi';
import { toast } from 'sonner';

const Navbar = () => {
    // Get real user data from API
    const { data: userData, isLoading: userLoading } = useLoadUserQuery();
    const user = userData?.user;

    const [logoutUser, { data, isSuccess, error }] = useLogoutUserMutation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoutHandler = async () => {
        try {
            await logoutUser();
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User logged out");
            navigate("/login");
        }
        if (error) {
            toast.error(error?.data?.message || "Logout failed");
        }
    }, [isSuccess, error, data, navigate]);

    // Loading state for user
    if (userLoading) {
        return (
            <div className={`h-16 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-gray-800`}>
                <div className='max-w-7xl mx-auto flex items-center justify-center h-full px-4'>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className={`h-16 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800' 
                : 'bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-gray-800'
        }`}>

            {/* ========== DESKTOP ========== */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-4 lg:px-6'>

                {/* Logo */}
                <Link to='/' className='flex items-center gap-2.5 group'>
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
                        <School className="text-white" size={20} />
                    </div>
                    <h1 className='font-extrabold text-xl lg:text-2xl text-gray-900 dark:text-white tracking-tight'>
                        E-<span className="text-blue-600">Learning</span>
                    </h1>
                </Link>

                {/* Right Side */}
                <div className='flex items-center gap-3 lg:gap-4'>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                                    <Avatar className="h-8 w-8 border-2 border-blue-500/30">
                                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-bold">
                                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                                        {user?.name || "User"}
                                    </span>
                                    <ChevronDown size={14} className="hidden lg:block text-gray-400" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-52 mt-2" align="end">
                                <DropdownMenuLabel className="font-normal p-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                                            <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || "User"}</p>
                                            <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild className="cursor-pointer">
                                        <Link to="/my-learning" className="flex items-center gap-2.5">
                                            <BookOpen size={16} className="text-gray-500" />
                                            My Learning
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild className="cursor-pointer">
                                        <Link to="/profile" className="flex items-center gap-2.5">
                                            <User size={16} className="text-gray-500" />
                                            Edit Profile
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem 
                                        onClick={logoutHandler}
                                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                {user?.role === "instructor" && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild className="cursor-pointer">
                                            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
                                                <LayoutDashboard size={16} className="text-gray-500" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate("/login")}
                                className="text-sm font-medium h-9 px-4"
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={() => navigate("/login")}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium h-9 px-5"
                            >
                                Signup
                            </Button>
                        </div>
                    )}

                    <div className="border-l border-gray-200 dark:border-gray-700 pl-3 lg:pl-4">
                        <DarkMode />
                    </div>
                </div>
            </div>

            {/* ========== MOBILE ========== */}
            <div className='flex md:hidden items-center justify-between h-full px-3 sm:px-4'>

                {/* Mobile Menu */}
                <MobileNavbar 
                    logoutHandler={logoutHandler} 
                    user={user}
                />

                {/* Mobile Logo - Centered */}
                <Link to='/' className='flex items-center gap-2 absolute left-1/2 -translate-x-1/2'>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <School className="text-white" size={18} />
                    </div>
                    <h1 className='font-extrabold text-lg text-gray-900 dark:text-white'>
                        E-<span className="text-blue-600">Learning</span>
                    </h1>
                </Link>

                {/* Mobile Dark Mode */}
                <div className="flex items-center">
                    <DarkMode />
                </div>
            </div>
        </div>
    );
};

export default Navbar;


// ========== MOBILE NAVBAR ==========
const MobileNavbar = ({ logoutHandler, user }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (typeof logoutHandler !== "function") return;
        await logoutHandler();
        setOpen(false);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button 
                    size='icon' 
                    className="rounded-full h-9 w-9 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-0" 
                    variant="ghost"
                >
                    <Menu size={20} className="text-gray-700 dark:text-gray-300" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0 flex flex-col bg-white dark:bg-[#0A0A0A]">

                {/* Header */}
                <div className="p-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
                    <SheetHeader className="text-left">
                        <SheetTitle className="text-white flex items-center gap-2.5 text-xl font-bold">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <School className="text-white" size={18} />
                            </div>
                            E-Learning
                        </SheetTitle>
                    </SheetHeader>

                    {user ? (
                        <div className="mt-5 flex items-center gap-3">
                            <Avatar className="h-11 w-11 border-2 border-white/40">
                                <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                                <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                                <p className="font-semibold text-sm truncate">{user?.name || "User"}</p>
                                <p className="text-xs text-blue-200 truncate">{user?.email || "user@example.com"}</p>
                                <span className="inline-block mt-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full capitalize">
                                    {user?.role || "student"}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 flex gap-2">
                            <Button 
                                onClick={() => handleNavigate("/login")}
                                className="flex-1 bg-white text-blue-700 hover:bg-blue-50 font-semibold h-9 text-sm"
                            >
                                Login
                            </Button>
                            <Button 
                                onClick={() => handleNavigate("/login")}
                                variant="outline" 
                                className="flex-1 border-white/50 text-white hover:bg-white/20 h-9 text-sm"
                            >
                                Signup
                            </Button>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex-1 py-4 overflow-y-auto">
                    {user ? (
                        <nav className='flex flex-col px-2'>
                            <button
                                onClick={() => handleNavigate("/my-learning")}
                                className="flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                            >
                                <BookOpen size={18} className="text-gray-500 dark:text-gray-400" />
                                <span className="font-medium text-sm">My Learning</span>
                            </button>

                            <button
                                onClick={() => handleNavigate("/profile")}
                                className="flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                            >
                                <User size={18} className="text-gray-500 dark:text-gray-400" />
                                <span className="font-medium text-sm">Edit Profile</span>
                            </button>

                            <Separator className="my-3 mx-4" />

                            {user?.role === "instructor" && (
                                <button
                                    onClick={() => handleNavigate("/admin/dashboard")}
                                    className="flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                                >
                                    <LayoutDashboard size={18} className="text-gray-500 dark:text-gray-400" />
                                    <span className="font-medium text-sm">Dashboard</span>
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-red-600 mt-2"
                            >
                                <LogOut size={18} />
                                <span className="font-medium text-sm">Logout</span>
                            </button>
                        </nav>
                    ) : (
                        <div className="px-4 py-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                Please login to access your account
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-xs text-gray-400 text-center">E-Learning Platform v1.0</p>
                </div>
            </SheetContent>
        </Sheet>
    );
};