type JobBulletListProps = {
  items: string[];
};

export function JobBulletList({ items }: JobBulletListProps) {
  if (items.length === 0) return null;

  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
