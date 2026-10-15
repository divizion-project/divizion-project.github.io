import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const directory = path.resolve("public/data");
await mkdir(directory, { recursive: true });
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "Divizion-Website",
};
if (process.env.GITHUB_TOKEN)
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
async function get(url, api = true) {
  const response = await fetch(url, {
    headers: api ? headers : { "User-Agent": "Divizion-Website" },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  return response.json();
}
async function preserveOrFail(name, task) {
  try {
    const result = await task();
    await writeFile(
      path.join(directory, name),
      JSON.stringify(result, null, 2),
    );
    console.log(`Updated ${name}`);
  } catch (error) {
    try {
      await readFile(path.join(directory, name));
      console.warn(`Preserved ${name}: ${error.message}`);
    } catch {
      throw error;
    }
  }
}
await preserveOrFail("releases.json", async () => {
  const releases = [];
  for (let page = 1; ; page++) {
    if (page > 20) throw new Error("Pagination limit reached");
    const batch = await get(
      `https://api.github.com/repos/divizion-project/Divizion-Launcher/releases?per_page=100&page=${page}`,
    );
    if (!Array.isArray(batch)) throw new Error("Invalid releases");
    releases.push(...batch);
    if (batch.length < 100) break;
  }
  if (!releases.length) throw new Error("No releases");
  return {
    fetchedAt: new Date().toISOString(),
    releases: releases.map(
      ({
        id,
        name,
        tag_name,
        body,
        prerelease,
        draft,
        published_at,
        html_url,
        assets,
      }) => ({
        id,
        name,
        tag_name,
        body,
        prerelease,
        draft,
        published_at,
        html_url,
        assets: assets.map(
          ({ name, browser_download_url, size, download_count }) => ({
            name,
            browser_download_url,
            size,
            download_count,
          }),
        ),
      }),
    ),
  };
});
await preserveOrFail("docs.json", async () => {
  const result = await get(
    "https://api.github.com/repos/divizion-project/divizion-docu/git/trees/main?recursive=1",
  );
  if (!Array.isArray(result.tree) || result.truncated)
    throw new Error("Incomplete tree");
  const paths = result.tree
    .filter((x) => x.type === "blob" && /^docs\/.*\.json$/i.test(x.path))
    .map((x) => x.path);
  const docs = [];
  for (const file of paths) {
    const d = await get(
      `https://raw.githubusercontent.com/divizion-project/divizion-docu/main/${file.split("/").map(encodeURIComponent).join("/")}`,
      false,
    );
    if (
      typeof d.meta?.title !== "string" ||
      typeof d.meta?.id !== "string" ||
      !Array.isArray(d.blocks)
    )
      throw new Error(`Invalid doc: ${file}`);
    docs.push({ ...d, _path: file });
  }
  if (paths.length && !docs.length) throw new Error("Empty index");
  return docs;
});
