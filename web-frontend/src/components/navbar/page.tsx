import { Button } from '../../components/ui/button';
import { BarChart3, LayoutDashboard, Settings2, UserCircle } from "lucide-react";
import AddIncomeExpenseButton from './addIncomeExpenseButton';
import { Link, useLocation } from 'react-router';
import { cn } from '../../lib/utils';

const navItems = [
  {
    to: "/dashboard",
    label: "Start",
    description: "Übersicht",
    icon: LayoutDashboard,
  },
  {
    to: "/details",
    label: "Details",
    description: "Buchungen",
    icon: BarChart3,
  },
  {
    to: "/customization",
    label: "Anpassen",
    description: "Budgets & Kategorien",
    icon: Settings2,
  },
];

const Navbar = () => {
  const location = useLocation();

  const getIsActive = (path: string) => location.pathname === path;

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar/95 px-4 py-5 shadow-sm backdrop-blur md:flex md:flex-col">
        <div className="mb-8 flex items-center gap-3 rounded-xl border bg-card p-3 shadow-xs">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <LayoutDashboard className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold leading-tight">Finanztracker</div>
            <div className="text-xs text-muted-foreground">Private Finanzen</div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = getIsActive(item.to);

            return (
              <Button
                key={item.to}
                asChild
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "h-14 justify-start gap-3 rounded-xl px-3",
                  !isActive && "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Link to={item.to}>
                  <Icon className="size-5" />
                  <span className="flex min-w-0 flex-col items-start">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className={cn("text-xs", isActive ? "text-primary-foreground/75" : "text-muted-foreground")}>
                      {item.description}
                    </span>
                  </span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="mt-5 flex flex-col gap-3">
          <AddIncomeExpenseButton mode="sidebar" />
          <Button variant="outline" className="h-12 justify-start gap-3 rounded-xl">
            <UserCircle className="size-5" />
            <span>Profil</span>
          </Button>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/90 px-3 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-5 items-center gap-1">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = getIsActive(item.to);

            return (
              <li key={item.to}>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "h-14 w-full flex-col gap-1 rounded-xl px-1 text-xs",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                >
                  <Link to={item.to}>
                    <Icon className="size-5" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              </li>
            );
          })}

          <li className="flex justify-center">
            <AddIncomeExpenseButton mode="bottom" />
          </li>

          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            const isActive = getIsActive(item.to);

            return (
              <li key={item.to}>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "h-14 w-full flex-col gap-1 rounded-xl px-1 text-xs",
                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                >
                  <Link to={item.to}>
                    <Icon className="size-5" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              </li>
            );
          })}

          <li>
            <Button variant="ghost" className="h-14 w-full flex-col gap-1 rounded-xl px-1 text-xs">
              <UserCircle className="size-5" />
              <span>Profil</span>
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
