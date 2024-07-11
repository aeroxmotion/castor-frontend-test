import { type FC } from "react";

import { SpotifyArtist, SpotifySearchType } from "@/lib/types";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ArtistsTabProps {
  artists: SpotifyArtist[];
}

export const ArtistsTab: FC<ArtistsTabProps> = ({ artists }) => {
  return (
    <TabsContent value={SpotifySearchType.Artist}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Nombre</TableHead>
            <TableHead>Géneros</TableHead>
            <TableHead className="text-right">Seguidores</TableHead>
            <TableHead className="text-right">Popularidad</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {artists.map((artist) => (
            <TableRow key={artist.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={artist.images[0]?.url} />
                  <AvatarFallback>
                    {artist.name
                      .split(" ")
                      .filter((word) => word[0] === word[0].toUpperCase())
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{artist.name}</TableCell>
              <TableCell>{artist.genres.join(", ") || "N/A"}</TableCell>
              <TableCell className="text-right">
                {artist.followers.total}
              </TableCell>
              <TableCell className="text-right">{artist.popularity}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabsContent>
  );
};
