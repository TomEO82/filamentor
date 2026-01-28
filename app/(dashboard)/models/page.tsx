import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Model Library</h1>
          <p className="text-muted-foreground">
            Store and manage your printable models
          </p>
        </div>
        <Button asChild>
          <Link href="/models/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Model
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No models yet</CardTitle>
          <CardDescription>
            Add models to your library with print settings and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/models/new">Add Your First Model</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
