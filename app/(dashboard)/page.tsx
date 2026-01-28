import {
  ShoppingCart,
  Printer,
  AlertTriangle,
  TrendingUp,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Placeholder stats - will be dynamic when database is connected
const stats = [
  {
    name: "Active Orders",
    value: "0",
    icon: ShoppingCart,
    href: "/orders",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Printers Online",
    value: "0/0",
    icon: Printer,
    href: "/printers",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    name: "Low Stock Alerts",
    value: "0",
    icon: AlertTriangle,
    href: "/filaments",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    name: "Monthly Revenue",
    value: "$0",
    icon: TrendingUp,
    href: "/analytics",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Filamentor. Here&apos;s an overview of your business.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/orders/new">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to help you get started</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/filaments/new">Add Filament</Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/printers/new">Add Printer</Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/customers/new">Add Customer</Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/pricing">Calculate Price</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              <p>No recent activity yet</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup Guide */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Complete these steps to set up your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-xs text-muted-foreground">
                1
              </div>
              <span className="text-sm">Add your first printer</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-xs text-muted-foreground">
                2
              </div>
              <span className="text-sm">Add your filament inventory</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-xs text-muted-foreground">
                3
              </div>
              <span className="text-sm">Configure your pricing settings</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-xs text-muted-foreground">
                4
              </div>
              <span className="text-sm">Create your first order</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
