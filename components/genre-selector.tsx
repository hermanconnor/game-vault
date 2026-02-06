import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GenresResponse } from "@/lib/types";

interface Props {
  data: GenresResponse | undefined;
  genre: string;
  setGenre: (value: string) => void;
}

export default function GenreSelector({ data, genre, setGenre }: Props) {
  return (
    <Select value={genre || "all"} onValueChange={setGenre}>
      <SelectTrigger>
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genres</SelectItem>
        {data?.results.map((g) => (
          <SelectItem key={g.id} value={g.id.toString()}>
            {g.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
