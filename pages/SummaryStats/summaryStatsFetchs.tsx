import axios from "axios";
import { PlayerData } from "../components/LoadData";

const BASE = "http://localhost:5000";

export async function calculateSummaryStats() {
  await axios.post(`${BASE}/summary-stat`);
}

export async function getSummaryStats(): Promise<PlayerData[]> {
  const summaryStats: PlayerData[] = (await axios.get(`${BASE}/summary-stat`))
    .data;
  return summaryStats;
}
