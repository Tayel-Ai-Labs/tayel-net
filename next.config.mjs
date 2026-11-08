import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * turbopack.root is pinned because this project sits inside a directory that
 * is itself under a git repo with other lockfiles; without it Next walks up
 * and picks the wrong root.
 */
const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: { root: projectRoot },
};

export default nextConfig;
