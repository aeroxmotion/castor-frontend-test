import { type FC } from "react";

import { TabsContent } from "@/components/ui/tabs";
import { SpotifyAlbum, SpotifySearchType } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AlbumsTabProps {
  albums: SpotifyAlbum[];
}

export const AlbumsTab: FC<AlbumsTabProps> = ({ albums }) => {
  return (
    <TabsContent value={SpotifySearchType.Album}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Nombre</TableHead>
            <TableHead>Artistas</TableHead>
            <TableHead className="text-right">Año de lanzamiento</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {albums.map((album) => (
            <TableRow key={album.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={album.images[0]?.url} />
                  <AvatarFallback>
                    {album.name
                      .split(" ")
                      .filter((word) => word[0] === word[0].toUpperCase())
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{album.name}</TableCell>
              <TableCell>
                {album.artists.map((artist) => artist.name).join(", ")}
              </TableCell>
              <TableCell className="text-right">
                {album.release_date.split("-")[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabsContent>
  );
};
