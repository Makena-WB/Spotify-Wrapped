import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Helper to fetch JSON from public folder
async function getSessionData() {
  const res = await fetch("/session_summary.json")
  if (!res.ok) throw new Error("Failed to fetch session data")
  return res.json()
}

// Helper to extract artist info from session data
function extractArtistInfo(sessionData: any[]) {
  // Assume each session has a 'tracks' array and possibly 'artistName' info
  const artistStats: Record<
    string,
    { playCount: number; sessions: number; totalMinutes: number; tracks: string[] }
  > = {}
  // Temporary map to hold Sets before conversion
  sessionData.forEach((session) => {
    if (session.tracks && Array.isArray(session.tracks)) {
      session.tracks.forEach((track: string) => {
        const artist = track // Replace with actual artist extraction if needed
        if (!artistStats[artist]) {
          artistStats[artist] = {
            playCount: 0,
            sessions: 0,
            totalMinutes: 0,
            tracks: [],
          }
          artistStats[artist].tracks = new Set()
        }
        artistStats[artist].playCount += 1
        artistStats[artist].tracks.add(track)
        artistStats[artist].totalMinutes += session.total_minutes || 0
      })
      session.tracks.forEach((track: string) => {
        artistStats[track].sessions += 1
      })
    }
  })

  // Convert tracks Set to array for display
  Object.entries(artistTrackSets).forEach(([artist, trackSet]) => {
    artistStats[artist].tracks = Array.from(trackSet)
  })

  return artistStats

  return artistStats
}

export default async function ArtistsPage() {
  const sessionData = await getSessionData()
  const artistStats = extractArtistInfo(sessionData)
  const sortedArtists = Object.entries(artistStats).sort((a, b) => b[1].playCount - a[1].playCount)

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "rgb(18, 18, 18)" }}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: "rgb(67, 151, 117)" }}
        ></div>
        <div
          className="absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ backgroundColor: "rgb(224, 186, 215)" }}
          data-delay="1000"
        ></div>
        <div
          className="absolute -bottom-40 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ backgroundColor: "rgb(42, 71, 71)" }}
          data-delay="2000"
        ></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">Your Top</h1>
          <h1
            className="text-6xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            style={{ textShadow: `0 0 30px rgb(67, 151, 117)` }}
          >
            Artists
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the artists that defined your musical journey this year
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sortedArtists.map(([artist, info], index) => {
            const colors = [
              "rgb(67, 151, 117)", // Spotify green
              "rgb(42, 71, 71)", // Dark teal
              "rgb(224, 186, 215)", // Soft pink
            ]
            const bgColor = colors[index % colors.length]

            return (
              <Card
                key={artist}
                className="group relative overflow-hidden border-0 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
                style={{ backgroundColor: bgColor }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl font-bold text-white text-balance leading-tight">{artist}</CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors"
                    >
                      {info.playCount} plays
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors"
                    >
                      {info.sessions} sessions
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-0 hover:bg-white/30 transition-colors"
                    >
                      {info.totalMinutes.toFixed(1)} min
                    </Badge>
                  </div>

                  <div>
                    <span className="font-semibold text-white/90 text-sm uppercase tracking-wide">Top Tracks</span>
                    <ul className="mt-3 space-y-1">
                      {info.tracks.slice(0, 5).map((track: string, idx: number) => (
                        <li key={idx} className="text-white/80 text-sm leading-relaxed">
                          • {track}
                        </li>
                      ))}
                      {info.tracks.length > 5 && (
                        <li className="text-white/60 text-xs italic">+{info.tracks.length - 5} more tracks</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
