import FavouriteLyrics from "@/components/content/favourite-lyrics";
import FavouritePoems from "@/components/content/favourite-poems";
import SuggestedArtist from "@/components/content/suggested-artist";
import SuggestedPoets from "@/components/content/suggested-poet";
import RecentPost from "@/components/section/recent-post";

export default async function Home() {
  return (
    <div className="grid md:grid-cols-2 mx-auto py-8 container px-4 md:px-8 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <RecentPost />
      </div>
      <div className="space-y-6">
        <FavouriteLyrics />
        <FavouritePoems />
        <SuggestedArtist />
        <SuggestedPoets />
      </div>
    </div>
  );
}
