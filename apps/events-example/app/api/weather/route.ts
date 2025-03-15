import { NextResponse } from 'next/server'

const API_KEY = process.env.OPENWEATHER_API_KEY
const DETROIT_LAT = 42.3314
const DETROIT_LON = -83.0458

export async function GET() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${DETROIT_LAT}&lon=${DETROIT_LON}&appid=${API_KEY}&units=imperial`
    )
    
    if (!res.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const data = await res.json()
    
    return NextResponse.json({
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}

