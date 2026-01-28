import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pricing Calculator</h1>
        <p className="text-muted-foreground">
          Calculate costs and generate quotes for your prints
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Price Calculator</CardTitle>
            <CardDescription>
              Enter print details to calculate the cost
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Coming soon - Connect your Supabase database to enable the pricing calculator
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing Settings</CardTitle>
            <CardDescription>
              Configure your base rates and markups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Coming soon - Set up electricity costs, labor rates, and material markups
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
