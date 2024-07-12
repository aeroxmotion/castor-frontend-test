import { Skeleton } from "@/components/ui/skeleton";
import { GoBackButton } from "@/app/_components/GoBackButton";

export default function ArtistDetailLoading() {
  return (
    <div className="pt-16">
      <GoBackButton />

      <main className="flex flex-row mb-8">
        <Skeleton style={{ width: 300, height: 300 }} />

        <div className="pl-8">
          <Skeleton className="w-64 h-12 mb-2" />
          <Skeleton className="w-32 h-6 mb-4" />
          <Skeleton className="w-48 h-6" />
        </div>
      </main>
    </div>
  );
}
