import React, { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

const investmentProducts = [
  { name: "Savings Accounts", averageReturn: 3, risk: 0, durationToAchieveGoal: 72 },
  { name: "Fixed Deposits (FDs)", averageReturn: 5, risk: 10, durationToAchieveGoal: 60 },
  { name: "Public Provident Fund (PPF)", averageReturn: 7, risk: 15, durationToAchieveGoal: 48 },
  { name: "National Pension Scheme (NPS)", averageReturn: 8, risk: 20, durationToAchieveGoal: 45 },
  { name: "Bonds", averageReturn: 6, risk: 25, durationToAchieveGoal: 54 },
  { name: "Gold & Precious Metals", averageReturn: 8, risk: 30, durationToAchieveGoal: 45 },
  { name: "Unit Linked Insurance Plans (ULIPs)", averageReturn: 10, risk: 40, durationToAchieveGoal: 40 },
  { name: "Mutual Funds", averageReturn: 12, risk: 50, durationToAchieveGoal: 36 },
  { name: "Real Estate", averageReturn: 15, risk: 60, durationToAchieveGoal: 32 },
  { name: "Peer-to-Peer (P2P) Lending", averageReturn: 18, risk: 70, durationToAchieveGoal: 28 },
  { name: "Stock Market (Equity Investing)", averageReturn: 20, risk: 80, durationToAchieveGoal: 26 },
  { name: "Cryptocurrency", averageReturn: 25, risk: 100, durationToAchieveGoal: 22 },
]

export default function InvestmentProducts() {
  const [sortBy, setSortBy] = useState<'risk' | 'duration'>('risk')

  // User's goal details
  const goalAmount = 500000 // 5 Lakhs INR
  const goalDuration = 2 // 2 years

  const sortedProducts = useMemo(() => {
    return [...investmentProducts].sort((a, b) => {
      if (sortBy === 'risk') {
        return a.risk - b.risk
      } else {
        return a.durationToAchieveGoal - b.durationToAchieveGoal
      }
    })
  }, [sortBy])

  const getRiskColor = (risk, name) => {
    if (name === "Cryptocurrency") return 'bg-red-900'
    if (risk <= 20) return 'bg-green-800'
    if (risk <= 40) return 'bg-green-600'
    if (risk <= 60) return 'bg-red-600'
    if (risk <= 80) return 'bg-red-700'
    return 'bg-red-800'
  }

  const getRiskLabel = (risk) => {
    if (risk <= 20) return 'Low Risk'
    if (risk <= 50) return 'Medium Risk'
    return 'High Risk'
  }

  const getTimeToGoalColor = (duration) => {
    const ratio = duration / (goalDuration * 12)
    if (ratio <= 1) return 'text-green-600'
    if (ratio <= 1.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-[#155887] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">L(EARN)</Link>
          <div className="space-x-4">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {/* Goal Display Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#155887]">
          <h2 className="text-2xl font-semibold text-[#155887] mb-4">Your Investment Goal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg text-gray-600">Target Amount:</p>
              <p className="text-2xl font-bold text-[#155887]">₹{goalAmount.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-lg text-gray-600">Time Frame:</p>
              <p className="text-2xl font-bold text-[#155887]">{goalDuration} years</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[200px] border-[#155887] text-[#155887]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="risk">Sort by Risk</SelectItem>
              <SelectItem value="duration">Sort by Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.name} className="overflow-hidden shadow-lg">
              <CardHeader className={`${getRiskColor(product.risk, product.name)} p-4`}>
                <CardTitle className="text-lg font-semibold text-white">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 bg-white">
                <div className="space-y-2">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Average Return:</span> {product.averageReturn}%
                  </p>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Risk Level:</span> {getRiskLabel(product.risk)}
                  </p>
                  <p className={`text-sm ${getTimeToGoalColor(product.durationToAchieveGoal)}`}>
                    <span className="font-medium">Time to Goal:</span> {(product.durationToAchieveGoal / 12).toFixed(1)} years
                    {product.durationToAchieveGoal / 12 <= goalDuration ? " (Meets your goal)" : ""}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 p-4">
                <Button className="w-full bg-[#155887] text-white">
                  LEARN
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}