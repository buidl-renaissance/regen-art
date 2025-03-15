'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number
  condition: string
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('/api/weather')
        if (!res.ok) throw new Error('Failed to fetch weather')
        const data = await res.json()
        setWeather(data)
      } catch (err) {
        setError('Unable to load weather')
        console.error(err)
      }
    }

    fetchWeather()
    // Refresh weather data every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (error) return null // Silently fail if weather can't be loaded
  if (!weather) return null // Don't show anything while loading

  return (
    <div className="flex items-center gap-2 text-white">
      <span className="text-4xl font-bold">{weather.temp}°F</span>
      <span className="text-lg">{weather.condition}</span>
    </div>
  )
}

