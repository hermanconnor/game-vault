import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlatformsResponse } from "@/lib/types";

interface Props {
  data: PlatformsResponse | undefined;
  platform: string;
  setPlatform: (value: string) => void;
}

export default function PlatformSelector({
  data,
  platform,
  setPlatform,
}: Props) {
  return (
    <Select value={platform || "all"} onValueChange={setPlatform}>
      <SelectTrigger>
        <SelectValue placeholder="Platform" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Platforms</SelectItem>
        {data?.results.map((p) => (
          <SelectItem key={p.id} value={p.id.toString()}>
            {p.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
