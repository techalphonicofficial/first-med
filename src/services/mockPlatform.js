const delay = (value, ms = 260) => new Promise((resolve) => window.setTimeout(() => resolve(value), ms));

export const roleOptions = [
  { value: "customer", label: "Customer" },
  { value: "vendor", label: "Vendor" },
  { value: "warehouse", label: "Warehouse" },
  { value: "delivery", label: "Delivery" },
  { value: "admin", label: "Admin" }
];

export const permissionMatrix = {
  customer: ["/", "/products", "/cart", "/checkout", "/account", "/prescription", "/membership", "/subscription", "/track"],
  vendor: ["/vendor", "/products", "/account"],
  warehouse: ["/warehouse", "/account"],
  delivery: ["/delivery", "/account", "/track"],
  admin: ["/admin", "/warehouse", "/vendor", "/delivery", "/subscription", "/membership", "/account"]
};

export function canAccessPath(role, pathname) {
  const allowed = permissionMatrix[role] || permissionMatrix.customer;
  return allowed.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export async function fetchWorkspaceRecords(module) {
  return delay(module.records.map((record, index) => ({
    id: record[0],
    title: record[1],
    status: record[2],
    context: record[3],
    owner: ["Ops lead", "Pharmacist", "Warehouse lead", "Finance"][index % 4],
    priority: index === 0 ? "High" : index === 1 ? "Medium" : "Low",
    updatedAt: `${index + 4} min ago`
  })));
}

export async function saveWorkspaceDraft(payload) {
  return delay({
    id: `DRAFT-${Date.now().toString().slice(-5)}`,
    status: "Saved",
    ...payload
  }, 420);
}

export async function approveWorkspaceRecord(record) {
  return delay({
    ...record,
    status: "Approved",
    updatedAt: "Just now"
  }, 360);
}

export async function uploadMockFile(file, moduleKey) {
  return delay({
    name: file?.name || "sample-upload.pdf",
    size: file?.size || 124000,
    moduleKey,
    status: "Validated",
    rows: moduleKey === "vendor" ? 42 : 1,
    issues: moduleKey === "vendor" ? 3 : 0
  }, 520);
}

export function createCsv(records) {
  const header = ["ID", "Title", "Status", "Context", "Owner", "Priority"];
  const rows = records.map((record) => [record.id, record.title, record.status, record.context, record.owner, record.priority]);
  return [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
}

export function buildAuditTrail(moduleKey, activeLabel) {
  return [
    { event: `${activeLabel} opened`, actor: "Current role", time: "Just now", type: "View" },
    { event: "Permission checked", actor: moduleKey === "admin" ? "Admin" : "System", time: "1 min ago", type: "Security" },
    { event: "Mock data loaded", actor: "React Query", time: "2 min ago", type: "Data" },
    { event: "Frontend state prepared", actor: "FirstMED UI", time: "3 min ago", type: "UI" }
  ];
}

export function getMapSimulation(moduleKey) {
  if (moduleKey === "delivery") {
    return {
      title: "Live delivery route",
      start: "FirstMED Plus Sector 21",
      end: "Block C, Green Park",
      eta: "18 min",
      progress: 68
    };
  }
  if (moduleKey === "warehouse") {
    return {
      title: "Warehouse service area",
      start: "NCR Central Warehouse",
      end: "South Delhi service cluster",
      eta: "4 zones",
      progress: 82
    };
  }
  return {
    title: "Operational coverage",
    start: "FirstMED network",
    end: "Active service region",
    eta: "Healthy",
    progress: 74
  };
}

export function getPaymentSimulation(moduleKey) {
  if (moduleKey === "membership") {
    return { title: "Membership payment", amount: "Rs. 999", status: "Ready for mock checkout", method: "UPI / Card" };
  }
  if (moduleKey === "subscription") {
    return { title: "Subscription billing", amount: "Rs. 1,480", status: "Next cycle preview", method: "Saved payment" };
  }
  if (moduleKey === "vendor") {
    return { title: "Vendor settlement", amount: "Rs. 12,480", status: "Settlement pending", method: "Bank transfer" };
  }
  return { title: "Payment state", amount: "Rs. 430", status: "Mock state only", method: "COD / Prepaid" };
}
