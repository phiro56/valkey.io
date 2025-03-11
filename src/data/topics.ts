export interface CommandCategory {
  id: string;
  topicName: string;
  description: string;
  htmlContent: string;
}

export interface TopicCategory {
  title: string;
  items: CommandCategory[];
}

export const topics: CommandCategory[] = [
  {
    id: "acl",
    topicName: "ACL",
    description: "Valkey Access Control List",
    htmlContent: `<p>The Valkey ACL, short for Access Control List, is a feature that allows certain connections to be limited in terms of the commands that can be executed and the keys that can be accessed. The way it works is that, after connecting, a client is required to provide a username and a valid password to authenticate. If authentication succeeded, the connection is associated with a given user and the limits the user has. Valkey can be configured so that new connections are already authenticated with a "default" user (this is the default configuration). Configuring the default user has, as a side effect, the ability to provide only a specific subset of functionalities to connections that are not explicitly authenticated.</p> <p>The standard way to authenticate is the two-argument form of the <code>AUTH</code> command:</p> <pre style="background-color:#2b303b;color:#c0c5ce;"><code><span>AUTH &lt;username&gt; &lt;password&gt; </span></code></pre> <p>If the password is valid matches, the connection will be authenticated to the user with the name <code>&lt;username&gt;</code>.</p> <p>When the single argument form of the command is used, where only the password is specified, it is assumed that the implicit username is "default".</p> <pre style="background-color:#2b303b;color:#c0c5ce;"><code><span>AUTH &lt;password&gt; </span></code></pre> <p>This form authenticates against the "default" user's password, either set by ACLs or by setting <code>requirepass</code>.</p> <h2 id="when-acls-are-useful">When ACLs are useful</h2> <p>Before using ACLs, you may want to ask yourself what's the goal you want to accomplish by implementing this layer of protection. Normally there are two main goals that are well served by ACLs:</p> <ol> <li>You want to improve security by restricting the access to commands and keys, so that untrusted clients have no access and trusted clients have just the minimum access level to the database in order to perform the work needed. For instance, certain clients may just be able to execute read only commands.</li> <li>You want to improve operational safety, so that processes or humans accessing Valkey are not allowed to damage the data or the configuration due to software errors or manual mistakes. For instance, there is no reason for a worker that fetches delayed jobs from Valkey to be able to call the <code>FLUSHALL</code> command.</li> </ol> <p>Another typical usage of ACLs is related to managed Valkey instances. Valkey is often provided as a managed service both by internal company teams that handle the Valkey infrastructure for the other internal customers they have, or is provided in a software-as-a-service setup by cloud providers. In both setups, we want to be sure that configuration commands are excluded for the customers.</p> <h2 id="configure-acls-with-the-acl-command">Configure ACLs with the ACL command</h2> <p>ACLs are defined using a DSL (domain specific language) that describes what a given user is allowed to do. Such rules are always implemented from the first to the last, left-to-right, because sometimes the order of the rules is important to understand what the user is really able to do.</p> <p>By default there is a single user defined, called <em>default</em>. We can use the <code>ACL LIST</code> command in order to check the currently active ACLs and verify what the configuration of a freshly started, defaults-configured Valkey instance is:</p> <pre style="background-color:#2b303b;color:#c0c5ce;"><code><span>&gt; ACL LIST </span><span>1) "user default on nopass ~* &amp;* +@all" </span></code></pre> <p>The command above reports the list of users in the same format that is used in the Valkey configuration files, by translating the current ACLs set for the users back into their description.</p> <p>The first two words in each line are "user" followed by the username. The next words are ACL rules that describe different things. We'll show how the rules work in detail, but for now it is enough to say that the default user is configured to be active (on), to require no password (nopass), to access every possible key (<code>~*</code>) and Pub/Sub channel (<code>&amp;*</code>), and be able to call every possible command (<code>+@all</code>).</p> <p>Also, in the special case of the default user, having the <em>nopass</em> rule means that new connections are automatically authenticated with the default user without any explicit <code>AUTH</code> call needed.</p> <h2 id="acl-rules">ACL rules</h2> <p>The following is the list of valid ACL rules. Certain rules are just single words that are used in order to activate or remove a flag, or to perform a given change to the user ACL. Other rules are char prefixes that are concatenated with command or category names, key patterns, and so forth.</p> <p>Enable and disallow users:</p> <ul> <li><code>on</code>: Enable the user: it is possible to authenticate as this user.</li> <li><code>off</code>: Disallow the user: it's no longer possible to authenticate with this user; however, previously authenticated connections will still work. Note that if the default user is flagged as <em>off</em>, new connections will start as not authenticated and will require the user to send <code>AUTH</code> or <code>HELLO</code> with the AUTH option in order to authenticate in some way, regardless of the default user configuration.</li> </ul> <p>Allow and disallow commands:</p> <ul> <li><code>+&lt;command&gt;</code>: Add the command to the list of commands the user can call. Can be used with <code>|</code> for allowing subcommands (e.g "+config|get").</li> <li><code>-&lt;command&gt;</code>: Remove the command to the list of commands the user can call. Starting Valkey 7.0, it can be used with <code>|</code> for blocking subcommands (e.g "-config|set").</li> <li><code>+@&lt;category&gt;</code>: Add all the commands in such category to be called by the user, with valid categories being like @admin, @set, @sortedset, ... and so forth, see the full list by calling the <code>ACL CAT</code> command. The special category @all means all the commands, both the ones currently present in the server, and the ones that will be loaded in the future via modules.</li> <li><code>-@&lt;category&gt;</code>: Like <code>+@&lt;category&gt;</code> but removes the commands from the list of commands the client can call.</li> <li><code>+&lt;command&gt;|first-arg</code>: Allow a specific first argument of an otherwise disabled command. It is only supported on commands with no sub-commands, and is not allowed as negative form like -SELECT|1, only additive starting with "+". This feature is deprecated and may be removed in the future.</li> <li><code>allcommands</code>: Alias for +@all. Note that it implies the ability to execute all the future commands loaded via the modules system.</li> <li><code>nocommands</code>: Alias for -@all.</li> </ul> <p>Allow and disallow certain keys and key permissions:</p> <ul> <li><code>~&lt;pattern&gt;</code>: Add a pattern of keys that can be mentioned as part of commands. For instance <code>~*</code> allows all the keys. The pattern is a glob-style pattern like the one of <code>KEYS</code>. It is possible to specify multiple patterns.</li> <li><code>%R~&lt;pattern&gt;</code>: Add the specified read key pattern. This behaves similar to the regular key pattern but only grants permission to read from keys that match the given pattern. See <a href="#key-permissions">key permissions</a> for more information.</li> <li><code>%W~&lt;pattern&gt;</code>: Add the specified write key pattern. This behaves similar to the regular key pattern but only grants permission to write to keys that match the given pattern. See <a href="#key-permissions">key permissions</a> for more information.</li> <li><code>%RW~&lt;pattern&gt;</code>: Alias for <code>~&lt;pattern&gt;</code>.</li> <li><code>allkeys</code>: Alias for <code>~*</code>.</li> <li><code>resetkeys</code>: Flush the list of allowed keys patterns. For instance the ACL <code>~foo:* ~bar:* resetkeys ~objects:*</code>, will only allow the client to access keys that match the pattern <code>objects:*</code>.</li> </ul> <p>Allow and disallow Pub/Sub channels:</p> <ul> <li><code>&amp;&lt;pattern&gt;</code>: Add a glob style pattern of Pub/Sub channels that can be accessed by the user. It is possible to specify multiple channel patterns. Note that pattern matching is done only for channels mentioned by <code>PUBLISH</code> and <code>SUBSCRIBE</code>, whereas <code>PSUBSCRIBE</code> requires a literal match between its channel patterns and those allowed for user.</li> <li><code>allchannels</code>: Alias for <code>&amp;*</code> that allows the user to access all Pub/Sub channels.</li> <li><code>resetchannels</code>: Flush the list of allowed channel patterns and disconnect the user's Pub/Sub clients if these are no longer able to access their respective channels and/or channel patterns.</li> </ul> <p>Configure valid passwords for the user:</p> <ul> <li><code>&gt;&lt;password&gt;</code>: Add this password to the list of valid passwords for the user. For example <code>&gt;mypass</code> will add "mypass" to the list of valid passwords.  This directive clears the <em>nopass</em> flag (see later). Every user can have any number of passwords.</li> <li><code>&lt;&lt;password&gt;</code>: Remove this password from the list of valid passwords. Emits an error in case the password you are trying to remove is actually not set.</li> <li><code>#&lt;hash&gt;</code>: Add this SHA-256 hash value to the list of valid passwords for the user. This hash value will be compared to the hash of a password entered for an ACL user. This allows users to store hashes in the <code>acl.conf</code> file rather than storing cleartext passwords. Only SHA-256 hash values are accepted as the password hash must be 64 characters and only contain lowercase hexadecimal characters.</li> <li><code>!&lt;hash&gt;</code>: Remove this hash value from the list of valid passwords. This is useful when you do not know the password specified by the hash value but would like to remove the password from the user.</li> <li><code>nopass</code>: All the set passwords of the user are removed, and the user is flagged as requiring no password: it means that every password will work against this user. If this directive is used for the default user, every new connection will be immediately authenticated with the default user without any explicit AUTH command required. Note that the <em>resetpass</em> directive will clear this condition.</li> <li><code>resetpass</code>: Flushes the list of allowed passwords and removes the <em>nopass</em> status. After <em>resetpass</em>, the user has no associated passwords and there is no way to authenticate without adding some password (or setting it as <em>nopass</em> later).</li> </ul> <p><em>Note: if a user is not flagged with nopass and has no list of valid passwords, that user is effectively impossible to use because there will be no way to log in as that user.</em></p> <p>Configure selectors for the user:</p> <ul> <li><code>(&lt;rule list&gt;)</code>: Create a new selector to match rules against. Selectors are evaluated after the user permissions, and are evaluated according to the order they are defined. If a command matches either the user permissions or any selector, it is allowed. See <a href="#selectors">selectors</a> for more information.</li> <li><code>clearselectors</code>: Delete all of the selectors attached to the user.</li> </ul> <p>Reset the user:</p> <ul> <li><code>reset</code> Performs the following actions: resetpass, resetkeys, resetchannels, allchannels (if acl-pubsub-default is set), off, clearselectors, -@all. The user returns to the same state it had immediately after its creation.</li> </ul>`
  },
  {
    id: "ARM",
    topicName: "ARM support",
    description: "Exploring Valkey on the ARM CPU Architecture",
    htmlContent: `<p>Valkey fully supports ARM architecture, offering native performance for ARM-based systems. This guide covers:</p>
    <ul>
      <li>Building Valkey on ARM processors</li>
      <li>Performance considerations</li>
      <li>ARM-specific optimizations</li>
    </ul>
    <h2>Building on ARM</h2>
    <p>To build Valkey on ARM, simply use the standard build process:</p>
    <pre><code>make</code></pre>`
  },
  {
    id: "admin",
    topicName: "Administration",
    description: "Advice for configuring and managing Valkey in production",
    htmlContent: `<p>This guide covers essential administration tasks for running Valkey in production:</p>
    <h2>Key Topics</h2>
    <ul>
      <li>Server Configuration</li>
      <li>Memory Management</li>
      <li>Monitoring</li>
      <li>Backup and Recovery</li>
    </ul>
    <p>For detailed configuration options, see the <a href="#valkey.conf">configuration guide</a>.</p>`
  },
  {
    id: "benchmark",
    topicName: "Benchmarking tool",
    description: "Using the valkey-benchmark utility on a Valkey server",
    htmlContent: `<p>The valkey-benchmark utility helps measure server performance under different workloads.</p>
    <h2>Basic Usage</h2>
    <pre><code>valkey-benchmark -h localhost -p 6379 -c 50 -n 100000</code></pre>
    <p>Common options:</p>
    <ul>
      <li><code>-h</code>: Server hostname</li>
      <li><code>-p</code>: Server port</li>
      <li><code>-c</code>: Number of parallel connections</li>
      <li><code>-n</code>: Total number of requests</li>
    </ul>`
  },
  {
    id: "bitfields",
    topicName: "Bitfields",
    description: "Introduction to Bitfields",
    htmlContent: `<p>Bitfields allow you to efficiently store multiple counters or flags in a single key.</p>
    <h2>Basic Operations</h2>
    <pre><code>BITFIELD mykey SET i5 100 31    # Set a 5-bit signed integer to 31
BITFIELD mykey GET i5 100     # Get the value
BITFIELD mykey INCRBY i5 100 1  # Increment by 1</code></pre>
    <p>Bitfields are useful for:</p>
    <ul>
      <li>Space-efficient counters</li>
      <li>Real-time metrics</li>
      <li>Feature flags</li>
    </ul>`
  },
  {
    id: "bitmaps",
    topicName: "Bitmaps",
    description: "Introduction to Bitmaps",
    htmlContent: `<p>Bitmaps are a space-efficient data structure for handling binary data.</p>
    <h2>Common Commands</h2>
    <pre><code>SETBIT key offset value
GETBIT key offset
BITCOUNT key [start end]</code></pre>
    <p>Use cases include:</p>
    <ul>
      <li>User presence tracking</li>
      <li>Real-time analytics</li>
      <li>Bloom filters</li>
    </ul>`
  },
  {
    id: "mass-insertion",
    topicName: "Bulk loading",
    description: "Writing data in bulk using the RESP protocol",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "cli",
    topicName: "CLI",
    description: "Valkey command line interface",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "performance-on-cpu",
    topicName: "CPU profiling",
    description: "Performance engineering guide for on-CPU profiling and tracing",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "clients",
    topicName: "Client handling",
    description: "How the Valkey server manages client connections",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "client-side-caching",
    topicName: "Client-side caching",
    description: "Server-assisted, client-side caching in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "cluster-spec",
    topicName: "Cluster specification",
    description: "Detailed specification for Valkey cluster",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "cluster-tutorial",
    topicName: "Cluster tutorial",
    description: "Horizontal scaling with Valkey Cluster",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "command-arguments",
    topicName: "Command arguments",
    description: "How Valkey commands expose their documentation programmatically",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "key-specs",
    topicName: "Command key specifications",
    description: "What are command key specification and how to use them in your client",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "command-tips",
    topicName: "Command tips",
    description: "Get additional information about a command",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "valkey.conf",
    topicName: "Configuration",
    description: "Overview of valkey.conf, the Valkey configuration file",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "data-types",
    topicName: "Data types",
    description: "Overview of data types supported by Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "debugging",
    topicName: "Debugging",
    description: "A guide to debugging Valkey server processes",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "ldb",
    topicName: "Debugging Lua scripts",
    description: "How to use the built-in Lua debugger",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "latency",
    topicName: "Diagnosing latency issues",
    description: "Finding the causes of slow responses",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "distlock",
    topicName: "Distributed Locks",
    description: "A distributed lock pattern with Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "faq",
    topicName: "FAQ",
    description: "Commonly asked questions when getting started with Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "functions-intro",
    topicName: "Functions",
    description: "Scripting with functions stored on the server",
    htmlContent: `<p>Valkey Functions allow you to store and execute server-side scripts.</p>
    <h2>Creating a Function</h2>
    <pre><code>FUNCTION LOAD "#!js name=mylib
redis.register_function('hello', function(keys, args) {
    return 'Hello ' + args[1];
});"</code></pre>
    <p>Call the function:</p>
    <pre><code>FCALL hello 0 World</code></pre>`
  },
  {
    id: "geospatial",
    topicName: "Geospatial",
    description: "Introduction to the Valkey Geospatial data type",
    htmlContent: `<p>Geospatial indexes enable location-based features in Valkey.</p>
    <h2>Basic Commands</h2>
    <pre><code>GEOADD locations 13.361389 38.115556 "Palermo"
GEODIST locations "Palermo" "Catania"
GEORADIUS locations 15 37 100 km</code></pre>
    <p>Common use cases:</p>
    <ul>
      <li>Nearby location search</li>
      <li>Distance calculations</li>
      <li>Geofencing</li>
    </ul>`
  },
  {
    id: "hashes",
    topicName: "Hashes",
    description: "Introduction to Hashes",
    htmlContent: `<p>Hashes are maps between string fields and string values, making them a perfect data type to represent objects.</p>
    <h2>Basic Operations</h2>
    <pre><code>HSET user:1000 username antirez password P1pp0 age 34
HGET user:1000 username
HGETALL user:1000</code></pre>
    <p>Benefits of hashes:</p>
    <ul>
      <li>Memory efficient storage</li>
      <li>Field-level operations</li>
      <li>Atomic updates</li>
    </ul>`
  },
  {
    id: "sentinel",
    topicName: "High availability with Valkey Sentinel",
    description: "High availability for non-clustered Valkey",
    htmlContent: `<p>Valkey Sentinel provides high availability for Valkey deployments.</p>
    <h2>Key Features</h2>
    <ul>
      <li>Automatic failover</li>
      <li>Monitoring</li>
      <li>Notification</li>
      <li>Configuration provider</li>
    </ul>
    <h2>Basic Configuration</h2>
    <pre><code>sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000</code></pre>`
  },
  {
    id: "history",
    topicName: "History",
    description: "How the Valkey project started",
    htmlContent: `<p>Valkey began as a modern reimagining of Redis, focusing on:</p>
    <ul>
      <li>Enhanced security features</li>
      <li>Better memory management</li>
      <li>Improved clustering</li>
      <li>Modern protocol support</li>
    </ul>
    <h2>Timeline</h2>
    <ul>
      <li>2023: Project inception</li>
      <li>2024: First stable release</li>
    </ul>`
  },
  {
    id: "hyperloglogs",
    topicName: "HyperLogLog",
    description: "HyperLogLog is a probabilistic data structure that estimates the cardinality of a set.",
    htmlContent: `<p>HyperLogLog (HLL) is used for approximating the number of unique elements in a large set.</p>
    <h2>Basic Commands</h2>
    <pre><code>PFADD visitors user1 user2 user3
PFCOUNT visitors
PFMERGE result visitors1 visitors2</code></pre>
    <p>Key features:</p>
    <ul>
      <li>Constant memory usage (~12KB)</li>
      <li>0.81% standard error</li>
      <li>Excellent for unique counts</li>
    </ul>`
  },
  {
    id: "installation",
    topicName: "Installation",
    description: "Install Valkey on Linux, macOS, and Windows",
    htmlContent: `<p>Installing Valkey is straightforward on most platforms.</p>
    <h2>Quick Install</h2>
    <h3>Linux/macOS</h3>
    <pre><code>wget https://valkey.io/download/valkey-latest.tar.gz
tar xzf valkey-latest.tar.gz
cd valkey-stable
make</code></pre>
    <h3>Using Docker</h3>
    <pre><code>docker pull valkey/valkey
docker run --name myvalkey -d valkey/valkey</code></pre>`
  },
  {
    id: "introduction",
    topicName: "Introduction",
    description: "Learn about the Valkey open source project",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "lru-cache",
    topicName: "Key eviction",
    description: "Overview of Valkey key eviction policies (LRU, LFU, etc.)",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "keyspace",
    topicName: "Keyspace",
    description: "Managing keys in Valkey: Key expiration, scanning, altering and querying the key space",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "notifications",
    topicName: "Keyspace notifications",
    description: "Monitor changes to Valkey keys and values in real time",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "latency-monitor",
    topicName: "Latency monitoring",
    description: "Discovering slow server events in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "license",
    topicName: "License",
    description: "License and trademark information",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "lists",
    topicName: "Lists",
    description: "Introduction to Lists",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "lua-api",
    topicName: "Lua API reference",
    description: "Executing Lua in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "memory-optimization",
    topicName: "Memory optimization",
    description: "Strategies for optimizing memory usage in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "migration",
    topicName: "Migration from Redis to Valkey",
    description: "How to migrate from Redis to Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "modules-intro",
    topicName: "Modules API",
    description: "Introduction to writing Valkey modules",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "modules-native-types",
    topicName: "Modules API for native types",
    description: "How to use native types in a Valkey module",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "modules-api-ref",
    topicName: "Modules API reference",
    description: "Reference for the Valkey Modules API",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "modules-blocking-ops",
    topicName: "Modules and blocking commands",
    description: "How to implement blocking commands in a Valkey module",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "twitter-clone",
    topicName: "Patterns example",
    description: "Learn several Valkey patterns by building a Twitter clone",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "persistence",
    topicName: "Persistence",
    description: "How Valkey writes data to disk",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "pipelining",
    topicName: "Pipelining",
    description: "How to optimize round-trip times by batching Valkey commands",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "programmability",
    topicName: "Programmability",
    description: "Extending Valkey with Lua and Valkey Functions",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "pubsub",
    topicName: "Pub/Sub",
    description: "How to use pub/sub channels in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "quickstart",
    topicName: "Quick start guide",
    description: "Understand how to use basic Valkey data types",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "RDMA",
    topicName: "RDMA experimental support",
    description: "Valkey Over RDMA experimental support",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "releases",
    topicName: "Releases and versioning",
    description: "How new versions of Valkey are released and supported",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "replication",
    topicName: "Replication",
    description: "How Valkey supports high availability and failover with replication",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "eval-intro",
    topicName: "Scripting with Lua",
    description: "Executing Lua in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "indexing",
    topicName: "Secondary indexing",
    description: "Building secondary indexes in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "security",
    topicName: "Security",
    description: "Security model and features in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "sentinel-clients",
    topicName: "Sentinel client spec",
    description: "How to build clients for Valkey Sentinel",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "protocol",
    topicName: "Serialization protocol specification",
    description: "Valkey's serialization protocol (RESP) is the wire protocol that clients implement",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "sets",
    topicName: "Sets",
    description: "Introduction to Sets",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "signals",
    topicName: "Signal handling",
    description: "How Valkey handles common Unix signals",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "sorted-sets",
    topicName: "Sorted Sets",
    description: "Introduction to Sorted Sets",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "streams-intro",
    topicName: "Streams",
    description: "Introduction to Streams",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "strings",
    topicName: "Strings",
    description: "Introduction to Strings",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "encryption",
    topicName: "TLS",
    description: "Valkey TLS support",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "server",
    topicName: "The Valkey server",
    description: "Manual for valkey-server, the Valkey server program",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "transactions",
    topicName: "Transactions",
    description: "How transactions work in Valkey",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  },
  {
    id: "problems",
    topicName: "Troubleshooting Valkey",
    description: "Problems with Valkey? Start here.",
    htmlContent: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>Example Usage</h2>
    <pre><code>SET key1 value1
SET key2 value2
SET key3 value3</code></pre>
    <p>For more information, see the <a href="#documentation">documentation</a>.</p>`
  }
];

// Organize topics by category
export const categories: TopicCategory[] = [
  {
    title: 'CONFIGURATION',
    items: topics.filter(topic => 
      ['acl', 'cli', 'valkey.conf', 'server'].includes(topic.id)
    ),
  },
  {
    title: 'CLIENT HANDLING',
    items: topics.filter(topic => 
      ['clients', 'client-side-caching', 'protocol'].includes(topic.id)
    ),
  },
  {
    title: 'DATA TYPES',
    items: topics.filter(topic => 
      ['strings', 'lists', 'sets', 'sorted-sets', 'hashes', 'streams-intro', 'geospatial', 'hyperloglogs', 'bitmaps', 'bitfields'].includes(topic.id)
    ),
  },
  {
    title: 'SCRIPTING',
    items: topics.filter(topic => 
      ['eval-intro', 'lua-api', 'functions-intro', 'programmability'].includes(topic.id)
    ),
  },
  {
    title: 'HIGH AVAILABILITY',
    items: topics.filter(topic => 
      ['replication', 'sentinel', 'cluster-tutorial', 'cluster-spec'].includes(topic.id)
    ),
  },
  {
    title: 'ADMINISTRATION',
    items: topics.filter(topic => 
      ['admin', 'security', 'encryption', 'persistence', 'signals', 'memory-optimization'].includes(topic.id)
    ),
  },
  {
    title: 'PERFORMANCE',
    items: topics.filter(topic => 
      ['pipelining', 'latency-monitor', 'performance-on-cpu', 'benchmark'].includes(topic.id)
    ),
  },
  {
    title: 'TROUBLESHOOTING',
    items: topics.filter(topic => 
      ['problems', 'debugging', 'ldb'].includes(topic.id)
    ),
  }
]; 