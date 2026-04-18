import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div className=' grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader className='items-center'>
          <CardTitle>Total sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹0</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard