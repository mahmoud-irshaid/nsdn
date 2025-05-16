import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const posts = await client.fetch(STARTUPS_QUERY, params);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Home</h1>

        <p className="sub-heading !max-w-3xl">Submit Ideas !</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for ${query}` : "All"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No results</p>
          )}
        </ul>
      </section>
    </>
  );
}
