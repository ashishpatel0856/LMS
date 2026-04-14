import { Menu, School } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
const Navbar = () => {
    const user = true;
    return (
        <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* Desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>

                </div>
                {/* user icons and dark mode  icons */}
                <div className='flex items-center gap-8'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>

                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                                    </Avatar>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-40" align="start">
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem>
                                            My learning
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Edit Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem>
                                        Dashboard
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <Button variant="outline">Login</Button>
                                <Button>Signup</Button>
                            </div>
                        )
                    }

                    <DarkMode />
                </div>
            </div>

            {/* mobile device */}
            <div className='flex md:hidden items-center justify-between px-4 h-full'>
                <h1 className='font-extrabold text-2xl'>E-Learning</h1>
                <MobileNavbar />
            </div>
        </div>

    )
}

export default Navbar


const MobileNavbar = () => {
    const role = "instructor";

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full  bg-gray-200 hover:bg-gray-200" variant="outline">
                    <Menu />

                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader class="flex flex-row items-center justify-between  mt-10 ml-7">
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode  />
                </SheetHeader>

                <Separator className="mr-2" />
                <nav className='flex flex-col space-y-4 ml-7'>
                    <span>My Learning</span>
                    <span>Edit profile</span>
                    <p>Log out</p>
                </nav>
                {
                    role === "instructor" && (
                        <Button className="w-75% mx-15 flex justify-center" type="submit">Dashboard</Button>

                    )
                }

            </SheetContent>
        </Sheet>


    )
}