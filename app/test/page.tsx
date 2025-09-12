import { getAllAlbums } from "@/app/action/album";
import { getAllPoets } from "@/app/action/poet";

export default async function Page() {
  const baseUrl = process.env.BASE_URL;
  const albums = await getAllAlbums();
  const poets = await getAllPoets();
  let tags: string[] = [];

  try {
    const res = await fetch(`${baseUrl}/api/tags`, {
      next: { tags: ["tags"] },
    });

    if (!res.ok) {
      console.error("Failed to fetch tags:", res.status, res.statusText);
    } else {
      const data = await res.json();
      tags = data?.tags ?? [];
    }
  } catch (err) {
    console.error("Tags fetch error:", err);
  }

  return (
    <div>
      <div className="px-4 md:px-8 containe py-20">
        <div className="p-10 ">
          <h2>Album</h2>
          {albums.map((album) => {
            return (
              <div key={album.id}>
                <p>{album.name}</p>
              </div>
            );
          })}
        </div>
        <div className="p-10 ">
          <h2>Poet</h2>
          {poets.map((poet) => {
            return (
              <div key={poet.id}>
                <p>{poet.name}</p>
              </div>
            );
          })}
        </div>
        <div className="p-10 ">
          <h2>Tag</h2>
          {tags.map((t: string) => {
            return (
              <div key={t}>
                <p>{t}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
