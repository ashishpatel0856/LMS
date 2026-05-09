import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Camera } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Profile = () => {
  const { data, isLoading, error, refetch } = useLoadUserQuery(undefined, {
    // Refetch on mount to get fresh data
    refetchOnMountOrArgChange: true,
  })
  const navigate = useNavigate();

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error: updateError,
      isSuccess
    }
  ] = useUpdateUserMutation()

  const [name, setName] = useState("")
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  // Initialize form with user data when available
  useEffect(() => {
    if (data?.user?.name) {
      setName(data.user.name)
    }
  }, [data])

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file")
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB")
        return
      }

      setProfilePhoto(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const updateUserHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    // Always send name
    formData.append("name", name || data?.user?.name)

    // Send photo if selected
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto)
    }

    // Debug log
    console.log("=== SENDING FORM DATA ===")
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? `File: ${value.name}` : value)
    }

    try {
      await updateUser(formData).unwrap()
    } catch (err) {
      console.error("Update failed:", err)
      toast.error(err?.data?.message || "Failed to update profile")
    }
  }

  useEffect(() => {
    if (isSuccess) {
      console.log("Update Success:", updateUserData)
      toast.success(updateUserData?.message || "Profile updated successfully.")
      setDialogOpen(false)
      setProfilePhoto(null)
      setPreviewUrl("")

      // Force refetch with cache invalidation
      refetch()

      // Force reload to get fresh data from server
      window.location.reload()
    }
    if (isError) {
      console.error("Update Error:", updateError)
      toast.error(updateError?.data?.message || "Failed to update profile.")
    }
  }, [isSuccess, isError, updateUserData, updateError, refetch])

  // Reset form when dialog closes
  const handleDialogClose = (open) => {
    if (!open) {
      setDialogOpen(false)
      setName(data?.user?.name || "")
      setProfilePhoto(null)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl("")
      }
    } else {
      setDialogOpen(true)
    }
  }

  if (isLoading) return <h1 className="text-center mt-20">Profile Loading...</h1>

  if (error) {
    console.log("Profile Error:", error)
    if (error.status === 401) {
      return <Navigate to="/login" />
    }
    return <h1 className="text-center mt-20 text-red-500">Something went wrong!</h1>
  }

  if (!data || !data.user) {
    return <h1 className="text-center mt-20">No user data found</h1>
  }

  const { user } = data

  // Debug: Check what photo URL we have
  console.log("User photoUrl:", user.photoUrl)
  console.log("User data:", user)

  return (
    <div className='max-w-4xl mx-auto px-4 my-24'>
      <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>

      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
        {/* Avatar */}
        <div className='flex flex-col items-center'>
          <Avatar className='h-24 w-24 md:h-32 md:w-32 mb-4'>
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
              alt="profile"
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="flex-1 w-full">
          <div className='mb-2'>
            <h1 className='font-semibold'>
              Name:
              <span className='ml-2 font-normal'>{user.name}</span>
            </h1>
          </div>

          <div className='mb-2'>
            <h1 className='font-semibold'>
              Email:
              <span className='ml-2 font-normal'>{user.email}</span>
            </h1>
          </div>

          <div className='mb-2'>
            <h1 className='font-semibold'>
              Role:
              <span className='ml-2 font-normal'>
                {user.role?.toUpperCase()}
              </span>
            </h1>
          </div>

          {/* Dialog */}
          <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button className='px-6 py-5 mt-1'>
                <Camera size={16} className="mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={updateUserHandler} className='space-y-4 py-4'>
                {/* Photo Preview */}
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage 
                      src={previewUrl || user.photoUrl || "https://github.com/shadcn.png"} 
                      alt="preview"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                    className='h-11'
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor="photo">Profile Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    onChange={onChangeHandler}
                    accept="image/*"
                    className='h-11 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer'
                  />
                  <p className="text-xs text-gray-500">Click to select a photo (JPG, PNG, max 5MB)</p>
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={updateUserIsLoading}
                    className="w-full sm:w-auto"
                  >
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Please wait...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Courses */}
      <div>
        <h1 className='font-medium text-lg'>
          Courses you're enrolled in
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
          {user.enrolledCourses?.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses?.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile