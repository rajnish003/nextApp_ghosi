import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['randomuser.me','cdn-icons-png.flaticon.com','@tailwindcss/line-clamp'],

  },
};


export default withFlowbiteReact(nextConfig);