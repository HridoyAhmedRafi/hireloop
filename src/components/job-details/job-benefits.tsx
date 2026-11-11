import {
  Gift,
  HeartPulse,
  Laptop,
  PiggyBank,
  ShieldCheck,
  TreePalm,
  type LucideIcon,
} from "lucide-react";

type JobBenefitsProps = {
  benefits: string[];
};

const BENEFIT_ICONS: { pattern: RegExp; icon: LucideIcon }[] = [
  { pattern: /health|dental|medical/i, icon: HeartPulse },
  { pattern: /401k|retirement|pension/i, icon: PiggyBank },
  { pattern: /hardware|laptop|equipment/i, icon: Laptop },
  { pattern: /pto|vacation|leave|holiday/i, icon: TreePalm },
  { pattern: /insurance/i, icon: ShieldCheck },
];

const getBenefitIcon = (benefit: string) =>
  BENEFIT_ICONS.find(({ pattern }) => pattern.test(benefit))?.icon ?? Gift;

export function JobBenefits({ benefits }: JobBenefitsProps) {
  if (benefits.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {benefits.map((benefit) => {
        const Icon = getBenefitIcon(benefit);

        return (
          <div
            key={benefit}
            className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-secondary/20 px-3 py-2.5"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted">
              <Icon aria-hidden="true" className="size-3.5" />
            </span>
            <span className="text-sm font-medium text-foreground">{benefit}</span>
          </div>
        );
      })}
    </div>
  );
}
