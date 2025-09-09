import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(18,18,18)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background accent elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[rgb(67,151,117)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[rgb(224,186,215)] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[rgb(42,71,71)] rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="text-center mb-12 relative z-10">
        <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
          Your 2025
          <span className="block text-[rgb(67,151,117)] text-balance">Wrapped</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
          Dive deep into your year in music. Discover your top artists, songs, listening habits, and the moments that
          defined your soundtrack.
        </p>
        <Button
          size="lg"
          className="bg-[rgb(67,151,117)] text-black font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:bg-[rgb(87,171,137)] hover:scale-105 transition-all duration-300 border-0"
        >
          Get Started
        </Button>
      </section>

      {/* Category Navigation */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl relative z-10">
        <Link href="/artists" className="group">
          <Card className="bg-[rgb(42,71,71)] border-0 hover:bg-[rgb(52,81,81)] transition-all duration-300 cursor-pointer group-hover:scale-105 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-xl font-bold">Top Artists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm leading-relaxed">See your most played artists of the year.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/songs" className="group">
          <Card className="bg-[rgb(67,151,117)] border-0 hover:bg-[rgb(87,171,137)] transition-all duration-300 cursor-pointer group-hover:scale-105 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-black text-xl font-bold">Top Songs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900 text-sm leading-relaxed">Your favorite tracks, all in one place.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/habits" className="group">
          <Card className="bg-[rgb(224,186,215)] border-0 hover:bg-[rgb(234,196,225)] transition-all duration-300 cursor-pointer group-hover:scale-105 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-black text-xl font-bold">Listening Habits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-900 text-sm leading-relaxed">Discover when and how you listen most.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/sessions" className="group">
          <Card className="bg-[rgb(30,30,30)] border border-gray-700 hover:bg-[rgb(40,40,40)] hover:border-[rgb(67,151,117)] transition-all duration-300 cursor-pointer group-hover:scale-105 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-xl font-bold">Longest Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm leading-relaxed">Relive your marathon listening moments.</p>
            </CardContent>
          </Card>
        </Link>
      </section>
    </main>
  )
}
