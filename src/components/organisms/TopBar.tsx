import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { LocaleSwitcher } from "@/components/atoms/LocaleSwitcher";

export function TopBar() {
  return (
    <header className="fixed top-0 right-0 z-50 flex items-center gap-4 p-6">
      <LocaleSwitcher />
      <ThemeToggle />
    </header>
  );
}
