import { type FC } from "react";

import { SpotifySearchType, type SpotifyTrack } from "@/lib/types";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TracksTabProps {
  tracks: SpotifyTrack[];
}

export const TracksTab: FC<TracksTabProps> = ({ tracks }) => {
  return (
    <TabsContent value={SpotifySearchType.Track}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Artistas</TableHead>
            <TableHead>Álbum</TableHead>
            <TableHead className="text-right">Popularidad</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tracks.map((track) => (
            <TableRow key={track.id}>
              <TableCell>{track.name}</TableCell>
              <TableCell>
                {track.artists.map((artist) => artist.name).join(", ")}
              </TableCell>
              <TableCell>{track.album.name}</TableCell>
              <TableCell className="text-right">{track.popularity}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabsContent>
  );
};
