interface CommandCategory {
  id: string;
  categoryName: string;
  description: string;
}

interface CommandReference {
  unid: string;
  command: string;
  description: string;
  htmlContent: string;
  categories: string[];
}

export const commandCategories: CommandCategory[] = [
  {
    id: "admin",
    categoryName: "admin",
    description: "Administrative commands. Normal applications will never need to use these. Includes REPLICAOF, CONFIG, DEBUG, SAVE, MONITOR, ACL, SHUTDOWN, etc."
  },
  {
    id: "bitmap",
    categoryName: "bitmap",
    description: "Operations on the Bitmap data type."
  },
  {
    id: "blocking",
    categoryName: "blocking",
    description: "Commands that may block the connection until they are released by another command."
  },
  {
    id: "connection",
    categoryName: "connection",
    description: "Commands affecting the connection or other connections. This includes AUTH, SELECT, COMMAND, CLIENT, ECHO, PING, etc."
  },
  {
    id: "dangerous",
    categoryName: "dangerous",
    description: "Potentially dangerous commands (each should be considered with care for various reasons). This includes FLUSHALL, MIGRATE, RESTORE, SORT, KEYS, CLIENT, DEBUG, INFO, CONFIG, SAVE, REPLICAOF, etc."
  },
  {
    id: "geo",
    categoryName: "geo",
    description: "Operations on the geospatial data type."
  },
  {
    id: "hash",
    categoryName: "hash",
    description: "Operations on the hash data type."
  },
  {
    id: "hyperloglog",
    categoryName: "hyperloglog",
    description: "Operations on the HyperLogLog data type."
  },
  {
    id: "fast",
    categoryName: "fast",
    description: "Fast O(1) commands. May loop on the number of arguments, but not the number of elements in the key."
  },
  {
    id: "keyspace",
    categoryName: "keyspace",
    description: "Writing or reading from keys, databases, or their metadata in a type-agnostic way. Includes DEL, RESTORE, DUMP, RENAME, EXISTS, DBSIZE, KEYS, EXPIRE, TTL, FLUSHALL, etc."
  },
  {
    id: "list",
    categoryName: "list",
    description: "Operations on the list data type."
  },
  {
    id: "pubsub",
    categoryName: "pubsub",
    description: "Publish/Subscribe-related commands."
  },
  {
    id: "read",
    categoryName: "read",
    description: "Reading from keys (values or metadata)."
  },
  {
    id: "scripting",
    categoryName: "scripting",
    description: "Scripting-related commands."
  },
  {
    id: "set",
    categoryName: "set",
    description: "Operations on the set data type."
  },
  {
    id: "sortedset",
    categoryName: "sortedset",
    description: "Operations on the sorted set data type."
  },
  {
    id: "slow",
    categoryName: "slow",
    description: "All commands that are not categorized as fast."
  },
  {
    id: "stream",
    categoryName: "stream",
    description: "Operations on the stream data type."
  },
  {
    id: "string",
    categoryName: "string",
    description: "Operations on the string data type."
  },
  {
    id: "transaction",
    categoryName: "transaction",
    description: "Commands related to WATCH / MULTI / EXEC transactions."
  },
  {
    id: "write",
    categoryName: "write",
    description: "Writing to keys (values or metadata)."
  },
  {
    id: "cluster",
    categoryName: "cluster",
    description: "Commands related to Valkey Cluster."
  }
];

export const commandReferences: CommandReference[] = [
  {
    unid: "cmd-bitcount",
    command: "BITCOUNT",
    description: "Counts the number of set bits (population counting) in a string.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             BITCOUNT key [start [end [BYTE | BIT]]]
            </code>
        </dd>
    </dl>
    
    <dl>
        <dt>Complexity:</dt>
        <dd>O(N)</dd>
    </dl>
    
    <dl>
        <dt>Since:</dt>
        <dd>2.6.0</dd>
    </dl>

    <p>Count the number of set bits (population counting) in a string.</p>
    <p>By default all the bytes contained in the string are examined.
    It is possible to specify the counting operation only in an interval passing the
    additional arguments <em>start</em> and <em>end</em>.</p>
    <p>Like for the <code>GETRANGE</code> command start and end can contain negative values in
    order to index bytes starting from the end of the string, where -1 is the last
    byte, -2 is the penultimate, and so forth.</p>
    <p>Non-existent keys are treated as empty strings, so the command will return zero.</p>
    <p>By default, the additional arguments <em>start</em> and <em>end</em> specify a byte index.
    We can use an additional argument <code>BIT</code> to specify a bit index.
    So 0 is the first bit, 1 is the second bit, and so forth.
    For negative values, -1 is the last bit, -2 is the penultimate, and so forth.</p>
    
    <h2 id="examples">Examples</h2>
    <pre style="background-color:#2b303b;color:#c0c5ce;"><code><span>127.0.0.1:6379&gt; SET mykey "foobar"
</span><span>OK
</span><span>127.0.0.1:6379&gt; BITCOUNT mykey
</span><span>(integer) 26
</span><span>127.0.0.1:6379&gt; BITCOUNT mykey 0 0
</span><span>(integer) 4
</span><span>127.0.0.1:6379&gt; BITCOUNT mykey 1 1
</span><span>(integer) 6
</span><span>127.0.0.1:6379&gt; BITCOUNT mykey 1 1 BYTE
</span><span>(integer) 6
</span><span>127.0.0.1:6379&gt; BITCOUNT mykey 5 30 BIT
</span><span>(integer) 17
</span></code></pre>

    <h2 id="pattern-real-time-metrics-using-bitmaps">Pattern: real-time metrics using bitmaps</h2>
    <p>Bitmaps are a very space-efficient representation of certain kinds of information.
    One example is a Web application that needs the history of user visits, so that
    for instance it is possible to determine what users are good targets of beta features.</p>
    
    <h3>RESP2/RESP3 Reply</h3>
    <p><a href="/topics/protocol#integers">Integer reply</a>: the number of bits set to 1.</p>
    
    <h3>History</h3>
    <table>
        <thead>
            <tr>
                <th>Version</th>
                <th>Change</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>7.0.0</td>
                <td><p>Added the <code>BYTE|BIT</code> option.</p></td>
            </tr>
            <tr>
                <td>8.0.0</td>
                <td><p><code>end</code> made optional; when called without argument the command reports the last BYTE.</p></td>
            </tr>
        </tbody>
    </table>`,
    categories: ["bitmap"]
  },
  {
    unid: "cmd-bitfield",
    command: "BITFIELD",
    description: "Performs arbitrary bitfield integer operations on strings.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
            </code>
        </dd>
    </dl>`,
    categories: ["bitmap"]
  },
  {
    unid: "cmd-bitfield_ro",
    command: "BITFIELD_RO",
    description: "Performs arbitrary read-only bitfield integer operations on strings.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             BITFIELD_RO key [GET type offset]
            </code>
        </dd>
    </dl>`,
    categories: ["bitmap"]
  },
  {
    unid: "cmd-bitop",
    command: "BITOP",
    description: "Performs bitwise operations on multiple strings, and stores the result.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             BITOP operation destkey key [key ...]
            </code>
        </dd>
    </dl>`,
    categories: ["bitmap"]
  },
  {
    unid: "cmd-bitpos",
    command: "BITPOS",
    description: "Finds the first set (1) or clear (0) bit in a string.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             BITPOS key bit [start [end]]
            </code>
        </dd>
    </dl>`,
    categories: ["bitmap"]
  },
  {
    unid: "cmd-getbit",
    command: "GETBIT",
    description: "Returns a bit value by offset.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             GETBIT key offset
            </code>
        </dd>
    </dl>`,
    categories: ["bitmap"]
  },
  {
    unid: "cmd-setbit",
    command: "SETBIT",
    description: "Sets or clears the bit at offset of the string value. Creates the key if it doesn't exist.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             SETBIT key offset value
            </code>
        </dd>
    </dl>`,
    categories: ["bitmap"]
  },
  {
    unid: "cmd-asking",
    command: "ASKING",
    description: "Signals that a cluster client is following an -ASK redirect.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             ASKING
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster",
    command: "CLUSTER",
    description: "A container for Cluster commands.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER subcommand [arguments ...]
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_addslots",
    command: "CLUSTER ADDSLOTS",
    description: "Assigns new hash slots to a node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER ADDSLOTS slot [slot ...]
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_addslotsrange",
    command: "CLUSTER ADDSLOTSRANGE",
    description: "Assigns new hash slot ranges to a node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER ADDSLOTSRANGE start-slot end-slot [start-slot end-slot ...]
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_bumpepoch",
    command: "CLUSTER BUMPEPOCH",
    description: "Advances the cluster config epoch.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER BUMPEPOCH
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_count_failure_reports",
    command: "CLUSTER COUNT-FAILURE-REPORTS",
    description: "Returns the number of active failure reports active for a node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER COUNT-FAILURE-REPORTS node-id
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_countkeysinslot",
    command: "CLUSTER COUNTKEYSINSLOT",
    description: "Returns the number of keys in a hash slot.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER COUNTKEYSINSLOT slot
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_delslots",
    command: "CLUSTER DELSLOTS",
    description: "Sets hash slots as unbound for a node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER DELSLOTS slot [slot ...]
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_delslotsrange",
    command: "CLUSTER DELSLOTSRANGE",
    description: "Sets hash slot ranges as unbound for a node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER DELSLOTSRANGE start-slot end-slot [start-slot end-slot ...]
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_failover",
    command: "CLUSTER FAILOVER",
    description: "Forces a replica to perform a manual failover of its primary.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER FAILOVER [FORCE|TAKEOVER]
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_flushslots",
    command: "CLUSTER FLUSHSLOTS",
    description: "Deletes all slots information from a node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER FLUSHSLOTS
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_forget",
    command: "CLUSTER FORGET",
    description: "Removes a node from the nodes table.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER FORGET node-id
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_getkeysinslot",
    command: "CLUSTER GETKEYSINSLOT",
    description: "Returns the key names in a hash slot.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER GETKEYSINSLOT slot count
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_help",
    command: "CLUSTER HELP",
    description: "Returns helpful text about the different subcommands.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER HELP
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_info",
    command: "CLUSTER INFO",
    description: "Returns information about the state of a node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER INFO
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_keyslot",
    command: "CLUSTER KEYSLOT",
    description: "Returns the hash slot for a key.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER KEYSLOT key
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_links",
    command: "CLUSTER LINKS",
    description: "Returns a list of all TCP links to and from peer nodes.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER LINKS
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  },
  {
    unid: "cmd-cluster_meet",
    command: "CLUSTER MEET",
    description: "Forces a node to handshake with another node.",
    htmlContent: `
    <dl>
        <dt>Usage:</dt>
        <dd>
            <code>
             CLUSTER MEET ip port
            </code>
        </dd>
    </dl>`,
    categories: ["cluster"]
  }
]; 