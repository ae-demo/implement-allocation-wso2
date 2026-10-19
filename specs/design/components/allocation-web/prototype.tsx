import { useState, type ReactNode } from "react";
import {
  Alert, AppShell, Breadcrumbs, Button, Detail, Dialog, EmptyState, Field, Filters, Form, Heading, Screen,
  Section, Stack, Stat, StatGroup, Table, Text, ValidationSummary, defineApp, useCollection, useDisplayState,
  useNav, useParams, useRole, useToday,
} from "@wso2/prototype-kit";

type Tone = "default" | "info" | "success" | "warning" | "error";

interface Engagement { id: string; name: string; customer: string; country: string; status: string; owner: string }
interface Employee { id: string; name: string; email: string; department: string; country: string; manager: string }
interface Consultant { id: string; name: string; email: string; department: string; country: string; manager: string; active: boolean }
interface Rate { id: string; consultantId: string; hourly: string; currency: string; effectiveFrom: string }
interface Allocation {
  id: string; engagementId: string; engagement: string; consultantId: string; consultant: string;
  startDate: string; endDate: string; percentage: number; travel: boolean; status: string;
}
interface Expense {
  id: string; engagementId: string; engagement: string; allocation: string; description: string;
  date: string; amount: string; currency: string; status: string;
}
interface CostEngagement { id: string; name: string; owner: string; hours: number; cost: number }
interface CostConsultant { id: string; name: string; hours: number; cost: number }
interface CostLine { id: string; engagement: string; owner: string; consultant: string; hours: number; cost: number }

const engagements: Engagement[] = [
  { id: "e1", name: "Acme Integration Platform", customer: "Acme Corp", country: "United States", status: "Active", owner: "Priya Jayawardena" },
  { id: "e2", name: "Northwind API Migration", customer: "Northwind Traders", country: "United Kingdom", status: "Draft", owner: "Priya Jayawardena" },
  { id: "e3", name: "Contoso Identity Rollout", customer: "Contoso Ltd", country: "Australia", status: "Closed", owner: "Priya Jayawardena" },
  { id: "e4", name: "Globex Data Services", customer: "Globex", country: "Singapore", status: "Active", owner: "Kasun Wijesinghe" },
  { id: "e5", name: "Initech Support Uplift", customer: "Initech", country: "Sri Lanka", status: "Draft", owner: "Kasun Wijesinghe" },
];

const employees: Employee[] = [
  { id: "p1", name: "Dilani Fernando", email: "dilani@wso2.example", department: "Professional Services", country: "Sri Lanka", manager: "Nimal Perera" },
  { id: "p2", name: "Arjun Menon", email: "arjun@wso2.example", department: "Solutions Architecture", country: "India", manager: "Nimal Perera" },
  { id: "p3", name: "Chamara Silva", email: "chamara@wso2.example", department: "Professional Services", country: "Sri Lanka", manager: "Nimal Perera" },
];

const consultants: Consultant[] = [
  { id: "c1", name: "Ravi Perera", email: "ravi@wso2.example", department: "Professional Services", country: "Sri Lanka", manager: "Nimal Perera", active: true },
  { id: "c2", name: "Maya Fernando", email: "maya@wso2.example", department: "Solutions Architecture", country: "Sri Lanka", manager: "Nimal Perera", active: true },
  { id: "c3", name: "Ana Silva", email: "ana@wso2.example", department: "Professional Services", country: "United Kingdom", manager: "Nimal Perera", active: true },
  { id: "c4", name: "Tharindu Bandara", email: "tharindu@wso2.example", department: "Professional Services", country: "Sri Lanka", manager: "Nimal Perera", active: false },
];

const rates: Rate[] = [
  { id: "r1", consultantId: "c1", hourly: "55.00", currency: "USD", effectiveFrom: "2025-01-01" },
  { id: "r2", consultantId: "c1", hourly: "60.00", currency: "USD", effectiveFrom: "2026-01-01" },
  { id: "r3", consultantId: "c2", hourly: "72.00", currency: "USD", effectiveFrom: "2025-06-01" },
  { id: "r4", consultantId: "c3", hourly: "65.00", currency: "GBP", effectiveFrom: "2025-03-01" },
  { id: "r5", consultantId: "c4", hourly: "40.00", currency: "USD", effectiveFrom: "2024-09-01" },
  { id: "r6", consultantId: "c2", hourly: "78.00", currency: "USD", effectiveFrom: "2026-04-01" },
];

const allocations: Allocation[] = [
  { id: "a1", engagementId: "e1", engagement: "Acme Integration Platform", consultantId: "c1", consultant: "Ravi Perera", startDate: "2026-01-05", endDate: "2026-03-27", percentage: 100, travel: true, status: "Active" },
  { id: "a2", engagementId: "e1", engagement: "Acme Integration Platform", consultantId: "c2", consultant: "Maya Fernando", startDate: "2026-02-02", endDate: "2026-04-30", percentage: 50, travel: false, status: "Active" },
  { id: "a3", engagementId: "e4", engagement: "Globex Data Services", consultantId: "c2", consultant: "Maya Fernando", startDate: "2026-02-02", endDate: "2026-04-30", percentage: 50, travel: true, status: "Active" },
  { id: "a4", engagementId: "e4", engagement: "Globex Data Services", consultantId: "c3", consultant: "Ana Silva", startDate: "2026-03-02", endDate: "2026-06-30", percentage: 80, travel: false, status: "Active" },
  { id: "a5", engagementId: "e3", engagement: "Contoso Identity Rollout", consultantId: "c4", consultant: "Tharindu Bandara", startDate: "2025-09-01", endDate: "2025-12-19", percentage: 100, travel: false, status: "Ended" },
];

const expenses: Expense[] = [
  { id: "x1", engagementId: "e1", engagement: "Acme Integration Platform", allocation: "Ravi Perera", description: "Flight to Austin", date: "2026-01-04", amount: "1,240.00", currency: "USD", status: "Submitted" },
  { id: "x2", engagementId: "e1", engagement: "Acme Integration Platform", allocation: "Ravi Perera", description: "Hotel, 5 nights", date: "2026-01-09", amount: "980.00", currency: "USD", status: "Draft" },
  { id: "x3", engagementId: "e4", engagement: "Globex Data Services", allocation: "Maya Fernando", description: "Flight to Singapore", date: "2026-02-01", amount: "860.00", currency: "SGD", status: "Draft" },
];

const costEngagements: CostEngagement[] = [
  { id: "ce1", name: "Acme Integration Platform", owner: "Priya Jayawardena", hours: 760, cost: 49200 },
  { id: "ce2", name: "Globex Data Services", owner: "Kasun Wijesinghe", hours: 640, cost: 41600 },
  { id: "ce3", name: "Contoso Identity Rollout", owner: "Priya Jayawardena", hours: 600, cost: 24000 },
];

const costConsultants: CostConsultant[] = [
  { id: "cc1", name: "Ravi Perera", hours: 520, cost: 31200 },
  { id: "cc2", name: "Maya Fernando", hours: 400, cost: 28800 },
  { id: "cc3", name: "Ana Silva", hours: 480, cost: 41600 },
];

const costLines: CostLine[] = [
  { id: "cl1", engagement: "Acme Integration Platform", owner: "Priya Jayawardena", consultant: "Ravi Perera", hours: 520, cost: 31200 },
  { id: "cl2", engagement: "Acme Integration Platform", owner: "Priya Jayawardena", consultant: "Maya Fernando", hours: 240, cost: 18000 },
  { id: "cl3", engagement: "Contoso Identity Rollout", owner: "Priya Jayawardena", consultant: "Tharindu Bandara", hours: 600, cost: 24000 },
  { id: "cl4", engagement: "Globex Data Services", owner: "Kasun Wijesinghe", consultant: "Ana Silva", hours: 640, cost: 41600 },
];

const fallbackUser = { name: "Priya Jayawardena", email: "priya@wso2.example" };
const users: Record<string, { name: string; email: string }> = {
  EngagementManager: fallbackUser,
  ResourceManager: { name: "Nimal Perera", email: "nimal@wso2.example" },
  FinanceAnalyst: { name: "Sanduni Silva", email: "sanduni@wso2.example" },
};
const currencyOf: Record<string, string> = {
  "United States": "USD", "United Kingdom": "GBP", Australia: "AUD", Singapore: "SGD", "Sri Lanka": "LKR",
};
const countries = ["Sri Lanka", "United States", "United Kingdom", "Australia", "Singapore"];

function useUser() {
  return users[useRole()] ?? fallbackUser;
}

function statusTone(status: string): Tone {
  if (status === "Active" || status === "Submitted") return "success";
  if (status === "Draft") return "info";
  if (status === "Scheduled") return "warning";
  return "default";
}

function usd(value: number): string {
  return "$" + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function inForce(list: readonly Rate[], consultantId: string, today: string): Rate | undefined {
  return list
    .filter((r) => r.consultantId === consultantId && r.effectiveFrom <= today)
    .sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom))[0];
}

function Shell({ children }: { children: ReactNode }) {
  const user = useUser();
  return (
    <AppShell
      id="shell"
      user={user}
      nav={[
        { id: "nav.engagements", label: "Engagements", to: "screen.engagements" },
        { id: "nav.consultants", label: "Consultants", to: "screen.consultants" },
        { id: "nav.allocations", label: "Allocations", to: "screen.allocations" },
        { id: "nav.costs", label: "Costs", to: "screen.costs" },
        { id: "nav.travel", label: "Travel expenses", to: "screen.travel-expenses" },
      ]}
      account="screen.account"
      signOut="screen.signed-out"
    >
      {children}
    </AppShell>
  );
}

function Engagements() {
  const state = useDisplayState();
  const role = useRole();
  const user = useUser();
  const all = useCollection<Engagement>("engagements");
  const [status, setStatus] = useState("All");
  const mine = role === "EngagementManager";
  const visible = state === "state.empty" ? [] : all.items.filter((e) => !mine || e.owner === user.name);
  const rows = visible.filter((e) => status === "All" || e.status === status);
  const count = (s: string) => visible.filter((e) => e.status === s).length;
  return (
    <Shell>
      <Heading id="heading.engagements" text={mine ? "My engagements" : "Engagements"} />
      <StatGroup>
        <Stat id="stat.draft" label="Draft" value={String(count("Draft"))} hint="being prepared" icon="ClipboardList" tone="info" />
        <Stat id="stat.active" label="Active" value={String(count("Active"))} hint="open for allocation" icon="Briefcase" tone="success" />
        <Stat id="stat.closed" label="Closed" value={String(count("Closed"))} hint="finished" icon="CircleCheck" />
      </StatGroup>
      <Section
        id="section.engagements"
        title="Engagements"
        count={rows.length}
        subtitle={mine ? "Engagements you own." : "Every engagement, whoever owns it."}
        actions={mine ? <Button id="btn.new-engagement" label="New engagement" emphasis="primary" to="screen.engagement-new" /> : undefined}
      >
        <Filters id="filters.engagements">
          <Field id="field.status" label="Status" type="select" options={["All", "Draft", "Active", "Closed"]} value={status} onChange={setStatus} />
        </Filters>
        <Table
          id="table.engagements"
          columns={["Name", "Customer", "Country", "Owner", { label: "Status", kind: "status" }]}
          rows={rows.map((e) => ({
            id: `engagement.${e.id}`,
            cells: [e.name, e.customer, e.country, e.owner],
            status: { text: e.status, tone: statusTone(e.status) },
            to: "screen.engagement-detail",
            params: { engagement: e.id },
          }))}
          empty={<EmptyState id="empty.engagements" title="No engagements" text="Engagements appear here once they are created." />}
        />
      </Section>
    </Shell>
  );
}

function EngagementNew() {
  const state = useDisplayState();
  const navigate = useNav();
  const user = useUser();
  const all = useCollection<Engagement>("engagements");
  return (
    <Shell>
      <Breadcrumbs
        id="crumbs.new-engagement"
        items={[
          { id: "crumb.engagements", label: "Engagements", to: "screen.engagements" },
          { id: "crumb.new", label: "New engagement" },
        ]}
      />
      <Heading id="heading.new-engagement" text="New engagement" />
      {state === "state.validation-error" && (
        <ValidationSummary id="summary.engagement" issues={["Name is required", "Customer is required"]} />
      )}
      <Form
        id="form.engagement"
        title="Engagement details"
        onSubmit={(v) => {
          const id = all.create({
            name: v.name ?? "",
            customer: v.customer ?? "",
            country: v.country ?? "Sri Lanka",
            status: "Draft",
            owner: user.name,
          });
          navigate.go("screen.engagement-detail", { engagement: id });
        }}
        actions={
          <Stack direction="row">
            <Button id="btn.cancel-engagement" label="Cancel" to="screen.engagements" />
            <Button id="btn.save-engagement" label="Create engagement" emphasis="primary" submit />
          </Stack>
        }
      >
        <Field id="field.name" name="name" label="Name" required error={state === "state.validation-error" ? "Give the engagement a name" : undefined} />
        <Field id="field.customer" name="customer" label="Customer" required error={state === "state.validation-error" ? "Name the customer" : undefined} />
        <Field id="field.country" name="country" label="Country" type="select" options={countries} defaultValue="Sri Lanka" />
      </Form>
    </Shell>
  );
}

function EngagementDetail() {
  const { engagement: id } = useParams();
  const role = useRole();
  const all = useCollection<Engagement>("engagements");
  const allAllocations = useCollection<Allocation>("allocations");
  const [editing, setEditing] = useState(false);
  const e = (id ? all.get(id) : undefined) ?? all.items[0]!;
  const mine = role === "EngagementManager";
  const list = allAllocations.items.filter((a) => a.engagementId === e.id);
  return (
    <Shell>
      <Breadcrumbs
        id="crumbs.engagement"
        items={[
          { id: "crumb.engagements", label: "Engagements", to: "screen.engagements" },
          { id: "crumb.engagement", label: e.name },
        ]}
      />
      <Heading
        id="heading.engagement"
        text={e.name}
        actions={
          mine ? (
            <Stack direction="row">
              <Button id="btn.edit-engagement" label="Edit" onPress={() => setEditing(true)} />
              {e.status === "Draft" && (
                <Button id="btn.activate" label="Activate" emphasis="primary" onPress={() => all.update(e.id, { status: "Active" })} />
              )}
              {e.status === "Active" && (
                <Button id="btn.close" label="Close engagement" emphasis="danger" onPress={() => all.update(e.id, { status: "Closed" })} />
              )}
            </Stack>
          ) : undefined
        }
      />
      <Detail
        id="detail.engagement"
        fields={[
          { label: "Customer", value: e.customer },
          { label: "Country", value: e.country },
          { label: "Status", value: e.status },
          { label: "Owner", value: e.owner },
        ]}
      />
      <Section id="section.allocations" title="Allocations" count={list.length} subtitle="Consultants allocated to this engagement.">
        <Table
          id="table.allocations"
          columns={["Consultant", "Period", { label: "Share of week", kind: "number" }, "Travel", { label: "Status", kind: "status" }]}
          rows={list.map((a) => ({
            id: `allocation.${a.id}`,
            cells: [a.consultant, `${a.startDate} to ${a.endDate}`, `${a.percentage}%`, a.travel ? "Required" : "Not needed"],
            status: { text: a.status, tone: statusTone(a.status) },
          }))}
          empty={<EmptyState id="empty.allocations" title="No allocations yet" text="A resource manager allocates consultants to this engagement." />}
        />
      </Section>
      {(mine || role === "FinanceAnalyst") && (
        <Section id="section.travel" title="Travel expenses" subtitle="Expenses recorded for travelling consultants.">
          <Button id="btn.open-travel" label="Open travel expenses" to="screen.travel-expenses" params={{ engagement: e.id }} />
        </Section>
      )}
      <Dialog id="dialog.edit-engagement" title="Edit engagement" open={editing} onClose={() => setEditing(false)}>
        <Form
          id="form.edit-engagement"
          onSubmit={(v) => {
            all.update(e.id, { name: v.name ?? e.name, customer: v.customer ?? e.customer, country: v.country ?? e.country });
            setEditing(false);
          }}
          actions={<Button id="btn.save-edit" label="Save" emphasis="primary" submit />}
        >
          <Field id="field.edit-name" name="name" label="Name" required defaultValue={e.name} />
          <Field id="field.edit-customer" name="customer" label="Customer" required defaultValue={e.customer} />
          <Field id="field.edit-country" name="country" label="Country" type="select" options={countries} defaultValue={e.country} />
        </Form>
      </Dialog>
    </Shell>
  );
}

function Consultants() {
  const role = useRole();
  const state = useDisplayState();
  const today = useToday();
  const all = useCollection<Consultant>("consultants");
  const rateList = useCollection<Rate>("rates");
  const [query, setQuery] = useState("");
  const rows = (state === "state.empty" ? [] : all.items).filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <Shell>
      <Heading id="heading.consultants" text="Consultants" />
      <Section
        id="section.consultants"
        title="Consultants"
        count={rows.length}
        subtitle="People App employees available for allocation, with their hourly cost rate today."
        actions={role === "ResourceManager" ? <Button id="btn.add-consultant" label="Add consultant" emphasis="primary" to="screen.consultant-add" /> : undefined}
      >
        <Filters id="filters.consultants">
          <Field id="field.search" label="Search by name" value={query} onChange={setQuery} placeholder="Name" />
        </Filters>
        <Table
          id="table.consultants"
          columns={["Name", "Department", "Country", "Hourly rate", { label: "Status", kind: "status" }]}
          rows={rows.map((c) => {
            const r = inForce(rateList.items, c.id, today);
            return {
              id: `consultant.${c.id}`,
              cells: [c.name, c.department, c.country, r ? `${r.currency} ${r.hourly}` : "No rate"],
              status: { text: c.active ? "Active" : "Inactive", tone: c.active ? ("success" as Tone) : ("default" as Tone) },
              to: "screen.consultant-detail",
              params: { consultant: c.id },
            };
          })}
          empty={<EmptyState id="empty.consultants" title="No consultants" text="Add consultants from People App to start allocating." />}
        />
      </Section>
    </Shell>
  );
}

function ConsultantAdd() {
  const state = useDisplayState();
  const navigate = useNav();
  const people = useCollection<Employee>("employees");
  const all = useCollection<Consultant>("consultants");
  const candidates = people.items.filter((p) => !all.items.some((c) => c.email === p.email));
  const [selected, setSelected] = useState(candidates[0]?.name ?? "");
  const chosen = candidates.find((p) => p.name === selected);
  return (
    <Shell>
      <Breadcrumbs
        id="crumbs.add-consultant"
        items={[
          { id: "crumb.consultants", label: "Consultants", to: "screen.consultants" },
          { id: "crumb.add", label: "Add consultant" },
        ]}
      />
      <Heading id="heading.add-consultant" text="Add consultant" />
      {state === "state.empty" || candidates.length === 0 ? (
        <EmptyState id="empty.employees" title="Everyone is already a consultant" text="Every employee in People App has been added." />
      ) : (
        <Form
          id="form.add-consultant"
          title="Pick an employee from People App"
          onSubmit={() => {
            if (!chosen) return;
            const id = all.create({
              name: chosen.name, email: chosen.email, department: chosen.department,
              country: chosen.country, manager: chosen.manager, active: true,
            });
            navigate.go("screen.consultant-detail", { consultant: id });
          }}
          actions={
            <Stack direction="row">
              <Button id="btn.cancel-add" label="Cancel" to="screen.consultants" />
              <Button id="btn.confirm-add" label="Add consultant" emphasis="primary" submit />
            </Stack>
          }
        >
          <Field
            id="field.employee"
            label="Employee"
            type="select"
            options={candidates.map((p) => p.name)}
            value={selected}
            onChange={setSelected}
            required
            error={state === "state.validation-error" ? "Pick an employee" : undefined}
          />
          {chosen && (
            <Detail
              id="detail.employee"
              title="Employee information"
              fields={[
                { label: "Email", value: chosen.email },
                { label: "Department", value: chosen.department },
                { label: "Country", value: chosen.country },
                { label: "Reports to", value: chosen.manager },
              ]}
            />
          )}
        </Form>
      )}
    </Shell>
  );
}

function ConsultantDetail() {
  const { consultant: id } = useParams();
  const role = useRole();
  const state = useDisplayState();
  const today = useToday();
  const all = useCollection<Consultant>("consultants");
  const rateList = useCollection<Rate>("rates");
  const allAllocations = useCollection<Allocation>("allocations");
  const [adding, setAdding] = useState(false);
  const c = (id ? all.get(id) : undefined) ?? all.items[0]!;
  const manager = role === "ResourceManager";
  const history = rateList.items.filter((r) => r.consultantId === c.id).sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom));
  const current = inForce(rateList.items, c.id, today);
  const mine = allAllocations.items.filter((a) => a.consultantId === c.id);
  return (
    <Shell>
      <Breadcrumbs
        id="crumbs.consultant"
        items={[
          { id: "crumb.consultants", label: "Consultants", to: "screen.consultants" },
          { id: "crumb.consultant", label: c.name },
        ]}
      />
      <Heading
        id="heading.consultant"
        text={c.name}
        actions={
          manager && c.active ? (
            <Button id="btn.deactivate" label="Deactivate" emphasis="danger" onPress={() => all.update(c.id, { active: false })} />
          ) : undefined
        }
      />
      {!c.active && (
        <Alert id="alert.inactive" tone="warning" title="Inactive consultant" text="This consultant can no longer be allocated. Existing allocations stay." />
      )}
      <Detail
        id="detail.consultant"
        title="Employee information from People App"
        fields={[
          { label: "Email", value: c.email },
          { label: "Department", value: c.department },
          { label: "Country", value: c.country },
          { label: "Reports to", value: c.manager },
          { label: "Rate today", value: current ? `${current.currency} ${current.hourly} per hour` : "No rate set" },
        ]}
      />
      <Section
        id="section.rates"
        title="Cost rates"
        count={history.length}
        subtitle="Hourly rate per effective date. A new rate applies from its date onward."
        actions={manager ? <Button id="btn.set-rate" label="Set rate" emphasis="primary" onPress={() => setAdding(true)} /> : undefined}
      >
        <Table
          id="table.rates"
          columns={["Effective from", { label: "Hourly rate", kind: "number" }, "Currency", { label: "Status", kind: "status" }]}
          rows={history.map((r) => {
            const label = r.effectiveFrom > today ? "Scheduled" : current && current.id === r.id ? "In force" : "Earlier";
            return {
              id: `rate.${r.id}`,
              cells: [r.effectiveFrom, r.hourly, r.currency],
              status: { text: label, tone: label === "In force" ? ("success" as Tone) : statusTone(label) },
            };
          })}
          empty={<EmptyState id="empty.rates" title="No rates" text="Set a rate before allocating this consultant." />}
        />
      </Section>
      <Section id="section.consultant-allocations" title="Allocations" count={mine.length} subtitle="Where this consultant works over time.">
        <Table
          id="table.consultant-allocations"
          columns={["Engagement", "Period", { label: "Share of week", kind: "number" }, { label: "Status", kind: "status" }]}
          rows={mine.map((a) => ({
            id: `consultant-allocation.${a.id}`,
            cells: [a.engagement, `${a.startDate} to ${a.endDate}`, `${a.percentage}%`],
            status: { text: a.status, tone: statusTone(a.status) },
          }))}
          empty={<EmptyState id="empty.consultant-allocations" title="Not allocated" text="No allocations for this consultant yet." />}
        />
      </Section>
      <Dialog id="dialog.set-rate" title="Set cost rate" open={adding} onClose={() => setAdding(false)}>
        <Form
          id="form.rate"
          onSubmit={(v) => {
            rateList.create({
              consultantId: c.id,
              hourly: v.hourly ?? "0",
              currency: v.currency ?? "USD",
              effectiveFrom: v.effective ?? today,
            });
            setAdding(false);
          }}
          actions={<Button id="btn.save-rate" label="Save rate" emphasis="primary" submit />}
        >
          <Field
            id="field.hourly"
            name="hourly"
            label="Hourly rate"
            type="number"
            required
            error={state === "state.validation-error" ? "Enter an hourly rate" : undefined}
          />
          <Field id="field.currency" name="currency" label="Currency" type="select" options={["USD", "GBP", "LKR", "AUD", "SGD"]} defaultValue="USD" />
          <Field id="field.effective" name="effective" label="Effective from" type="date" defaultValue={today} />
        </Form>
      </Dialog>
    </Shell>
  );
}

function Allocations() {
  const role = useRole();
  const state = useDisplayState();
  const all = useCollection<Allocation>("allocations");
  const [engagement, setEngagement] = useState("All");
  const manager = role === "ResourceManager";
  const visible = state === "state.empty" ? [] : all.items;
  const rows = visible.filter((a) => engagement === "All" || a.engagement === engagement);
  const names = ["All", ...engagements.map((e) => e.name)];
  return (
    <Shell>
      <Heading id="heading.allocations" text="Allocations" />
      <StatGroup>
        <Stat id="stat.active-allocations" label="Active" value={String(visible.filter((a) => a.status === "Active").length)} hint="allocations running" icon="Users" tone="success" />
        <Stat id="stat.travel" label="Need travel" value={String(visible.filter((a) => a.travel && a.status === "Active").length)} hint="travel request required" icon="Plane" tone="warning" />
      </StatGroup>
      <Section
        id="section.allocations-all"
        title="Allocations"
        count={rows.length}
        subtitle="Every allocation across engagements."
        actions={manager ? <Button id="btn.new-allocation" label="New allocation" emphasis="primary" to="screen.allocation-new" /> : undefined}
      >
        <Filters id="filters.allocations">
          <Field id="field.engagement-filter" label="Engagement" type="select" options={names} value={engagement} onChange={setEngagement} />
        </Filters>
        <Table
          id="table.allocations-all"
          columns={["Consultant", "Engagement", "Period", { label: "Share of week", kind: "number" }, "Travel", { label: "Status", kind: "status" }]}
          rows={rows.map((a) => ({
            id: `allocation.${a.id}`,
            cells: [a.consultant, a.engagement, `${a.startDate} to ${a.endDate}`, `${a.percentage}%`, a.travel ? "Required" : "Not needed"],
            status: { text: a.status, tone: statusTone(a.status) },
            ...(manager && a.status === "Active"
              ? { actions: [{ id: `allocation.${a.id}.end`, label: "End", emphasis: "danger" as const, onPress: () => all.update(a.id, { status: "Ended" }) }] }
              : {}),
          }))}
          empty={<EmptyState id="empty.allocations-all" title="No allocations" text="Allocations appear here once a consultant is allocated." />}
        />
      </Section>
    </Shell>
  );
}

function AllocationNew() {
  const state = useDisplayState();
  const navigate = useNav();
  const today = useToday();
  const eng = useCollection<Engagement>("engagements");
  const people = useCollection<Consultant>("consultants");
  const all = useCollection<Allocation>("allocations");
  const open = eng.items.filter((e) => e.status !== "Closed");
  const active = people.items.filter((c) => c.active);
  const [engagementName, setEngagementName] = useState(open[0]?.name ?? "");
  const [consultantName, setConsultantName] = useState(active[0]?.name ?? "");
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState("2026-03-31");
  const [percentage, setPercentage] = useState("50");
  const [travel, setTravel] = useState("off");
  const chosenEngagement = open.find((e) => e.name === engagementName);
  const chosenConsultant = active.find((c) => c.name === consultantName);
  const load =
    all.items
      .filter((a) => chosenConsultant && a.consultantId === chosenConsultant.id && a.status === "Active" && a.startDate <= end && a.endDate >= start)
      .reduce((sum, a) => sum + a.percentage, 0) + Number(percentage || 0);
  return (
    <Shell>
      <Breadcrumbs
        id="crumbs.new-allocation"
        items={[
          { id: "crumb.allocations", label: "Allocations", to: "screen.allocations" },
          { id: "crumb.new-allocation", label: "New allocation" },
        ]}
      />
      <Heading id="heading.new-allocation" text="New allocation" />
      {state === "state.validation-error" && (
        <ValidationSummary id="summary.allocation" issues={["End date must be after the start date", "Share of week must be between 1 and 100"]} />
      )}
      {load > 100 && (
        <Alert
          id="alert.over-allocated"
          tone="warning"
          title="Over-allocated"
          text={`${consultantName} would be allocated ${load}% of a week in this period. You can still save.`}
        />
      )}
      <Form
        id="form.allocation"
        title="Allocation"
        onSubmit={() => {
          if (!chosenEngagement || !chosenConsultant) return;
          all.create({
            engagementId: chosenEngagement.id,
            engagement: chosenEngagement.name,
            consultantId: chosenConsultant.id,
            consultant: chosenConsultant.name,
            startDate: start,
            endDate: end,
            percentage: Number(percentage),
            travel: travel === "on",
            status: "Active",
          });
          navigate.go("screen.allocations");
        }}
        actions={
          <Stack direction="row">
            <Button id="btn.cancel-allocation" label="Cancel" to="screen.allocations" />
            <Button id="btn.save-allocation" label="Allocate" emphasis="primary" submit />
          </Stack>
        }
      >
        <Field id="field.alloc-engagement" label="Engagement" type="select" options={open.map((e) => e.name)} value={engagementName} onChange={setEngagementName} required />
        <Field id="field.alloc-consultant" label="Consultant" type="select" options={active.map((c) => c.name)} value={consultantName} onChange={setConsultantName} required />
        <Field id="field.alloc-start" label="Start date" type="date" value={start} onChange={setStart} required />
        <Field
          id="field.alloc-end"
          label="End date"
          type="date"
          value={end}
          onChange={setEnd}
          required
          error={state === "state.validation-error" ? "End date must be after the start date" : undefined}
        />
        <Field
          id="field.alloc-percentage"
          label="Share of a 40 hour week (%)"
          type="number"
          value={percentage}
          onChange={setPercentage}
          required
          error={state === "state.validation-error" ? "Enter a share between 1 and 100" : undefined}
        />
        <Field id="field.alloc-travel" label="Travel request required" type="switch" value={travel} onChange={setTravel} />
      </Form>
    </Shell>
  );
}

function Costs() {
  const role = useRole();
  const state = useDisplayState();
  const user = useUser();
  const engagementCosts = useCollection<CostEngagement>("costEngagements");
  const consultantCosts = useCollection<CostConsultant>("costConsultants");
  const lines = useCollection<CostLine>("costLines");
  const [from, setFrom] = useState("2026-01-01");
  const [to, setTo] = useState("2026-03-31");
  const mine = role === "EngagementManager";
  const hidden = state === "state.empty" || state === "state.failed";
  const engRows = hidden ? [] : engagementCosts.items.filter((e) => !mine || e.owner === user.name);
  const conRows = hidden ? [] : consultantCosts.items;
  const lineRows = hidden ? [] : lines.items.filter((l) => l.owner === user.name);
  const total = engRows.reduce((sum, e) => sum + e.cost, 0);
  const hours = engRows.reduce((sum, e) => sum + e.hours, 0);
  return (
    <Shell>
      <Heading id="heading.costs" text={mine ? "Cost of my engagements" : "Allocation cost"} />
      {state === "state.failed" && (
        <Alert id="alert.conversion" tone="error" title="Currency conversion unavailable" text="NetSuite could not convert amounts to USD. Try again in a few minutes." />
      )}
      <StatGroup>
        <Stat id="stat.total-cost" label="Total cost" value={hidden ? "-" : usd(total)} hint="USD, allocations as planned" icon="DollarSign" tone="info" />
        <Stat id="stat.total-hours" label="Allocated hours" value={hidden ? "-" : String(hours)} hint="in the period" icon="Clock" />
      </StatGroup>
      <Filters id="filters.costs">
        <Field id="field.from" label="From" type="date" value={from} onChange={setFrom} />
        <Field id="field.to" label="To" type="date" value={to} onChange={setTo} />
      </Filters>
      <Section id="section.cost-engagements" title="Cost per engagement" count={engRows.length} subtitle={`Between ${from} and ${to}, in USD.`}>
        <Table
          id="table.cost-engagements"
          columns={["Engagement", "Owner", { label: "Hours", kind: "number" }, { label: "Cost (USD)", kind: "number" }]}
          rows={engRows.map((e) => ({ id: `cost-engagement.${e.id}`, cells: [e.name, e.owner, String(e.hours), usd(e.cost)] }))}
          empty={<EmptyState id="empty.cost-engagements" title="No cost to show" text="Cost appears once consultants are allocated." />}
        />
      </Section>
      {mine ? (
        <Section id="section.cost-lines" title="Cost per consultant on my engagements" count={lineRows.length}>
          <Table
            id="table.cost-lines"
            columns={["Engagement", "Consultant", { label: "Hours", kind: "number" }, { label: "Cost (USD)", kind: "number" }]}
            rows={lineRows.map((l) => ({ id: `cost-line.${l.id}`, cells: [l.engagement, l.consultant, String(l.hours), usd(l.cost)] }))}
            empty={<EmptyState id="empty.cost-lines" title="No cost to show" text="Cost appears once consultants are allocated." />}
          />
        </Section>
      ) : (
        <Section id="section.cost-consultants" title="Cost per consultant" count={conRows.length} subtitle="Across every engagement.">
          <Table
            id="table.cost-consultants"
            columns={["Consultant", { label: "Hours", kind: "number" }, { label: "Cost (USD)", kind: "number" }]}
            rows={conRows.map((c) => ({ id: `cost-consultant.${c.id}`, cells: [c.name, String(c.hours), usd(c.cost)] }))}
            empty={<EmptyState id="empty.cost-consultants" title="No cost to show" text="Cost appears once consultants are allocated." />}
          />
        </Section>
      )}
    </Shell>
  );
}

function TravelExpenses() {
  const { engagement: id } = useParams();
  const role = useRole();
  const state = useDisplayState();
  const user = useUser();
  const today = useToday();
  const eng = useCollection<Engagement>("engagements");
  const list = useCollection<Expense>("expenses");
  const allAllocations = useCollection<Allocation>("allocations");
  const [adding, setAdding] = useState(false);
  const mine = role === "EngagementManager";
  const owned = eng.items.filter((e) => e.owner === user.name);
  const current = (id ? eng.get(id) : undefined) ?? owned[0] ?? eng.items[0]!;
  const rows = state === "state.empty" ? [] : list.items.filter((x) => !mine || x.engagementId === current.id);
  const drafts = rows.filter((x) => x.status === "Draft");
  const travelAllocations = allAllocations.items.filter((a) => a.engagementId === current.id && a.travel && a.status === "Active");
  const currency = currencyOf[current.country] ?? "USD";
  return (
    <Shell>
      <Heading id="heading.travel" text={mine ? `Travel expenses: ${current.name}` : "Travel expenses"} />
      {state === "state.failed" && (
        <Alert id="alert.netsuite" tone="error" title="NetSuite did not accept the submission" text="Your expenses are unchanged. Submit them again in a few minutes." />
      )}
      <Section
        id="section.expenses"
        title="Expenses"
        count={rows.length}
        subtitle={mine ? `Recorded in ${currency}, the currency of ${current.country}.` : "Every engagement's travel expenses."}
        actions={
          mine ? (
            <Stack direction="row">
              <Button id="btn.add-expense" label="Add expense" disabled={travelAllocations.length === 0} onPress={() => setAdding(true)} />
              <Button
                id="btn.submit-expenses"
                label="Submit to NetSuite"
                emphasis="primary"
                disabled={drafts.length === 0}
                onPress={() => {
                  if (state !== "state.failed") drafts.forEach((x) => list.update(x.id, { status: "Submitted" }));
                }}
              />
            </Stack>
          ) : undefined
        }
      >
        {mine && travelAllocations.length === 0 && (
          <Alert id="alert.no-travel" tone="info" text="No active allocation on this engagement is marked as requiring travel, so no expenses can be recorded." />
        )}
        <Table
          id="table.expenses"
          columns={["Date", "Engagement", "Consultant", "Description", { label: "Amount", kind: "number" }, { label: "Status", kind: "status" }]}
          rows={rows.map((x) => ({
            id: `expense.${x.id}`,
            cells: [x.date, x.engagement, x.allocation, x.description, `${x.currency} ${x.amount}`],
            status: { text: x.status, tone: statusTone(x.status) },
          }))}
          empty={<EmptyState id="empty.expenses" title="No travel expenses" text="Recorded travel expenses appear here." />}
        />
      </Section>
      <Dialog id="dialog.add-expense" title="Add travel expense" open={adding} onClose={() => setAdding(false)}>
        <Form
          id="form.expense"
          onSubmit={(v) => {
            list.create({
              engagementId: current.id,
              engagement: current.name,
              allocation: v.consultant ?? "",
              description: v.description ?? "",
              date: v.date ?? today,
              amount: v.amount ?? "0",
              currency,
              status: "Draft",
            });
            setAdding(false);
          }}
          actions={<Button id="btn.save-expense" label="Save expense" emphasis="primary" submit />}
        >
          <Field id="field.expense-consultant" name="consultant" label="Consultant" type="select" options={travelAllocations.map((a) => a.consultant)} />
          <Field
            id="field.expense-description"
            name="description"
            label="Description"
            required
            error={state === "state.validation-error" ? "Describe the expense" : undefined}
          />
          <Field id="field.expense-date" name="date" label="Date" type="date" defaultValue={today} />
          <Field id="field.expense-amount" name="amount" label={`Amount (${currency})`} type="number" required />
        </Form>
      </Dialog>
    </Shell>
  );
}

function Account() {
  const user = useUser();
  return (
    <Shell>
      <Heading id="heading.account" text="Account" />
      <Detail id="detail.account" fields={[{ label: "Name", value: user.name }, { label: "Email", value: user.email }]} />
      <Text id="text.account" text="Your access comes from the groups you belong to." />
    </Shell>
  );
}

function SignedOut() {
  return (
    <Screen>
      <Heading id="heading.signed-out" text="You are signed out" />
      <Button id="btn.sign-in" label="Sign in" emphasis="primary" to="screen.engagements" />
    </Screen>
  );
}

export default defineApp({
  screens: {
    "screen.engagements": Engagements,
    "screen.engagement-new": EngagementNew,
    "screen.engagement-detail": EngagementDetail,
    "screen.consultants": Consultants,
    "screen.consultant-add": ConsultantAdd,
    "screen.consultant-detail": ConsultantDetail,
    "screen.allocations": Allocations,
    "screen.allocation-new": AllocationNew,
    "screen.costs": Costs,
    "screen.travel-expenses": TravelExpenses,
    "screen.account": Account,
    "screen.signed-out": SignedOut,
  },
  data: { engagements, employees, consultants, rates, allocations, expenses, costEngagements, costConsultants, costLines },
});
