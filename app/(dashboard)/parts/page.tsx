import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PartsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Parts & Maintenance</h1>
          <p className="text-muted-foreground">
            Track replacement parts and maintenance schedules
          </p>
        </div>
        <Button asChild>
          <Link href="/parts/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Part
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No parts yet</CardTitle>
          <CardDescription>
            Add replacement parts to track your inventory and maintenance needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/parts/new">Add Your First Part</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
