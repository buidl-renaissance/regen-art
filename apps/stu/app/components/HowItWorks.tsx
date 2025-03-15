import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Banknote, Briefcase, Users } from "lucide-react"

const features = [
  {
    title: "Stable Growth Through Municipal Bonds",
    description:
      "Your investment helps fund Detroit's roads, schools, and public services while generating reliable returns.",
    icon: Banknote,
  },
  {
    title: "Fueling Small Business Success",
    description:
      "We reinvest returns into local entrepreneurs—cafés, creative spaces, and gathering places that make Detroit a thriving, connected city.",
    icon: Briefcase,
  },
  {
    title: "Building Wealth for the Community",
    description:
      "By supporting Detroit's future, you're helping create financial opportunities for residents and businesses alike.",
    icon: Users,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-blue-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

