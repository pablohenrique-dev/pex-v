import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

type DashboardHeaderProps = {
  user: {
    name: string;
    email: string;
  };
};

function getGreeting() {
  const hour = dayjs().hour();

  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";

  return "Boa noite";
}

function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const formattedDate = capitalizeFirstLetter(
    dayjs().format("dddd, DD [de] MMMM [de] YYYY"),
  );

  return (
    <section className="border-b border-border pb-6">
      <p className="text-sm font-medium text-muted-foreground">
        {formattedDate}
      </p>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {getGreeting()}, {user.name}
      </h1>
    </section>
  );
}
