"use client";

import { type FC } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { SpotifyAlbum, SpotifySearchType } from "@/client/spotify/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AlbumsTabProps {
  albums: SpotifyAlbum[];
}

export const AlbumsTab: FC<AlbumsTabProps> = ({ albums }) => {
  const router = useRouter();

  const onAlbumClick = (album: SpotifyAlbum) => {
    router.push(`/album/${album.id}`);
  };

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
            <TableRow
              key={album.id}
              className="cursor-pointer"
              onClick={() => onAlbumClick(album)}
            >
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
