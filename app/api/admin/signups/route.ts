import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to the signups.json file
    const signupsFile = path.join(process.cwd(), "data", "signups.json");

    // Check if the file exists
    if (!fs.existsSync(signupsFile)) {
      return NextResponse.json({ signups: [] }, { status: 200 });
    }

    // Read the file
    const fileData = fs.readFileSync(signupsFile, "utf8");
    const signups = JSON.parse(fileData);

    // Sort signups with newest first
    signups.sort((a: any, b: any) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    // Return the signups data
    return NextResponse.json({ signups }, { status: 200 });
  } catch (error) {
    console.error("Error reading signups data:", error);

    return NextResponse.json(
      { error: "Failed to retrieve signups data" },
      { status: 500 }
    );
  }
}
