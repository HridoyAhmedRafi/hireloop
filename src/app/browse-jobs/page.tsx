const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const searchURL = new URLSearchParams(search as Record<string, string>);
  const query = searchURL.toString();
  console.log(query);
  return (
    <div>
      <h1>Browse jobs</h1>
    </div>
  );
};

export default BrowseJobs;
