// app/page.tsx or pages/index.tsx
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BusFront, Calendar, CreditCard, MapPin } from "lucide-react"

export default async function Home() {
  const { userId } = auth()
  const isAuthenticated = !!userId

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-16 bg-white">
      {/* Hero Section */}
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Your Journey, Our Priority
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          Book your bus tickets across Nepal in seconds. Safe, secure, and hassle-free.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={isAuthenticated ? "/trips" : "/pages/login"}>
            <Button size="lg">{isAuthenticated ? "Browse Trips" : "Login"}</Button>
          </Link>
          {!isAuthenticated && (
            <Link href="/pages/signup">
              <Button variant="outline" size="lg">Sign Up</Button>
            </Link>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <CardTitle>Choose Route</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Pick your departure and destination locations.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Choose when you want to travel.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-3">
              <BusFront className="h-6 w-6 text-primary" />
              <CardTitle>Pick Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Pick your favorite seat with real-time availability.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <CardTitle>Pay & Go</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Make payment and receive your e-ticket instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
