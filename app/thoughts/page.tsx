import ThoughtsClient from "@/components/ThoughtsClient";
import { getThoughts } from "@/lib/thoughts.server";

export default function Thoughts() {
  const entries = getThoughts();
  return <ThoughtsClient initialEntries={entries} />;
}
