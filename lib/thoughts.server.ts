import fs from "fs";
import path from "path";
import type { ThoughtEntry } from "@/lib/thoughts";
import { parseThoughtsMarkdown } from "@/lib/thoughts";

const dataFile = path.join(process.cwd(), "content/thoughts.md");

export function getThoughts(): ThoughtEntry[] {
  if (!fs.existsSync(dataFile)) return [];
  try {
    return parseThoughtsMarkdown(fs.readFileSync(dataFile, "utf8"));
  } catch {
    return [];
  }
}
