import { Menu, School } from 'lucide-react'
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
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from './ui/sheet';

import { Separator } from './ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';

const Navbar = () => {
    const user = true;

    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User logged out");
            navigate("/login");
        }
    }, [isSuccess]);

    return (
        <div className='h-16 bg-white dark:bg-[#0A0A0A] border-b fixed top-0 left-0 right-0 z-10'>

            {/* Desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-4'>
                <div className='flex items-center gap-2'>
                    <School size={30} />
                    <h1 className='font-extrabold text-2xl'>E-Learning</h1>
                </div>

                <div className='flex items-center gap-6'>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                        <AvatarBadge className="bg-green-600" />
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-40">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                                    <DropdownMenuItem asChild>
                                        <Link to="/my-learning">My Learning</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link to="/profile">Edit Profile</Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={logoutHandler}>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                {user.role === "instructor " && (
                                    <>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem>
                                            Dashboard
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className='flex gap-2'>
                            <Button variant="outline">Login</Button>
                            <Button>Signup</Button>
                        </div>
                    )}

                    <DarkMode />
                </div>
            </div>

            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'>E-Learning</h1>

                <MobileNavbar logoutHandler={logoutHandler} />
            </div>
        </div>
    );
};

export default Navbar;




const MobileNavbar = ({ logoutHandler }) => {
    const role = "instructor";
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        if (typeof logoutHandler !== "function") return;

        await logoutHandler();
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full bg-gray-200" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-10 ml-7">
                    <SheetTitle>E-Learning</SheetTitle>
                </SheetHeader>

                <Separator className="my-4" />

                <nav className='flex flex-col space-y-4 ml-7'>

                    <Link to="/my-learning" onClick={() => setOpen(false)}>
                        My Learning
                    </Link>

                    <Link to="/profile" onClick={() => setOpen(false)}>
                        Edit Profile
                    </Link>

                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="justify-start"
                    >
                        Logout
                    </Button>
                </nav>

                {role === "instructor" && (
                    <Button className="w-3/4 mx-auto mt-6">
                        Dashboard
                    </Button>
                )}
            </SheetContent>
        </Sheet>
    );
};