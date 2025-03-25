export interface ReleaseNote {
  version: string;
  releaseDate: string;
  sections: {
    title: string;
    items: string[];
  }[];
  sourceCodeUrl: string;
}

export interface Release {
  version: string;
  releaseDate: string;
  url: string;
}

export interface ReleaseGroup {
  majorVersion: string;
  releases: Release[];
}

export const releaseNotes: ReleaseNote = {
  "version": "8.1.0-rc2",
  "releaseDate": "Thu 20 March 2025",
  "sections": [
    {
      "title": "Performance/Efficiency Improvements - Core",
      "items": [
        "Optimize bitcount command by using x86 SIMD instructions (#1741)",
        "Embed hash value in hash data type entries to reduce memory footprint (#1579)"
      ]
    },
    {
      "title": "Cluster modifications",
      "items": [
        "Add cluster-manual-failover-timeout configuration to control the timeout for manual failover (#1690)",
        "Improve error message reporting when invalid port is provided for cluster meet command. (#1686)",
        "broadcast epoch ASAP when configEpoch changed (#1813)"
      ]
    },
    {
      "title": "Module Improvements",
      "items": [
        "Add new module API flag to bypass command validation in order to reduce processing overhead (#1357)"
      ]
    },
    {
      "title": "Behavior Changes",
      "items": [
        "Enable TCP_NODELAY for engine initiated cluster and replication connections (#1763)"
      ]
    },
    {
      "title": "Bug Fixes",
      "items": [
        "Fix `ACL LOAD` crash on a connected replica node (#1842)",
        "Fix bug where no tracking-redir-broken is issued when the redirect client is in the process of getting closed. (#1823)",
        "Fix replica sometimes disconnecting when replication is using TLS. (#1737)",
        "Fix file descriptor leak when aborting dual channel replication due to error (#1721)",
        "Fix rax crash when using keys larger than 512MB (#1722)",
        "Fix RANDOMKEY command leading to infinite loop during when all CLIENT are PAUSED and all keys are with expiry (#1850)",
        "Removing unicode optimization in Lua cjson library to avoid OOM when very large strings are used. (#1785)",
        "Fix update large-reply in COMMANDLOG when reply is deferred (#1760)",
        "Avoid setting TCP/TLS specific options for UNIX Domain Socket connections (#1706)",
        "Fix a bug in the valkey-cli which would incorrectly render commands with text output in multi/exec (#1782)"
      ]
    },
    {
      "title": "Build and Packaging changes",
      "items": [
        "Check both arm64 and aarch64 for ARM based system architecture during CMake builds (#1829)",
        "Cleanup lua object files on make distclean (#1812)",
        "Fixed build error with CMake when using clang v19 (#1806)"
      ]
    },
    {
      "title": "Assets",
      "items": [
        "Source code (zip): https://api.github.com/repos/valkey-io/valkey/zipball/8.1.0-rc2",
        "Source code (tar.gz): https://api.github.com/repos/valkey-io/valkey/tarball/8.1.0-rc2",
        "View on GitHub: https://github.com/valkey-io/valkey/tree/8.1.0-rc2"
      ]
    }
  ],
  "sourceCodeUrl": "https://github.com/valkey-io/valkey/tree/8.1.0-rc2"
};

export const previousReleases: ReleaseGroup[] = [
  {
    "majorVersion": "8.X.X",
    "releases": [
      {
        "version": "8.1.0-rc1",
        "releaseDate": "2025-02-16",
        "url": "https://github.com/valkey-io/valkey/releases/tag/8.1.0-rc1"
      },
      {
        "version": "8.0.2",
        "releaseDate": "2025-01-07",
        "url": "https://github.com/valkey-io/valkey/releases/tag/8.0.2"
      },
      {
        "version": "8.0.1",
        "releaseDate": "2024-10-02",
        "url": "https://github.com/valkey-io/valkey/releases/tag/8.0.1"
      },
      {
        "version": "8.0.0",
        "releaseDate": "2024-09-15",
        "url": "https://github.com/valkey-io/valkey/releases/tag/8.0.0"
      },
      {
        "version": "8.0.0-rc2",
        "releaseDate": "2024-09-03",
        "url": "https://github.com/valkey-io/valkey/releases/tag/8.0.0-rc2"
      },
      {
        "version": "8.0.0-rc1",
        "releaseDate": "2024-08-01",
        "url": "https://github.com/valkey-io/valkey/releases/tag/8.0.0-rc1"
      }
    ]
  },
  {
    "majorVersion": "7.X.X",
    "releases": [
      {
        "version": "7.2.8",
        "releaseDate": "2025-01-08",
        "url": "https://github.com/valkey-io/valkey/releases/tag/7.2.8"
      },
      {
        "version": "7.2.7",
        "releaseDate": "2024-10-02",
        "url": "https://github.com/valkey-io/valkey/releases/tag/7.2.7"
      },
      {
        "version": "7.2.6",
        "releaseDate": "2024-07-31",
        "url": "https://github.com/valkey-io/valkey/releases/tag/7.2.6"
      },
      {
        "version": "7.2.5",
        "releaseDate": "2024-04-16",
        "url": "https://github.com/valkey-io/valkey/releases/tag/7.2.5"
      },
      {
        "version": "7.2.5-rc1",
        "releaseDate": "2024-04-12",
        "url": "https://github.com/valkey-io/valkey/releases/tag/7.2.5-rc1"
      },
      {
        "version": "7.2.4-rc1",
        "releaseDate": "2024-04-09",
        "url": "https://github.com/valkey-io/valkey/releases/tag/7.2.4-rc1"
      }
    ]
  }
];
