import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrintersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Printers</h1>
          <p className="text-muted-foreground">
            Manage your 3D printers
          </p>
        </div>
        <Button asChild>
          <Link href="/printers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Printer
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No printers yet</CardTitle>
          <CardDescription>
            Add your first printer to start tracking usage and maintenance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/printers/new">Add Your First Printer</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
