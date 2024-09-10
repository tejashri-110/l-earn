import React, { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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

export default function Homepage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    workingStatus: '',
    occupation: '',
    monthlyIncome: '',
    monthlySpendings: '',
    livingPlace: '',
    currentSavings: '',
    investmentExperience: '',
    investmentTypes: [],
    targetAmount: '',
    targetAmountDetails: '',
    financialGoals: [],
    durationToAchieveGoal: '',
    investmentStrategies: []
  })
  const [sortBy, setSortBy] = useState<'risk' | 'duration'>('risk')

  const questions = [
    { key: 'gender', question: "Gender", type: 'select', options: ['Male', 'Female', 'Other'] },
    { key: 'age', question: "Age", type: 'number' },
    { key: 'workingStatus', question: "Working/Non-working", type: 'radio', options: ['Working', 'Non-working'] },
    { key: 'occupation', question: "Occupation", type: 'text', condition: (data) => data.workingStatus === 'Working' },
    { key: 'monthlyIncome', question: "Monthly Income", type: 'number' },
    { key: 'monthlySpendings', question: "Monthly spendings", type: 'number' },
    { key: 'livingPlace', question: "Where do you live", type: 'text' },
    { key: 'currentSavings', question: "Please specify your Current Savings", type: 'number' },
    { key: 'investmentExperience', question: "How much Investment experience do you have?", type: 'select', options: ['None', 'Beginner', 'Intermediate', 'Expert'] },
    { key: 'investmentTypes', question: "If yes, please specify types of investments", type: 'checkbox', options: ['Stocks', 'Bonds', 'Mutual Funds', 'Real Estate', 'Crypto Currencies', 'Other'] },
    { key: 'targetAmount', question: "Target Amount (Do you have a specific target amount that you aim to invest?)", type: 'radio', options: ['Yes', 'No'] },
    { key: 'targetAmountDetails', question: "Target Amount Details", type: 'radio', options: ['Below 1000', '1K – 5K', '5K – 10K', 'Above 10K'], condition: (data) => data.targetAmount === 'Yes' },
    { key: 'financialGoals', question: "What are your main financial goals?", type: 'checkbox', options: [
      'Saving for a big purchase (e.g., car, house)',
      'Paying off student loans or other debt',
      'Building an emergency fund',
      'Saving for retirement',
      'Growing wealth through investing',
      'Saving for education',
      'Just getting started with investing'
    ]},
    { key: 'durationToAchieveGoal', question: "Duration to achieve this goal", type: 'radio', options: ['6 – 12 months', '1 – 5 years', '5 – 10 years', 'More than 10 years'] },
    { key: 'investmentStrategies', question: "What investment strategies are you interested in?", type: 'checkbox', options: ['Long Term Growth', 'Short Term Gains', 'Income Generation', 'Preservation Capital'] },
  ]

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleNext = () => {
    let nextQuestion = currentQuestion + 1
    while (nextQuestion < questions.length) {
      const q = questions[nextQuestion]
      if (!q.condition || q.condition(formData)) {
        setCurrentQuestion(nextQuestion)
        break
      }
      nextQuestion++
    }
  }

  const handlePrev = () => {
    let prevQuestion = currentQuestion - 1
    while (prevQuestion >= 0) {
      const q = questions[prevQuestion]
      if (!q.condition || q.condition(formData)) {
        setCurrentQuestion(prevQuestion)
        break
      }
      prevQuestion--
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to a server
  }

  const renderQuestion = () => {
    const q = questions[currentQuestion]
    if (q.condition && !q.condition(formData)) {
      handleNext()
      return null
    }

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#155887] mb-4">
          {currentQuestion + 1}. {q.question}
        </h2>
        {q.type === 'select' && (
          <Select value={formData[q.key]} onValueChange={(value) => handleInputChange(q.key, value)}>
            <SelectTrigger className="bg-white text-[#155887] border-[#155887]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {q.options.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {q.type === 'number' && (
          <Input 
            type="number" 
            value={formData[q.key]} 
            onChange={(e) => handleInputChange(q.key, e.target.value)}
            className="bg-white text-[#155887] border-[#155887]"
          />
        )}
        {q.type === 'text' && (
          <Input 
            type="text" 
            value={formData[q.key]} 
            onChange={(e) => handleInputChange(q.key, e.target.value)}
            className="bg-white text-[#155887] border-[#155887]"
          />
        )}
        {q.type === 'radio' && (
          <RadioGroup value={formData[q.key]} onValueChange={(value) => handleInputChange(q.key, value)}>
            {q.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} className="border-[#155887] text-[#155887]" />
                <Label htmlFor={option} className="text-[#155887]">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        {q.type === 'checkbox' && (
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={formData[q.key].includes(option)}
                  onCheckedChange={(checked) => {
                    const updatedValues = checked
                      ? [...formData[q.key], option]
                      : formData[q.key].filter(item => item !== option)
                    handleInputChange(q.key, updatedValues)
                  }}
                  className="border-[#155887] text-[#155887] data-[state=checked]:bg-[#155887] data-[state=checked]:text-white"
                />
                <label htmlFor={option} className="text-sm font-medium text-[#155887]">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

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
    const goalDuration = 2 // 2 years
    const ratio = duration / (goalDuration * 12)
    if (ratio <= 1) return 'text-green-600'
    if (ratio <= 1.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#5DFED3]">
      <header className="flex items-center justify-between p-4 bg-[#155887]">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#5DFED3]">L(Earn)</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          {["Modules", "Videos", "Certified", "Junior", "Blog", "Live", "Financial Survey", "Investment"].map((item) => (
            <a key={item} className="text-white hover:text-[#5DFED3]" href={`#${item.toLowerCase().replace(' ', '-')}`}>
              {item}
            </a>
          ))}
        </nav>
      </header>
      <main className="flex-grow">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="w-full justify-start bg-[#155887] p-0">
            <TabsTrigger value="home" className="data-[state=active]:bg-[#5DFED3] data-[state=active]:text-[#155887]">Home</TabsTrigger>
            <TabsTrigger value="financial-survey" className="data-[state=active]:bg-[#5DFED3] data-[state=active]:text-[#155887]">Financial Survey</TabsTrigger>
            <TabsTrigger value="investment" className="data-[state=active]:bg-[#5DFED3] data-[state=active]:text-[#155887]">Investment</TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <section className="container mx-auto px-4 py-16 md:py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#155887]">Free and open</h1>
                  <p className="text-xl md:text-2xl mb-6 text-[#155887]">stock market and financial education</p>
                  <p className="mb-8 text-[#155887]">
                    L(Earn) is an extensive and in-depth collection of stock market and financial lessons. It is free and openly
                    accessible to everyone and is one of the largest financial education resources on the web. No signup, no pay-wall,
                    no ads.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-[400px] h-[300px] bg-[#155887] flex items-center justify-center text-[#5DFED3]">
                    Illustration Placeholder
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
          <TabsContent value="financial-survey">
            <section className="container mx-auto px-4 py-16" id="financial-survey">
              <h2 className="text-3xl font-bold mb-8 text-[#155887]">Financial Survey Quiz</h2>
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <Progress value={(currentQuestion + 1) / questions.length * 100} className="mb-6" />
                <form onSubmit={handleSubmit} className="space-y-8">
                  {renderQuestion()}
                  <div className="flex justify-between">
                    {currentQuestion > 0 && (
                      <Button 
                        type="button" 
                        onClick={handlePrev}
                        className="bg-[#155887] text-white hover:bg-blue-700"
                      >
                        Previous
                      </Button>
                    )}
                    {currentQuestion < questions.length - 1 ? (
                      <Button 
                        type="button" 
                        onClick={handleNext}
                        className="bg-[#155887] text-white hover:bg-blue-700"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button 
                        type="submit"
                        className="bg-[#155887] text-white hover:bg-blue-700"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </section>
          </TabsContent>
          <TabsContent value="investment">
            <div className="container mx-auto p-4">
              {/* Goal Display Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#155887]">
                <h2 className="text-2xl font-semibold text-[#155887] mb-4">Your Investment Goal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg text-gray-600">Target Amount:</p>
                    <p className="text-2xl font-bold text-[#155887]">₹500,000</p>
                  </div>
                  <div>
                    <p className="text-lg text-gray-600">Time Frame:</p>
                    <p className="text-2xl font-bold text-[#155887]">2 years</p>
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
                          {product.durationToAchieveGoal / 12 <= 2 ? " (Meets your goal)" : ""}
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
          </TabsContent>
        </Tabs>
      </main>
      <footer className="bg-[#155887] text-white py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 L(Earn). All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}