export {};
const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3000";

type ShiftDTO = {
  id: number;
  workplaceId: number;
  workerId: number | null;
  startAt: string;
  endAt: string;
  cancelledAt: string | null;
};

type WorkerDTO = {
  id: number;
  name: string;
  status: number;
};

type ApiEnvelope<T> = { data: T } | T;

function unwrap<T>(payload: ApiEnvelope<T>): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

function isCompletedShift(shift: ShiftDTO, nowMs: number): boolean {
  if (shift.workerId == null) return false;
  if (shift.cancelledAt != null) return false;

  const endMs = Date.parse(shift.endAt);
  return Number.isFinite(endMs) && endMs <= nowMs;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  return (await response.json()) as T;
}

async function main(): Promise<void> {
  const nowMs = Date.now();

  const workersPayload = await fetchJson<ApiEnvelope<WorkerDTO[]>>(
    `${API_BASE_URL}/workers`,
  );
  const workers = unwrap(workersPayload).filter((w) => w.status === 0);

  const activeWorkerById = new Map<number, string>(
    workers.map((worker) => [worker.id, worker.name]),
  );

  const shiftsPayload = await fetchJson<ApiEnvelope<ShiftDTO[]>>(
    `${API_BASE_URL}/shifts`,
  );
  const shifts = unwrap(shiftsPayload);

  const counts = new Map<number, number>();

  for (const shift of shifts) {
    if (!isCompletedShift(shift, nowMs)) continue;
    if (shift.workerId == null) continue;
    if (!activeWorkerById.has(shift.workerId)) continue;

    counts.set(shift.workerId, (counts.get(shift.workerId) ?? 0) + 1);
  }

  const topWorkers = [...counts.entries()]
    .sort((a, b) => {
      const shiftDiff = b[1] - a[1];
      if (shiftDiff !== 0) return shiftDiff;

      return activeWorkerById.get(a[0])!.localeCompare(activeWorkerById.get(b[0])!);
    })
    .slice(0, 3)
    .map(([workerId, shifts]) => ({
      name: activeWorkerById.get(workerId)!,
      shifts,
    }));

  process.stdout.write(`${JSON.stringify(topWorkers, null, 2)}\n`);
}

void main().catch(() => {
  process.exitCode = 1;
});
