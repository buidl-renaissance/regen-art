//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  compiler: {
    // For other options, see https://styled-components.com/docs/tooling#babel-plugin
    styledComponents: true,
  },

  images: {
    remotePatterns: [
      {
        hostname: 'nyc3.digitaloceanspaces.com',
        protocol: 'https',
        port: '',
        pathname: '**',
      },
      {
        hostname: 'dpop.nyc3.digitaloceanspaces.com',
        protocol: 'https',
        port: '',
        pathname: '**',
      },
      {
        hostname: 'brown-selective-rodent-822.mypinata.cloud',
        protocol: 'https',
        port: '',
        pathname: '**',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
