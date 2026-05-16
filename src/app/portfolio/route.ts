import { NextResponse } from "next/server";
import { gridLayoutItems, mockProjects } from "@/lib/mock-data";

export async function GET() {
  try {
    // Simulating a minor database read latency (100ms) 
    // This tests your loading skeletons and prevents layout shifting
    await new Promise((resolve) => setTimeout(resolve, 100));

    /* FUTURE DATABASE BLOCK:
      When you connect your DB later, you'll just replace the lines below with:
      const gridLayoutItems = await db.gridItems.findMany();
      const mockProjects = await db.projects.findMany();
    */

    return NextResponse.json({
      gridLayoutItems,
      mockProjects,
    });
  } catch (error) {
    console.error("Internal Portfolio API Error:", error);
    return NextResponse.json(
      { error: "Failed to read portfolio pipeline data" },
      { status: 500 }
    );
  }
}