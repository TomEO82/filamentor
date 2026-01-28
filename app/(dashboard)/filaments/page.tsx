import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FilamentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Filaments</h1>
          <p className="text-muted-foreground">
            Manage your filament inventory
          </p>
        </div>
        <Button asChild>
          <Link href="/filaments/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Filament
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No filaments yet</CardTitle>
          <CardDescription>
            Add your first filament to start tracking your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/filaments/new">Add Your First Filament</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
