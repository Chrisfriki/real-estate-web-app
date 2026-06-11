/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/real-estate-web-app" : "",
  assetPrefix: isGitHubPages ? "/real-estate-web-app/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/real-estate-web-app" : "",
  },
}

export default nextConfig