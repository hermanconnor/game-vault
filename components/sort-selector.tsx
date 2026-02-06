import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  ordering: string;
  setOrdering: (value: string) => void;
}

export default function SortSelector({ ordering, setOrdering }: Props) {
  const SORT_OPTIONS = [
    { value: "-rating", label: "Rating (High to Low)" },
    { value: "rating", label: "Rating (Low to High)" },
    { value: "-released", label: "Release Date (Newest)" },
    { value: "released", label: "Release Date (Oldest)" },
    { value: "name", label: "Name (A-Z)" },
    { value: "-name", label: "Name (Z-A)" },
    { value: "-metacritic", label: "Metacritic (High to Low)" },
  ];

  return (
    <Select value={ordering || "default"} onValueChange={setOrdering}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="default">Default</SelectItem>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
