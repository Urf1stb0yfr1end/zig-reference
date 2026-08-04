# The 500 Zig Reference Modules

> Five hundred small, cumulative projects for learning systems programming from first principles, exposing recurring C pain, and demonstrating what Zig makes explicit.

## Purpose

This file is the construction map for `zig-reference`. It contains exactly 500 proposed modules. Each module should eventually be small enough to study completely, strict enough to teach durable habits, and reusable enough to support later projects.

Every implementation should answer three questions:

1. **C pain:** What recurring C failure, ambiguity, or maintenance burden does this module confront?
2. **Zig answer:** Which Zig mechanisms make the contract more visible or the invalid states harder to represent?
3. **Foundation:** What future work can reuse the module or its reasoning?

The objective is not to mock C. C reveals the machine with extraordinary directness. The objective is to preserve that directness while making ownership, bounds, states, failure, cleanup, and intent visible.

Each completed module should include source, tests, a `README.md`, and a `MASTERY.md`. Implementations should target Zig 0.14.0 until the repository deliberately adopts another baseline.

---

## 01 — Values, types, and representation

001. **Checked cast** — **C pain:** Implicit narrowing and signedness conversions silently change values. **Zig answer:** Use explicit casts, range checks, and precise integer types. **Foundation:** Safe numeric boundaries.
002. **Saturating counter** — **C pain:** Overflow wraps or invokes undefined behavior depending on type and operation. **Zig answer:** Expose saturating arithmetic as the policy. **Foundation:** Counters and quotas.
003. **Wrapping sequence number** — **C pain:** Ad hoc overflow assumptions hide protocol semantics. **Zig answer:** Name wrapping arithmetic explicitly. **Foundation:** Protocols and ring indices.
004. **Nonzero integer** — **C pain:** Zero is forbidden only by comments and repeated checks. **Zig answer:** Represent construction as validation and keep the invariant local. **Foundation:** Identifiers and divisors.
005. **Bounded integer** — **C pain:** A numeric field accepts impossible values throughout the program. **Zig answer:** Create a validated value with explicit minimum and maximum. **Foundation:** Dimensions, ports, priorities.
006. **Validated enum decoder** — **C pain:** Arbitrary integers are cast into enums with invalid states. **Zig answer:** Decode integers through an error-returning boundary. **Foundation:** Binary formats and FFI.
007. **Bit flags type** — **C pain:** Macros and raw masks mix unrelated flags and permit invalid combinations. **Zig answer:** Wrap masks with named operations and validation. **Foundation:** Permissions and device registers.
008. **Tagged result** — **C pain:** Status code plus partially initialized output parameters drift apart. **Zig answer:** Use a tagged union or error union for exclusive outcomes. **Foundation:** APIs and parsers.
009. **Optional handle** — **C pain:** Magic values such as -1 or NULL carry several meanings. **Zig answer:** Use an optional typed handle. **Foundation:** Resources and tables.
010. **Unit-safe quantity** — **C pain:** Bytes, pages, sectors, and elements are all size_t. **Zig answer:** Use distinct wrapper types with explicit conversions. **Foundation:** Storage and memory management.
011. **Endian integer** — **C pain:** Host-endian loads are scattered and architecture-dependent. **Zig answer:** Centralize byte order in the type or decoding operation. **Foundation:** Protocols and files.
012. **Aligned address** — **C pain:** Alignment exists as an undocumented precondition. **Zig answer:** Validate and expose aligned addresses explicitly. **Foundation:** Allocators and devices.
013. **Canonical address** — **C pain:** Invalid machine addresses travel as ordinary integers. **Zig answer:** Validate architecture-specific canonical form at construction. **Foundation:** Kernels and hypervisors.
014. **Range type** — **C pain:** Start and length overflow or disagree across APIs. **Zig answer:** Represent a checked half-open range. **Foundation:** Memory, files, and parsing.
015. **Version type** — **C pain:** Version fields are compared through fragile integer tricks. **Zig answer:** Use a structured version with explicit ordering. **Foundation:** Formats and compatibility.
016. **FourCC code** — **C pain:** Character constants and endian assumptions vary by compiler. **Zig answer:** Decode and print a fixed four-byte code explicitly. **Foundation:** Media and container formats.
017. **ASCII byte** — **C pain:** Text routines accidentally accept arbitrary bytes. **Zig answer:** Validate ASCII at the boundary. **Foundation:** Lexers and protocols.
018. **UTF-8 code point iterator** — **C pain:** Manual byte stepping splits sequences and overruns input. **Zig answer:** Use slices, explicit decoding errors, and iterator state. **Foundation:** Text processing.
019. **Sentinel adapter** — **C pain:** Null-terminated and length-delimited strings are confused. **Zig answer:** Isolate sentinel conversion at foreign boundaries. **Foundation:** C interoperability.
020. **Type-erased context** — **C pain:** void pointers lose lifetime, alignment, and callback contracts. **Zig answer:** Confine erasure behind a typed adapter. **Foundation:** Callbacks and plugins.

## 02 — Fixed storage and small containers

021. **Fixed-capacity vector** — **C pain:** Length, capacity, and initialized storage are maintained by convention. **Zig answer:** Keep the invariant inside a generic type with explicit errors. **Foundation:** Base container reasoning.
022. **Small string** — **C pain:** Stack buffers overflow or truncate without a consistent policy. **Zig answer:** Provide checked append and explicit truncation choices. **Foundation:** Diagnostics and paths.
023. **Fixed stack** — **C pain:** Top indices underflow and overflow through unchecked arithmetic. **Zig answer:** Expose push and pop as typed fallible operations. **Foundation:** Parsers and virtual machines.
024. **Inline queue** — **C pain:** Head and tail equality ambiguously means empty or full. **Zig answer:** Track logical length and define wraparound once. **Foundation:** Schedulers and devices.
025. **Static deque** — **C pain:** Front and back arithmetic becomes duplicated and fragile. **Zig answer:** Centralize wrapped indexing and state invariants. **Foundation:** Work queues.
026. **Fixed priority queue** — **C pain:** Heap ordering and capacity checks are scattered. **Zig answer:** Combine bounded storage with an explicit comparator. **Foundation:** Schedulers and simulations.
027. **Slot map** — **C pain:** Raw array indices become stale after removal and reuse. **Zig answer:** Use generation-bearing handles. **Foundation:** Entity and resource tables.
028. **Sparse set** — **C pain:** Parallel arrays silently lose synchronization. **Zig answer:** Bundle index and dense storage invariants. **Foundation:** ECS and registries.
029. **Fixed bit set** — **C pain:** Shift widths, final padding bits, and indices are error-prone. **Zig answer:** Use precise shifts and checked logical bounds. **Foundation:** Allocators and masks.
030. **Enum set** — **C pain:** Integer masks admit bits with no corresponding enum member. **Zig answer:** Derive storage and operations from the enum. **Foundation:** Capabilities and states.
031. **Fixed matrix** — **C pain:** Row strides and dimensions are repeatedly recomputed. **Zig answer:** Encode dimensions and checked indexing in the type. **Foundation:** Graphics and numerics.
032. **Static graph adjacency** — **C pain:** Manual edge counts overrun fixed buffers. **Zig answer:** Use bounded per-node collections. **Foundation:** Algorithms and routing.
033. **Inline byte builder** — **C pain:** Repeated pointer arithmetic corrupts output buffers. **Zig answer:** Use checked writes with a visible cursor. **Foundation:** Serialization.
034. **Fixed freelist** — **C pain:** Sentinel indices and cycles corrupt reusable slots. **Zig answer:** Validate links and ownership transitions. **Foundation:** Pools and kernels.
035. **Object pool** — **C pain:** Constructed and free slots are confused. **Zig answer:** Track occupancy separately from storage. **Foundation:** Games and embedded systems.
036. **Generational arena** — **C pain:** Pointers survive resets and become dangling. **Zig answer:** Issue handles tied to arena generations. **Foundation:** Compilers and frame allocators.
037. **Fixed histogram** — **C pain:** Bucket calculations overflow or index out of range. **Zig answer:** Centralize range mapping and saturation. **Foundation:** Metrics and profiling.
038. **Small map** — **C pain:** Parallel key/value arrays drift and duplicate keys. **Zig answer:** Provide explicit lookup, insertion, and capacity failure. **Foundation:** Configuration and embedded code.
039. **Fixed multimap** — **C pain:** Counts and ranges into value storage become inconsistent. **Zig answer:** Maintain grouped ranges through one API. **Foundation:** Indexes and parsers.
040. **Static string interner** — **C pain:** Offsets and backing storage ownership become tangled. **Zig answer:** Use bounded storage and stable indices. **Foundation:** Compilers and protocols.

## 03 — Dynamic memory and ownership

041. **Dynamic array** — **C pain:** realloc can lose the only pointer, overflow sizes, and invalidate aliases. **Zig answer:** Use explicit allocators, checked growth, and failure-atomic replacement. **Foundation:** General owned storage.
042. **Owned buffer** — **C pain:** Pointer and byte count do not reveal who frees memory. **Zig answer:** Pair allocation, length, allocator, and destruction. **Foundation:** I/O and FFI.
043. **Resizable string** — **C pain:** Capacity, terminators, and UTF-8 validity become independent hazards. **Zig answer:** Separate byte ownership, sentinel adaptation, and encoding policy. **Foundation:** CLI and text.
044. **Arena allocator** — **C pain:** Reset lifetimes are implicit and escaped pointers survive. **Zig answer:** Make region lifetime and reset behavior explicit. **Foundation:** Parsing and batch work.
045. **Bump allocator** — **C pain:** Alignment and exhaustion arithmetic are frequently wrong. **Zig answer:** Use checked alignment and bounded remaining space. **Foundation:** Boot code and scratch memory.
046. **Free-list allocator** — **C pain:** Block splitting and coalescing corrupt metadata easily. **Zig answer:** State invariants and validate transitions. **Foundation:** Runtimes and kernels.
047. **Buddy allocator** — **C pain:** Order calculations and merge partners are subtle. **Zig answer:** Encode orders and checked block relationships. **Foundation:** Page and heap allocation.
048. **Slab allocator** — **C pain:** Object state and slab state diverge under partial failure. **Zig answer:** Use explicit slab ownership and slot maps. **Foundation:** Kernels and servers.
049. **Pool allocator** — **C pain:** Double returns create freelist cycles. **Zig answer:** Track allocation state and reject invalid release. **Foundation:** High-frequency objects.
050. **Tracking allocator** — **C pain:** Leaks and mismatched frees are discovered too late. **Zig answer:** Wrap an allocator with call-site accounting. **Foundation:** Tests and diagnostics.
051. **Failing allocator** — **C pain:** Failure paths remain untested because malloc usually succeeds. **Zig answer:** Inject deterministic allocation failure. **Foundation:** Reliability testing.
052. **Quota allocator** — **C pain:** Untrusted work can consume unlimited memory. **Zig answer:** Wrap allocation with explicit budget enforcement. **Foundation:** Servers and parsers.
053. **Fallback allocator** — **C pain:** Ownership becomes ambiguous when several allocators may serve a request. **Zig answer:** Record or structurally determine the successful source. **Foundation:** Embedded and resilient systems.
054. **Aligned allocation** — **C pain:** Manual over-allocation loses the original pointer. **Zig answer:** Keep base allocation and aligned view together. **Foundation:** SIMD and devices.
055. **Page allocator adapter** — **C pain:** Byte requests and page-granular ownership are conflated. **Zig answer:** Translate sizes with checked rounding and explicit page counts. **Foundation:** Kernels and hypervisors.
056. **Owned slice clone** — **C pain:** Shallow copies silently share mutable or short-lived storage. **Zig answer:** Make duplication allocator-explicit. **Foundation:** APIs and caches.
057. **Move-only resource pattern** — **C pain:** Struct assignment duplicates ownership and invites double free. **Zig answer:** Define transfer operations and poison moved-from state in debug builds. **Foundation:** Files, locks, devices.
058. **Reference-counted object** — **C pain:** Atomic counts, cycles, and finalization rules are hidden. **Zig answer:** Expose ownership policy and constrain the use case. **Foundation:** Shared immutable data.
059. **Copy-on-write buffer** — **C pain:** Aliasing and mutation races are extremely subtle. **Zig answer:** Centralize uniqueness checks and clone transitions. **Foundation:** Snapshots and strings.
060. **Secure buffer** — **C pain:** Optimizers may remove clearing and copies spread secrets. **Zig answer:** Encapsulate allocation, access, and guaranteed erasure. **Foundation:** Cryptographic material.

## 04 — Byte access and binary construction

061. **Bounded byte reader** — **C pain:** Pointer arithmetic trusts lengths and failed reads consume state. **Zig answer:** Use a borrowed slice, checked remaining bytes, and failure-atomic cursor movement. **Foundation:** All binary parsers.
062. **Bounded byte writer** — **C pain:** Output cursors overrun destination buffers. **Zig answer:** Check capacity before every write and preserve cursor on failure. **Foundation:** Serialization.
063. **Sub-reader** — **C pain:** Nested structures accidentally read beyond their declared region. **Zig answer:** Confine parsing to a child slice. **Foundation:** Chunked formats.
064. **Bit reader** — **C pain:** Cross-byte shifts and end conditions are repeatedly reimplemented. **Zig answer:** Maintain a bounded bit cursor with explicit bit order. **Foundation:** Compression and codecs.
065. **Bit writer** — **C pain:** Partial bytes and flush rules produce corrupt streams. **Zig answer:** Make pending-bit state explicit. **Foundation:** Compression.
066. **Varint decoder** — **C pain:** Overflow, overlong encodings, and truncation are missed. **Zig answer:** Bound iterations and return distinct errors. **Foundation:** Protocols and storage.
067. **Varint encoder** — **C pain:** Buffer sizing and continuation bits are duplicated. **Zig answer:** Provide checked size calculation and writing. **Foundation:** Protocols.
068. **ZigZag integer codec** — **C pain:** Signed shifts and implementation-defined behavior cause portability bugs. **Zig answer:** Use precise unsigned transforms. **Foundation:** Serialization.
069. **Hex decoder** — **C pain:** Odd lengths and invalid characters are often silently accepted. **Zig answer:** Return indexed decoding errors. **Foundation:** Tools and protocols.
070. **Base64 decoder** — **C pain:** Padding and output sizing are easy to mishandle. **Zig answer:** Validate structure before writing output. **Foundation:** Transport formats.
071. **CRC32 calculator** — **C pain:** Table initialization and signed byte indexing go wrong. **Zig answer:** Use explicit unsigned data flow and test vectors. **Foundation:** Archives and storage.
072. **Checksum stream** — **C pain:** Callers forget which bytes are covered. **Zig answer:** Wrap the reader or writer so coverage is structural. **Foundation:** Files and packets.
073. **Length-prefixed field** — **C pain:** Declared lengths overflow ranges or exceed remaining input. **Zig answer:** Use checked range creation before slicing. **Foundation:** Protocols.
074. **TLV decoder** — **C pain:** Unknown tags, duplicate fields, and malformed lengths create sprawling logic. **Zig answer:** Use typed tags, bounded values, and explicit policy. **Foundation:** Device and network protocols.
075. **TLV encoder** — **C pain:** Lengths are backpatched unsafely. **Zig answer:** Stage or reserve fields with checked offsets. **Foundation:** Protocols.
076. **Binary cursor mark** — **C pain:** Manual cursor rollback is incomplete after nested failure. **Zig answer:** Provide save, restore, and transaction-style parsing. **Foundation:** Speculative parsers.
077. **Magic-header validator** — **C pain:** memcmp calls omit length checks or compare the wrong width. **Zig answer:** Combine bounds and exact header matching. **Foundation:** File detection.
078. **Padding reader** — **C pain:** Alignment skips can run beyond input or accept nonzero padding accidentally. **Zig answer:** Compute checked padding and validate policy. **Foundation:** Object formats.
079. **Record iterator** — **C pain:** Malformed record sizes cause infinite loops. **Zig answer:** Require positive progress and bounded next offsets. **Foundation:** Logs and tables.
080. **Scatter/gather view** — **C pain:** Parallel pointer and length arrays become inconsistent. **Zig answer:** Represent each segment as a slice and validate totals. **Foundation:** Networking and I/O.

## 05 — Text, strings, and lexical foundations

081. **ASCII classifier** — **C pain:** ctype is undefined for negative char values and locale-dependent. **Zig answer:** Use explicit byte predicates. **Foundation:** Lexers and protocols.
082. **Line iterator** — **C pain:** CRLF, final unterminated lines, and empty input are mishandled. **Zig answer:** Define exact slice semantics. **Foundation:** Config and logs.
083. **Token iterator** — **C pain:** strtok mutates input and hides global state. **Zig answer:** Use a borrowed slice and explicit cursor. **Foundation:** CLI and parsing.
084. **Delimiter splitter** — **C pain:** Empty fields and repeated delimiters have inconsistent behavior. **Zig answer:** State the policy in the API and tests. **Foundation:** CSV-like formats.
085. **Whitespace trimmer** — **C pain:** Pointer endpoints underflow on empty strings. **Zig answer:** Use slices and checked indices. **Foundation:** Text utilities.
086. **Integer parser** — **C pain:** atoi cannot report overflow or invalid trailing characters. **Zig answer:** Return typed parse errors and consumed length. **Foundation:** CLI and formats.
087. **Float parser boundary** — **C pain:** errno and partial parsing lead to ambiguous outcomes. **Zig answer:** Wrap conversion in a strict result type. **Foundation:** Config and scientific input.
088. **Escaped string decoder** — **C pain:** Backslashes, Unicode escapes, and output sizing create partial writes. **Zig answer:** Use a two-phase or failure-atomic decoder. **Foundation:** JSON and languages.
089. **String escaper** — **C pain:** Output expansion overruns guessed buffers. **Zig answer:** Count or dynamically grow with checked arithmetic. **Foundation:** Serializers.
090. **UTF-8 validator** — **C pain:** Byte scans accept overlong or truncated sequences. **Zig answer:** Implement explicit state and indexed errors. **Foundation:** Text boundaries.
091. **UTF-8 iterator** — **C pain:** Incrementing one byte splits characters. **Zig answer:** Yield validated code points and byte spans. **Foundation:** Editors and compilers.
092. **Case-insensitive ASCII compare** — **C pain:** tolower inherits locale and signed-char hazards. **Zig answer:** Use explicit ASCII folding. **Foundation:** HTTP and protocols.
093. **Path component iterator** — **C pain:** Slash handling, empty components, and roots vary by platform. **Zig answer:** Keep platform policy explicit. **Foundation:** Filesystems.
094. **Shell-word tokenizer** — **C pain:** Quoting and escapes become ad hoc and injection-prone. **Zig answer:** Separate lexical parsing from process execution. **Foundation:** CLI tools.
095. **INI lexer** — **C pain:** Line mutation and pointer lifetimes leak into the model. **Zig answer:** Return borrowed tokens with clear ownership. **Foundation:** Configuration.
096. **CSV row parser** — **C pain:** Quoted separators and embedded newlines break strtok-style parsing. **Zig answer:** Use an explicit state machine. **Foundation:** Data tools.
097. **JSON tokenizer** — **C pain:** Recursive pointer code mixes scanning and semantic construction. **Zig answer:** Emit typed tokens with spans and errors. **Foundation:** Parsers.
098. **Source span** — **C pain:** Line and column tracking drifts from byte offsets. **Zig answer:** Represent spans once and derive diagnostics. **Foundation:** Compilers.
099. **String interner** — **C pain:** Pointer stability and duplicate ownership are unclear. **Zig answer:** Return stable IDs and own bytes centrally. **Foundation:** Compilers and databases.
100. **Rope leaf** — **C pain:** Large text edits turn contiguous buffers into realloc and aliasing pain. **Zig answer:** Use explicit node ownership and immutable slices. **Foundation:** Editors.

## 06 — Core algorithms

101. **Binary search** — **C pain:** Comparator contracts and midpoint overflow are frequently wrong. **Zig answer:** Use checked half-open ranges and typed ordering. **Foundation:** Collections.
102. **Lower bound** — **C pain:** Off-by-one variants proliferate across codebases. **Zig answer:** Provide one proven half-open implementation. **Foundation:** Indexes.
103. **Stable insertion sort** — **C pain:** Pointer arithmetic obscures movement and overlap rules. **Zig answer:** Use slices and explicit stable semantics. **Foundation:** Small datasets.
104. **Heap sort** — **C pain:** Heap bounds and child indices overflow. **Zig answer:** Use checked index formulas. **Foundation:** Priority structures.
105. **Merge sort** — **C pain:** Temporary ownership and partial allocation failure complicate cleanup. **Zig answer:** Pass allocators explicitly and preserve input on failure. **Foundation:** General sorting.
106. **Introsort study** — **C pain:** Optimization choices hide correctness invariants. **Zig answer:** Separate partition, depth policy, and fallback. **Foundation:** Performance education.
107. **Selection algorithm** — **C pain:** Partition loops can stall on duplicates. **Zig answer:** State progress invariants and test adversarial inputs. **Foundation:** Statistics.
108. **Dedup sorted slice** — **C pain:** Read/write cursors alias incorrectly. **Zig answer:** Use explicit initialized prefixes. **Foundation:** Data cleanup.
109. **Run-length encoder** — **C pain:** Output growth and count overflow corrupt streams. **Zig answer:** Use checked counts and writers. **Foundation:** Compression.
110. **Run-length decoder** — **C pain:** Untrusted counts trigger huge allocations or overruns. **Zig answer:** Apply output limits before expansion. **Foundation:** Security boundaries.
111. **Prefix sum** — **C pain:** Accumulator overflow silently invalidates every later index. **Zig answer:** Choose and check the accumulator type. **Foundation:** Analytics.
112. **Sliding window** — **C pain:** Head/tail logic duplicates ring-buffer bugs. **Zig answer:** Reuse queue invariants. **Foundation:** Streaming.
113. **KMP substring search** — **C pain:** Failure-table indices are easy to corrupt. **Zig answer:** Build typed tables and preserve bounds. **Foundation:** Text search.
114. **Aho-Corasick trie** — **C pain:** Node ownership and transition tables grow chaotically. **Zig answer:** Use stable indices and explicit construction phases. **Foundation:** Scanning.
115. **Topological sort** — **C pain:** In-degree mutation and queue capacity are mishandled. **Zig answer:** Separate graph ownership from algorithm state. **Foundation:** Build systems.
116. **Union-find** — **C pain:** Parent cycles and rank corruption are silent. **Zig answer:** Encapsulate find and union invariants. **Foundation:** Graphs.
117. **Dijkstra queue** — **C pain:** Sentinel infinities and stale heap entries create subtle bugs. **Zig answer:** Use optionals and validated weights. **Foundation:** Routing.
118. **LRU list primitive** — **C pain:** Pointer unlinking corrupts neighbors under edge cases. **Zig answer:** Use intrusive links with guarded transitions. **Foundation:** Caches.
119. **Bloom filter** — **C pain:** Hash count, bit count, and modulo arithmetic are unchecked. **Zig answer:** Use typed configuration and bit-set reuse. **Foundation:** Probabilistic indexes.
120. **Consistent hash ring** — **C pain:** Integer wrap and node ordering assumptions remain implicit. **Zig answer:** Make wrapping and ordering explicit. **Foundation:** Distributed systems.

## 07 — Maps, indexes, and identity

121. **Open-address hash map** — **C pain:** Tombstones, load factors, and resize rollback are fragile. **Zig answer:** Encode slot states and failure-atomic rehashing. **Foundation:** General lookup.
122. **Robin Hood map** — **C pain:** Probe-distance arithmetic and deletion shifts are subtle. **Zig answer:** Expose probe invariants and typed slot states. **Foundation:** High-performance maps.
123. **Chained hash map** — **C pain:** Node allocation failure and ownership leak through buckets. **Zig answer:** Use allocator-explicit nodes and cleanup. **Foundation:** Educational comparison.
124. **String map** — **C pain:** Key lifetime is usually undocumented. **Zig answer:** Offer borrowed-key and owned-key variants explicitly. **Foundation:** Configuration and parsers.
125. **Interned-key map** — **C pain:** Pointer keys become unstable after storage growth. **Zig answer:** Use stable intern IDs. **Foundation:** Compilers.
126. **Multimap** — **C pain:** Value ranges and key ownership drift apart. **Zig answer:** Centralize grouped storage invariants. **Foundation:** Indexes.
127. **Bidirectional map** — **C pain:** Two maps can diverge after partial mutation. **Zig answer:** Commit updates transactionally. **Foundation:** Registries.
128. **Ordered map** — **C pain:** Tree rotations and parent pointers corrupt easily. **Zig answer:** Use explicit node states and invariant tests. **Foundation:** Databases.
129. **B-tree node** — **C pain:** Key counts and child counts differ by one and often desynchronize. **Zig answer:** Encode structural limits and split phases. **Foundation:** Storage engines.
130. **Radix tree** — **C pain:** Prefix lengths and compressed edges create slice lifetime bugs. **Zig answer:** Own labels explicitly and validate splits. **Foundation:** Routing and strings.
131. **Trie** — **C pain:** Child representation and node ownership are ad hoc. **Zig answer:** Use stable node indices and explicit alphabets. **Foundation:** Lexers.
132. **Interval map** — **C pain:** Overlaps and boundary conventions create contradictions. **Zig answer:** Use half-open ranges and normalization. **Foundation:** Memory maps.
133. **Range set** — **C pain:** Merge and subtraction edge cases explode combinatorially. **Zig answer:** Centralize canonical nonoverlapping form. **Foundation:** Allocators.
134. **Handle table** — **C pain:** Raw pointers escape and outlive resources. **Zig answer:** Use generation-checked opaque handles. **Foundation:** Kernels and APIs.
135. **ID allocator** — **C pain:** Wraparound can reuse live IDs. **Zig answer:** Track occupancy and return exhaustion. **Foundation:** Protocols.
136. **Name registry** — **C pain:** Duplicate registration and removal races produce stale entries. **Zig answer:** Use explicit ownership and lifecycle states. **Foundation:** Plugins.
137. **Reverse index** — **C pain:** Removal forgets one side of the relation. **Zig answer:** Bundle forward and reverse mutation. **Foundation:** Search.
138. **Prefix index** — **C pain:** Byte prefixes and Unicode prefixes are confused. **Zig answer:** State encoding and unit explicitly. **Foundation:** Text systems.
139. **Case-folded map** — **C pain:** Locale behavior makes equality unstable. **Zig answer:** Use a defined normalization policy. **Foundation:** Protocols.
140. **Perfect-hash table generator** — **C pain:** Generated offsets and collision assumptions go unchecked. **Zig answer:** Validate generated tables at build time. **Foundation:** Static keywords.

## 08 — State machines and control flow

141. **Explicit lifecycle machine** — **C pain:** Boolean flags permit impossible combinations. **Zig answer:** Use a tagged union for exclusive states. **Foundation:** Resources and services.
142. **Parser state machine** — **C pain:** Switches over integers fall through or miss transitions. **Zig answer:** Use enum states and exhaustive handling. **Foundation:** Protocols.
143. **Connection state** — **C pain:** Socket, handshake, and authentication flags diverge. **Zig answer:** Store only data valid for the active state. **Foundation:** Networking.
144. **Job state** — **C pain:** Queued, running, cancelled, and completed fields contradict. **Zig answer:** Model transitions explicitly. **Foundation:** Schedulers.
145. **Device state** — **C pain:** Initialized flags do not capture partial hardware setup. **Zig answer:** Use staged states with cleanup per stage. **Foundation:** Drivers.
146. **Transaction state** — **C pain:** Commit and rollback paths mutate scattered flags. **Zig answer:** Represent active, committed, and aborted states distinctly. **Foundation:** Databases.
147. **Retry policy** — **C pain:** Counters, deadlines, and last errors are scattered. **Zig answer:** Bundle policy and next decision. **Foundation:** Clients.
148. **Circuit breaker** — **C pain:** Time and failure counters produce invalid combinations. **Zig answer:** Use explicit closed, open, and half-open states. **Foundation:** Services.
149. **Backoff iterator** — **C pain:** Overflow and jitter arithmetic become inconsistent. **Zig answer:** Generate bounded delays through one object. **Foundation:** Networking.
150. **Cancellation token** — **C pain:** Volatile booleans do not provide synchronization semantics. **Zig answer:** Use atomics with documented memory ordering. **Foundation:** Concurrency.
151. **Deadline type** — **C pain:** Relative and absolute times are mixed. **Zig answer:** Use distinct deadline construction and comparison. **Foundation:** I/O.
152. **Progress tracker** — **C pain:** Completed work can exceed total after retries. **Zig answer:** State monotonic invariants. **Foundation:** Tools.
153. **Finite protocol handshake** — **C pain:** Message order is validated in scattered callbacks. **Zig answer:** Make each accepted message a state transition. **Foundation:** Security protocols.
154. **Command dispatcher** — **C pain:** Function-pointer tables lack argument and result contracts. **Zig answer:** Use tagged commands and typed handlers. **Foundation:** CLIs and servers.
155. **Event reducer** — **C pain:** Shared mutable state changes in many places. **Zig answer:** Apply typed events through one transition function. **Foundation:** Applications.
156. **Undo log** — **C pain:** Partial mutations are hard to reverse. **Zig answer:** Record explicit inverse operations. **Foundation:** Editors and transactions.
157. **Two-phase initialization** — **C pain:** Half-constructed objects escape. **Zig answer:** Keep preparation separate from activation. **Foundation:** Systems resources.
158. **Once cell** — **C pain:** Ad hoc static flags race and expose uninitialized data. **Zig answer:** Use atomics and explicit initialization states. **Foundation:** Libraries.
159. **Lazy value** — **C pain:** NULL means both uninitialized and failed. **Zig answer:** Represent empty, computing, ready, and failed states. **Foundation:** Caches.
160. **Protocol version negotiation** — **C pain:** Booleans and min/max fields permit impossible results. **Zig answer:** Return a tagged negotiated outcome. **Foundation:** Compatibility.

## 09 — Errors, diagnostics, and cleanup

161. **Error-set boundary** — **C pain:** Integer error codes collide and lose meaning. **Zig answer:** Use explicit error sets at module boundaries. **Foundation:** All APIs.
162. **Error context stack** — **C pain:** Callers overwrite errno or lose operation context. **Zig answer:** Attach structured context without hiding the base error. **Foundation:** Diagnostics.
163. **Cleanup stack** — **C pain:** goto cleanup labels become fragile as resources multiply. **Zig answer:** Use defer in acquisition order. **Foundation:** Resource code.
164. **Partial-construction guard** — **C pain:** Every new field requires another manual rollback branch. **Zig answer:** Use errdefer immediately after acquisition. **Foundation:** Owned objects.
165. **Transactional mutation** — **C pain:** State changes before all failure points pass. **Zig answer:** Stage changes and commit last. **Foundation:** Containers and storage.
166. **Diagnostic writer** — **C pain:** sprintf overflows and error messages allocate unexpectedly. **Zig answer:** Use bounded or allocator-explicit formatting. **Foundation:** Tools and kernels.
167. **Source diagnostic** — **C pain:** Offsets, lines, and snippets become inconsistent. **Zig answer:** Use source spans and a single renderer. **Foundation:** Compilers.
168. **Error accumulator** — **C pain:** Validation stops at the first issue or leaks partial results. **Zig answer:** Collect typed diagnostics under a quota. **Foundation:** Config and schemas.
169. **Panic boundary** — **C pain:** Libraries abort for recoverable failures. **Zig answer:** Separate assertions from expected errors. **Foundation:** Reusable modules.
170. **Assertion taxonomy** — **C pain:** assert disappears in release builds and mixes contracts with validation. **Zig answer:** Distinguish internal invariants from external errors. **Foundation:** All code.
171. **Cleanup-safe callback** — **C pain:** Callbacks can longjmp or violate ownership conventions. **Zig answer:** Define result and ownership contracts. **Foundation:** FFI.
172. **Retry classification** — **C pain:** All I/O errors are retried or none are. **Zig answer:** Map errors to explicit retry policy. **Foundation:** Networking.
173. **Exit-status model** — **C pain:** Raw integers lose signal and platform meaning. **Zig answer:** Use tagged process outcomes. **Foundation:** Process tools.
174. **Test failure helper** — **C pain:** Tests repeat manual error matching and leak resources. **Zig answer:** Use typed expectations and defer. **Foundation:** Testing.
175. **Golden diagnostic test** — **C pain:** Message drift breaks users silently. **Zig answer:** Snapshot stable structured output. **Foundation:** Compilers and CLIs.
176. **Fault injection point** — **C pain:** Rare branches remain untested. **Zig answer:** Expose deterministic failure hooks. **Foundation:** Reliability.
177. **Invariant checker** — **C pain:** Corruption is detected far from its cause. **Zig answer:** Provide debug validation methods. **Foundation:** Data structures.
178. **Poisoned-state marker** — **C pain:** Code continues using an object after fatal internal failure. **Zig answer:** Transition explicitly to unusable state. **Foundation:** Storage and devices.
179. **Cleanup ownership chart** — **C pain:** Comments disagree about who releases what. **Zig answer:** Encode ownership in types and module APIs. **Foundation:** Large systems.
180. **Error translation layer** — **C pain:** Foreign status codes leak through the whole program. **Zig answer:** Translate once at the boundary. **Foundation:** FFI and OS APIs.

## 10 — Files, paths, and filesystem work

181. **Owned file handle** — **C pain:** Descriptors leak across error branches. **Zig answer:** Pair the handle with deterministic close. **Foundation:** CLI and services.
182. **Exact file reader** — **C pain:** Short reads are mistaken for EOF or success. **Zig answer:** Loop with explicit progress and size limits. **Foundation:** Binary loading.
183. **Exact file writer** — **C pain:** Partial writes silently truncate output. **Zig answer:** Loop until complete or return a typed failure. **Foundation:** Persistence.
184. **Atomic file replace** — **C pain:** Writing in place leaves corrupt files after crashes. **Zig answer:** Write, sync, rename, and define durability policy. **Foundation:** Config and databases.
185. **Temporary file** — **C pain:** Predictable names race and cleanup is forgotten. **Zig answer:** Use secure creation and scoped ownership. **Foundation:** Tools.
186. **Directory iterator** — **C pain:** Entry names borrow mutable internal buffers unexpectedly. **Zig answer:** Copy or consume under explicit lifetime rules. **Foundation:** Indexers.
187. **Recursive walker** — **C pain:** Symlink cycles and unbounded depth hang programs. **Zig answer:** Track policy, depth, and visited identities. **Foundation:** Tools.
188. **Path joiner** — **C pain:** Manual separators overflow buffers and mishandle roots. **Zig answer:** Use allocator-explicit normalized construction. **Foundation:** Cross-platform code.
189. **Path normalizer** — **C pain:** .. handling can cross security roots. **Zig answer:** Separate lexical normalization from authorization. **Foundation:** Sandboxes.
190. **File mapping** — **C pain:** Mapped lengths, offsets, and unmap ownership are fragile. **Zig answer:** Use an owned mapping type with aligned ranges. **Foundation:** Databases.
191. **Buffered reader** — **C pain:** Buffer refill invalidates borrowed slices invisibly. **Zig answer:** Document epochs or copy retained data. **Foundation:** Parsers.
192. **Buffered writer** — **C pain:** Flush errors disappear during destruction. **Zig answer:** Require explicit finish and report failure. **Foundation:** Persistence.
193. **Line reader** — **C pain:** Fixed buffers truncate records ambiguously. **Zig answer:** Use bounded growth and explicit limits. **Foundation:** Logs.
194. **File lock guard** — **C pain:** Unlock paths are forgotten during errors. **Zig answer:** Use scoped ownership. **Foundation:** Databases.
195. **Metadata snapshot** — **C pain:** stat fields are copied into incompatible integer widths. **Zig answer:** Translate into typed platform-independent values. **Foundation:** Tools.
196. **Directory creation transaction** — **C pain:** Partial trees remain after failure. **Zig answer:** Track created components for rollback. **Foundation:** Installers.
197. **Content hash scanner** — **C pain:** Files change while being read and produce incoherent metadata. **Zig answer:** Detect identity and size changes. **Foundation:** Deduplication.
198. **Safe recursive delete** — **C pain:** String-prefix checks delete outside the intended root. **Zig answer:** Use opened-directory-relative operations. **Foundation:** Maintenance tools.
199. **File format probe** — **C pain:** Extensions are trusted over actual bytes. **Zig answer:** Use bounded magic and structural validation. **Foundation:** Importers.
200. **Filesystem event coalescer** — **C pain:** Raw watch events overflow queues and contradict. **Zig answer:** Normalize into typed changes with rescan policy. **Foundation:** Indexers.

## 11 — Processes, environment, and command execution

201. **Argument vector builder** — **C pain:** NULL termination and lifetime of strings are mishandled. **Zig answer:** Own or borrow arguments explicitly and adapt at spawn. **Foundation:** Process tools.
202. **Environment map** — **C pain:** Global process environment mutation races and leaks. **Zig answer:** Build an owned environment snapshot. **Foundation:** Servers.
203. **Process spawn** — **C pain:** fork/exec error paths leak descriptors and confuse child/parent state. **Zig answer:** Use explicit child ownership and spawn errors. **Foundation:** Shells.
204. **Pipeline builder** — **C pain:** Each added pipe multiplies cleanup branches. **Zig answer:** Acquire resources with scoped rollback. **Foundation:** Shells.
205. **Captured output** — **C pain:** Deadlocks occur when stdout and stderr fill independently. **Zig answer:** Use concurrent draining or explicit merge policy. **Foundation:** Build tools.
206. **Process timeout** — **C pain:** Signals, races, and wait status create zombie processes. **Zig answer:** Model timeout, termination, and reap states. **Foundation:** Supervisors.
207. **Exit outcome** — **C pain:** Signal termination is flattened into an integer. **Zig answer:** Use a tagged outcome. **Foundation:** CLI tools.
208. **Working-directory guard** — **C pain:** chdir mutates global state and is not restored on failure. **Zig answer:** Prefer spawn-relative configuration or scoped restoration. **Foundation:** Build systems.
209. **Executable lookup** — **C pain:** PATH parsing and empty segments have security consequences. **Zig answer:** Implement explicit search policy. **Foundation:** Shells.
210. **Shell-free command runner** — **C pain:** String concatenation introduces command injection. **Zig answer:** Pass typed argument arrays directly. **Foundation:** Automation.
211. **Process group** — **C pain:** Children survive cancellation and become orphaned. **Zig answer:** Own and terminate a process group explicitly. **Foundation:** Supervisors.
212. **Signal mask guard** — **C pain:** Signal state leaks across unrelated code. **Zig answer:** Use scoped save and restore. **Foundation:** Unix systems.
213. **Child reaper** — **C pain:** wait loops miss states or block unexpectedly. **Zig answer:** Centralize process ownership and nonblocking policy. **Foundation:** Servers.
214. **Daemon readiness pipe** — **C pain:** Parents guess whether initialization succeeded. **Zig answer:** Use a typed one-shot protocol. **Foundation:** Daemons.
215. **Privilege drop sequence** — **C pain:** Incorrect ordering leaves regain paths. **Zig answer:** Encode irreversible staged transitions. **Foundation:** Security tools.
216. **Resource limit adapter** — **C pain:** Platform structs and units are used inconsistently. **Zig answer:** Translate typed limits at one boundary. **Foundation:** Sandboxes.
217. **Process sandbox plan** — **C pain:** Setup failures leave partially constrained children. **Zig answer:** Build and apply an explicit staged policy. **Foundation:** Security.
218. **Subprocess protocol** — **C pain:** Text scraping mixes transport and semantics. **Zig answer:** Use framed messages and bounded readers. **Foundation:** Build workers.
219. **Command transcript** — **C pain:** Logs omit exact arguments or leak secrets. **Zig answer:** Render typed redacted commands. **Foundation:** Diagnostics.
220. **Executable replacement** — **C pain:** Self-update can leave no runnable binary. **Zig answer:** Use atomic replacement and rollback metadata. **Foundation:** Updaters.

## 12 — Concurrency primitives

221. **Mutex guard** — **C pain:** Unlock is forgotten on early return. **Zig answer:** Use scoped locking. **Foundation:** Shared state.
222. **Read-write lock guard** — **C pain:** Upgrade and downgrade assumptions deadlock. **Zig answer:** Expose only supported transitions. **Foundation:** Caches.
223. **Condition-variable queue** — **C pain:** Lost wakeups arise from checking conditions outside the lock. **Zig answer:** Keep predicate and wait loop together. **Foundation:** Work queues.
224. **Semaphore** — **C pain:** Counters overflow or permits leak. **Zig answer:** Use an owned permit guard. **Foundation:** Resource pools.
225. **Barrier** — **C pain:** Generation reuse releases the wrong group. **Zig answer:** Track barrier generations explicitly. **Foundation:** Parallel algorithms.
226. **Latch** — **C pain:** Decrement underflow causes permanent waits. **Zig answer:** Use checked monotonic counts. **Foundation:** Startup coordination.
227. **Once initialization** — **C pain:** Double-checked locking publishes partial objects. **Zig answer:** Use a well-defined once state machine. **Foundation:** Libraries.
228. **Atomic flag** — **C pain:** volatile is mistaken for synchronization. **Zig answer:** Use atomic operations with documented ordering. **Foundation:** Cancellation.
229. **Atomic counter** — **C pain:** Relaxed ordering is copied without justification. **Zig answer:** State the synchronization purpose beside the operation. **Foundation:** Metrics and lifetimes.
230. **Bounded MPMC queue** — **C pain:** Sequence counters and wraparound are subtle. **Zig answer:** Isolate atomics and prove slot ownership. **Foundation:** Schedulers.
231. **SPSC ring queue** — **C pain:** Producer and consumer indices race under weak memory models. **Zig answer:** Use explicit atomic ordering and invariants. **Foundation:** Audio and devices.
232. **Thread pool** — **C pain:** Shutdown and queued-work ownership become ambiguous. **Zig answer:** Use typed messages and staged joining. **Foundation:** Parallel work.
233. **Work stealing deque** — **C pain:** Owner and thief operations have different memory rules. **Zig answer:** Separate roles and document linearization points. **Foundation:** Schedulers.
234. **Future result** — **C pain:** Value, error, cancellation, and completion flags disagree. **Zig answer:** Use a tagged synchronized state. **Foundation:** Async systems.
235. **Channel** — **C pain:** Closing while senders are active causes use-after-free. **Zig answer:** Own endpoints and define close semantics. **Foundation:** Concurrent pipelines.
236. **Thread-safe object pool** — **C pain:** Returning objects during shutdown races destruction. **Zig answer:** Model pool lifecycle and outstanding leases. **Foundation:** Servers.
237. **Hazard-pointer study** — **C pain:** Retired nodes are freed while readers still hold them. **Zig answer:** Make protection and reclamation epochs explicit. **Foundation:** Lock-free education.
238. **Epoch reclamation study** — **C pain:** Threads fail to leave epochs and stall reclamation. **Zig answer:** Use guards and observable epochs. **Foundation:** Concurrent structures.
239. **Deadlock-order checker** — **C pain:** Lock ordering remains tribal knowledge. **Zig answer:** Assign and validate lock ranks in debug builds. **Foundation:** Large systems.
240. **Deterministic scheduler test** — **C pain:** Races rarely reproduce. **Zig answer:** Control task interleavings in tests. **Foundation:** Concurrency education.

## 13 — Networking foundations

241. **Socket owner** — **C pain:** Descriptors leak or are double-closed across wrappers. **Zig answer:** Use an owned socket type. **Foundation:** Network services.
242. **Address parser** — **C pain:** inet_addr-style APIs conflate invalid input and sentinel values. **Zig answer:** Return typed addresses and errors. **Foundation:** Clients and servers.
243. **Endpoint type** — **C pain:** Address families, ports, and path sockets share loose unions. **Zig answer:** Use a tagged endpoint. **Foundation:** Networking.
244. **Connect with deadline** — **C pain:** Blocking calls ignore cancellation and time budgets. **Zig answer:** Combine nonblocking state with an absolute deadline. **Foundation:** Clients.
245. **Accept loop** — **C pain:** Transient errors terminate servers or spin forever. **Zig answer:** Classify retryable outcomes explicitly. **Foundation:** Servers.
246. **Exact send** — **C pain:** Partial sends are mistaken for success. **Zig answer:** Loop with progress and deadline policy. **Foundation:** Protocols.
247. **Exact receive** — **C pain:** Short reads are treated as complete messages. **Zig answer:** Separate transport chunks from message framing. **Foundation:** Protocols.
248. **Length-framed stream** — **C pain:** Untrusted lengths allocate unlimited memory. **Zig answer:** Apply checked limits before allocation. **Foundation:** RPC.
249. **Delimiter-framed stream** — **C pain:** Unbounded scans grow forever without delimiters. **Zig answer:** Use quotas and incremental search. **Foundation:** Text protocols.
250. **Packet checksum** — **C pain:** Signed arithmetic and packed structs produce nonportable results. **Zig answer:** Decode bytes explicitly and use precise sums. **Foundation:** Networking.
251. **IPv4 header decoder** — **C pain:** C bitfields have implementation-defined layout. **Zig answer:** Parse explicit bytes and validate lengths. **Foundation:** Networking.
252. **IPv6 extension iterator** — **C pain:** Malformed chains loop or run beyond packets. **Zig answer:** Require bounded progress. **Foundation:** Networking.
253. **DNS name decoder** — **C pain:** Compression pointers create cycles and out-of-bounds jumps. **Zig answer:** Track visited offsets and depth limits. **Foundation:** DNS.
254. **HTTP header parser** — **C pain:** Pointer pairs and case rules proliferate. **Zig answer:** Use borrowed slices, explicit limits, and normalized lookup. **Foundation:** HTTP.
255. **Chunked transfer decoder** — **C pain:** Hex sizes, extensions, and trailers create state explosions. **Zig answer:** Use an explicit incremental state machine. **Foundation:** HTTP.
256. **WebSocket frame decoder** — **C pain:** Lengths, masks, and fragmentation are easy to misuse. **Zig answer:** Validate each layer into typed frames. **Foundation:** WebSockets.
257. **UDP reassembly study** — **C pain:** Fragment ownership and expiry are unclear. **Zig answer:** Use keyed state with quotas and deadlines. **Foundation:** Protocols.
258. **Rate limiter** — **C pain:** Counters and time windows overflow or race. **Zig answer:** Use typed time and atomic policy. **Foundation:** Servers.
259. **Connection pool** — **C pain:** Borrowed connections outlive pool shutdown. **Zig answer:** Use lease objects and lifecycle states. **Foundation:** Clients.
260. **TLS boundary wrapper** — **C pain:** Foreign library status codes and ownership leak everywhere. **Zig answer:** Translate once into typed Zig resources. **Foundation:** Secure networking.

## 14 — Serialization and data formats

261. **JSON value parser** — **C pain:** Recursive allocation and partial trees leak on malformed input. **Zig answer:** Use allocator-explicit construction with errdefer. **Foundation:** Configuration.
262. **JSON streaming parser** — **C pain:** Whole-document assumptions consume unbounded memory. **Zig answer:** Emit events from a bounded state machine. **Foundation:** Services.
263. **JSON writer** — **C pain:** Comma placement and escaping are duplicated. **Zig answer:** Use structured begin/end operations. **Foundation:** Serialization.
264. **INI parser** — **C pain:** Borrowed line buffers outlive refills. **Zig answer:** Define ownership of keys and values. **Foundation:** Configuration.
265. **TOML tokenizer** — **C pain:** Numbers, dates, and dotted keys create ambiguous states. **Zig answer:** Separate tokens from semantic validation. **Foundation:** Configuration.
266. **CSV parser** — **C pain:** Quoted records violate line-based assumptions. **Zig answer:** Use an incremental lexical state machine. **Foundation:** Data processing.
267. **MessagePack decoder** — **C pain:** Type tags and lengths permit unsafe casts. **Zig answer:** Decode through typed bounded operations. **Foundation:** RPC.
268. **CBOR decoder** — **C pain:** Indefinite lengths and nesting permit resource exhaustion. **Zig answer:** Use depth and item quotas. **Foundation:** Protocols.
269. **Protocol Buffers wire reader** — **C pain:** Unknown fields and varints are easy to skip incorrectly. **Zig answer:** Use bounded key/value decoding. **Foundation:** RPC.
270. **ASN.1 length reader** — **C pain:** Long-form lengths overflow and nesting explodes. **Zig answer:** Validate canonical lengths and quotas. **Foundation:** Security formats.
271. **DER validator** — **C pain:** Permissive BER acceptance undermines signature parsing. **Zig answer:** Encode canonical constraints explicitly. **Foundation:** Cryptography.
272. **WAV parser** — **C pain:** Packed structs assume alignment and host endianness. **Zig answer:** Decode RIFF chunks with bounded readers. **Foundation:** Audio.
273. **BMP decoder** — **C pain:** Dimensions and row padding overflow allocation calculations. **Zig answer:** Use checked arithmetic and limits. **Foundation:** Images.
274. **QOI decoder** — **C pain:** Run lengths and pixel indices can exceed output. **Zig answer:** Maintain exact pixel-count invariants. **Foundation:** Images.
275. **PNG chunk reader** — **C pain:** Chunk lengths and CRC coverage are mishandled. **Zig answer:** Use sub-readers and checksum wrappers. **Foundation:** Images.
276. **TAR header reader** — **C pain:** NUL, space padding, and octal parsing are inconsistent. **Zig answer:** Implement strict field decoders. **Foundation:** Archives.
277. **ZIP directory reader** — **C pain:** Offsets, counts, and overlapping regions are trusted. **Zig answer:** Validate central-directory ranges before use. **Foundation:** Archives.
278. **ELF64 reader** — **C pain:** Casting file bytes to structs assumes layout and alignment. **Zig answer:** Decode explicit fields and validate table ranges. **Foundation:** Loaders.
279. **PE header reader** — **C pain:** Nested offsets and optional-header variants invite unchecked arithmetic. **Zig answer:** Use checked ranges and tagged variants. **Foundation:** Loaders.
280. **SQLite-page reader** — **C pain:** Page numbers, cell offsets, and varints combine many failure modes. **Zig answer:** Use bounded page views and structural validation. **Foundation:** Database study.

## 15 — Compression and codecs

281. **LZ token reader** — **C pain:** Distances and lengths can reference output before it exists. **Zig answer:** Validate every back-reference. **Foundation:** Compression.
282. **LZSS decoder** — **C pain:** Window wrap and output limits are error-prone. **Zig answer:** Reuse ring buffers and quotas. **Foundation:** Compression.
283. **Deflate bitstream reader** — **C pain:** Bit order, block boundaries, and Huffman tables compound complexity. **Zig answer:** Layer bounded bit reading and validated tables. **Foundation:** Archives.
284. **Canonical Huffman builder** — **C pain:** Oversubscribed and incomplete trees are often accepted. **Zig answer:** Validate code-space invariants. **Foundation:** Compression.
285. **Huffman decoder** — **C pain:** Table indices and bit peeks overrun input. **Zig answer:** Use bounded peeks and explicit fallback. **Foundation:** Compression.
286. **Delta decoder** — **C pain:** Signed overflow corrupts reconstructed values. **Zig answer:** Choose checked, wrapping, or saturating policy explicitly. **Foundation:** Media.
287. **Predictive image filter** — **C pain:** Row dependencies and byte arithmetic overflow. **Zig answer:** Use slices and precise modular arithmetic. **Foundation:** Images.
288. **PackBits decoder** — **C pain:** Repeat counts overrun output. **Zig answer:** Apply output quotas before writes. **Foundation:** Images.
289. **LZ4 block decoder** — **C pain:** Unchecked offsets lead directly to memory corruption. **Zig answer:** Validate ranges and overlap semantics. **Foundation:** Compression.
290. **Snappy block decoder** — **C pain:** Varints and copy tags combine unsafe lengths. **Zig answer:** Use bounded reader and checked output growth. **Foundation:** Compression.
291. **Zstandard frame probe** — **C pain:** Header variants and optional fields encourage casts. **Zig answer:** Decode tagged header forms explicitly. **Foundation:** Compression.
292. **Gzip member reader** — **C pain:** Concatenated members and trailer checks are ignored. **Zig answer:** Model each member and checksum. **Foundation:** Archives.
293. **Base85 codec** — **C pain:** Arithmetic overflow appears in compact conversion loops. **Zig answer:** Use wider checked accumulators. **Foundation:** Text transport.
294. **ADPCM nibble decoder** — **C pain:** Packed samples and state updates are easy to desynchronize. **Zig answer:** Use explicit decoder state. **Foundation:** Audio.
295. **PCM converter** — **C pain:** Sample widths and signedness are confused. **Zig answer:** Use typed sample formats and checked scaling. **Foundation:** Audio.
296. **Image stride calculator** — **C pain:** Width times bytes-per-pixel plus padding overflows. **Zig answer:** Centralize checked layout math. **Foundation:** Graphics.
297. **YUV plane layout** — **C pain:** Plane sizes and subsampling rounding are repeatedly wrong. **Zig answer:** Use typed dimensions and checked plane ranges. **Foundation:** Video.
298. **Bit-packed boolean codec** — **C pain:** Trailing padding bits leak nondeterministic data. **Zig answer:** Mask and validate final storage. **Foundation:** Storage.
299. **Dictionary codec** — **C pain:** Dictionary IDs and ownership are undocumented. **Zig answer:** Use stable IDs and explicit lifetime. **Foundation:** Compression.
300. **Streaming decompression quota** — **C pain:** Small input expands without bound. **Zig answer:** Enforce total output and nesting limits structurally. **Foundation:** Security.

## 16 — Time, scheduling, and simulation

301. **Monotonic instant** — **C pain:** Wall-clock jumps break timeout logic. **Zig answer:** Use monotonic time for durations. **Foundation:** I/O and scheduling.
302. **Wall-clock timestamp** — **C pain:** Epoch units and time zones are mixed. **Zig answer:** Use an explicit representation and conversion boundary. **Foundation:** Logs.
303. **Duration type** — **C pain:** Milliseconds and nanoseconds share integers. **Zig answer:** Use typed constructors and checked arithmetic. **Foundation:** All timed code.
304. **Deadline** — **C pain:** Relative timeout is recomputed and extended accidentally. **Zig answer:** Convert once to an absolute monotonic deadline. **Foundation:** I/O.
305. **Periodic timer** — **C pain:** Drift accumulates when scheduling from completion time. **Zig answer:** Define fixed-rate versus fixed-delay policy. **Foundation:** Schedulers.
306. **Timer wheel** — **C pain:** Bucket wrap and cancellation corrupt lists. **Zig answer:** Use generational entries and explicit epochs. **Foundation:** Servers.
307. **Min-heap timer queue** — **C pain:** Stale handles cancel the wrong timer. **Zig answer:** Use stable generation-bearing IDs. **Foundation:** Event loops.
308. **Rate calculator** — **C pain:** Counter wrap and time division produce spikes. **Zig answer:** Use explicit sampling windows and checked deltas. **Foundation:** Metrics.
309. **Token bucket** — **C pain:** Fractional refill and overflow differ by implementation. **Zig answer:** Use fixed-point or exact policy. **Foundation:** Rate limiting.
310. **Leaky bucket** — **C pain:** Queue depth and elapsed time race. **Zig answer:** Centralize state updates under one timestamp. **Foundation:** Traffic shaping.
311. **Backoff schedule** — **C pain:** Exponentiation overflows durations. **Zig answer:** Bound attempts and saturate delays. **Foundation:** Retries.
312. **Calendar date** — **C pain:** Manual leap-year and month tables produce invalid dates. **Zig answer:** Validate construction and separate calendars. **Foundation:** Applications.
313. **UTC offset** — **C pain:** Signed minute arithmetic exceeds valid ranges. **Zig answer:** Use bounded values. **Foundation:** Time parsing.
314. **Timestamp parser** — **C pain:** Partial parses and timezone defaults are ambiguous. **Zig answer:** Return structured fields and strict errors. **Foundation:** Logs.
315. **Stopwatch** — **C pain:** Wall clock causes negative elapsed time. **Zig answer:** Use monotonic instants. **Foundation:** Benchmarks.
316. **Frame limiter** — **C pain:** Sleep imprecision accumulates drift. **Zig answer:** Schedule against target instants. **Foundation:** Games.
317. **Discrete-event queue** — **C pain:** Equal-time ordering becomes nondeterministic. **Zig answer:** Use sequence numbers and explicit ordering. **Foundation:** Simulation.
318. **Scheduler quantum** — **C pain:** Unit conversion truncates to zero. **Zig answer:** Use typed durations and minimum policies. **Foundation:** Kernels.
319. **Timeout state machine** — **C pain:** Timer, operation, and cancellation completions race. **Zig answer:** Resolve outcomes through one synchronized state. **Foundation:** Async I/O.
320. **Clock abstraction** — **C pain:** Tests depend on real sleeping and become flaky. **Zig answer:** Inject a clock interface. **Foundation:** Deterministic tests.

## 17 — Operating-system and kernel primitives

321. **Interrupt-safe ring buffer** — **C pain:** Producer state changes during consumer operations. **Zig answer:** Define interrupt masking or atomic ownership. **Foundation:** Kernels.
322. **Bitmap page allocator** — **C pain:** Raw bit scans confuse free and allocated states. **Zig answer:** Build on a checked bit set with page types. **Foundation:** Kernels and hypervisors.
323. **Page-frame database** — **C pain:** Physical addresses, frame indices, and ownership are conflated. **Zig answer:** Use distinct frame IDs and lifecycle states. **Foundation:** Memory management.
324. **Page-table entry builder** — **C pain:** Bit masks permit reserved combinations. **Zig answer:** Use typed flags and architecture validation. **Foundation:** Virtual memory.
325. **Page-table walker** — **C pain:** Nested indices and huge-page variants cause unchecked dereferences. **Zig answer:** Decode levels explicitly and validate mappings. **Foundation:** Kernels.
326. **Virtual address range** — **C pain:** Start plus length wraps and overlaps reserved space. **Zig answer:** Use checked canonical half-open ranges. **Foundation:** Memory management.
327. **Kernel command-line parser** — **C pain:** Bootloader buffers and sentinel strings are trusted. **Zig answer:** Use bounded input and explicit copies. **Foundation:** Boot code.
328. **Boot memory-map normalizer** — **C pain:** Overlapping and unsorted regions lead to double allocation. **Zig answer:** Sort, clip, and canonicalize ranges. **Foundation:** Boot code.
329. **ELF kernel loader** — **C pain:** File offsets and destination ranges can overlap or overflow. **Zig answer:** Use validated segments and explicit copy policy. **Foundation:** Kernels.
330. **Initcall registry** — **C pain:** Function-pointer sections rely on linker magic without validation. **Zig answer:** Expose ordering and signatures explicitly. **Foundation:** Kernels.
331. **Intrusive list** — **C pain:** Unlinking twice corrupts neighboring nodes. **Zig answer:** Track membership and isolate pointer manipulation. **Foundation:** Kernels.
332. **Spinlock** — **C pain:** Compiler barriers are mistaken for CPU synchronization. **Zig answer:** Use atomic primitives and architecture fences. **Foundation:** Kernels.
333. **Ticket lock** — **C pain:** Counter wrap and memory ordering are easy to get wrong. **Zig answer:** State fairness and ordering explicitly. **Foundation:** Kernels.
334. **Per-CPU storage accessor** — **C pain:** CPU identity and initialization are assumed globally. **Zig answer:** Use typed per-CPU handles and lifecycle. **Foundation:** Kernels.
335. **Interrupt vector table builder** — **C pain:** Handler signatures and vector ownership are unchecked. **Zig answer:** Use typed registration and reserved ranges. **Foundation:** Kernels.
336. **I/O port wrapper** — **C pain:** Widths and port numbers are arbitrary integers. **Zig answer:** Use explicit width operations and bounded ports. **Foundation:** x86 systems.
337. **MMIO register block** — **C pain:** volatile pointers do not encode access width or ordering. **Zig answer:** Wrap registers with typed read/write semantics. **Foundation:** Drivers.
338. **Device capability list** — **C pain:** Linked offsets can cycle or escape config space. **Zig answer:** Use bounded traversal and visited tracking. **Foundation:** PCI.
339. **Kernel log ring** — **C pain:** Concurrent writers corrupt records and readers lose framing. **Zig answer:** Use reservation and committed-record states. **Foundation:** Kernels.
340. **Panic record** — **C pain:** Formatting during failure allocates or deadlocks. **Zig answer:** Use fixed storage and minimal dependencies. **Foundation:** Kernels.

## 18 — Drivers and hardware-facing code

341. **UART driver** — **C pain:** Register offsets and bit masks are copied everywhere. **Zig answer:** Use a typed register map and explicit states. **Foundation:** Serial devices.
342. **Virtio queue** — **C pain:** Descriptor ownership cycles and indices wrap subtly. **Zig answer:** Model available, device-owned, and used states. **Foundation:** Virtual devices.
343. **PCI config reader** — **C pain:** Unaligned widths and capability chains are mishandled. **Zig answer:** Use typed accesses and bounded iteration. **Foundation:** Device discovery.
344. **PCI BAR decoder** — **C pain:** Flag bits and address masks vary by BAR type. **Zig answer:** Return tagged BAR variants. **Foundation:** Device mapping.
345. **Block-device request** — **C pain:** Buffers outlive requests or completion races cleanup. **Zig answer:** Use owned request states. **Foundation:** Storage drivers.
346. **DMA buffer** — **C pain:** Physical, virtual, and device addresses are confused. **Zig answer:** Bundle mappings and synchronization ownership. **Foundation:** Drivers.
347. **Descriptor ring** — **C pain:** Producer/consumer ownership is encoded only in bits. **Zig answer:** Expose descriptor lifecycle transitions. **Foundation:** NIC and storage drivers.
348. **Interrupt moderation config** — **C pain:** Units and hardware bounds are raw integers. **Zig answer:** Use bounded typed configuration. **Foundation:** NICs.
349. **GPIO pin** — **C pain:** Port and pin numbers are mixed with polarity flags. **Zig answer:** Use typed pin descriptors. **Foundation:** Embedded.
350. **I2C transaction** — **C pain:** Address modes and read/write buffers are loosely paired. **Zig answer:** Use tagged operations and explicit ownership. **Foundation:** Embedded.
351. **SPI transaction** — **C pain:** Chip-select lifetime and transfer widths are implicit. **Zig answer:** Represent transaction scope. **Foundation:** Embedded.
352. **Framebuffer view** — **C pain:** Stride, pixel format, and dimensions are independent integers. **Zig answer:** Use a validated surface type. **Foundation:** Graphics.
353. **EDID block reader** — **C pain:** Extension counts and checksums are trusted. **Zig answer:** Use bounded blocks and checksum validation. **Foundation:** Displays.
354. **ACPI table reader** — **C pain:** Packed casts and unbounded table lengths are common. **Zig answer:** Decode headers then confine sub-readers. **Foundation:** Firmware.
355. **Device-tree token reader** — **C pain:** Offsets and string tables can escape the blob. **Zig answer:** Use checked ranges and endian decoding. **Foundation:** Embedded boot.
356. **RTC register decoder** — **C pain:** BCD and binary modes are mixed. **Zig answer:** Use tagged decoding policy. **Foundation:** Timekeeping.
357. **Keyboard scancode state** — **C pain:** Prefix bytes and key-up flags create ad hoc state. **Zig answer:** Use an explicit decoder machine. **Foundation:** Input.
358. **Mouse packet decoder** — **C pain:** Packet synchronization is lost after malformed bytes. **Zig answer:** Use resynchronizing state with bounded fields. **Foundation:** Input.
359. **Audio ring buffer** — **C pain:** Producer underrun and consumer overrun states are ambiguous. **Zig answer:** Use explicit frame counts and atomic roles. **Foundation:** Audio.
360. **Firmware mailbox** — **C pain:** Shared-memory messages require strict ownership and barriers. **Zig answer:** Model request and response states. **Foundation:** Embedded systems.

## 19 — Security and defensive boundaries

361. **Constant-time compare** — **C pain:** memcmp leaks the first differing position. **Zig answer:** Use a dedicated constant-time operation. **Foundation:** Secrets.
362. **Secret owner** — **C pain:** Keys are copied, logged, or left in memory. **Zig answer:** Use restricted access and secure erasure. **Foundation:** Cryptography.
363. **Nonce counter** — **C pain:** Wraparound silently repeats nonces. **Zig answer:** Use checked monotonic counters and exhaustion. **Foundation:** Cryptography.
364. **Password input buffer** — **C pain:** Terminal state and secret lifetime leak on errors. **Zig answer:** Use scoped terminal guards and secure buffers. **Foundation:** CLI security.
365. **Path sandbox join** — **C pain:** String normalization escapes the intended root. **Zig answer:** Resolve relative to an opened root with explicit policy. **Foundation:** Sandboxes.
366. **Privilege state** — **C pain:** UID and capability transitions are scattered. **Zig answer:** Use a staged irreversible state machine. **Foundation:** Daemons.
367. **Capability set** — **C pain:** Raw bitmasks include unsupported or contradictory rights. **Zig answer:** Use enum sets and validation. **Foundation:** Security.
368. **Authorization decision** — **C pain:** Booleans lose denial reasons and obligations. **Zig answer:** Use a tagged decision result. **Foundation:** Services.
369. **Length-limited parser** — **C pain:** Valid syntax still exhausts memory or stack. **Zig answer:** Apply quotas to bytes, depth, and items. **Foundation:** Untrusted input.
370. **Recursion-depth guard** — **C pain:** Malformed nesting causes stack exhaustion. **Zig answer:** Track and bound depth explicitly. **Foundation:** Parsers.
371. **Decompression bomb guard** — **C pain:** Tiny data expands without limit. **Zig answer:** Enforce output and ratio budgets. **Foundation:** Archives.
372. **Integer overflow audit wrapper** — **C pain:** Security-critical size math is scattered. **Zig answer:** Use checked range and size helpers. **Foundation:** All boundaries.
373. **Randomness boundary** — **C pain:** Weak PRNGs are substituted accidentally. **Zig answer:** Require an explicit cryptographic source. **Foundation:** Security.
374. **Token parser** — **C pain:** String splitting accepts malformed or duplicate claims. **Zig answer:** Use strict bounded decoding. **Foundation:** Authentication.
375. **Replay window** — **C pain:** Sequence-number wrap and duplicate tracking are mishandled. **Zig answer:** Use wrapping arithmetic plus a bit window. **Foundation:** Protocols.
376. **Rate-limit key** — **C pain:** Attacker-controlled keys consume unbounded map entries. **Zig answer:** Use quotas and expiry. **Foundation:** Services.
377. **Audit record** — **C pain:** Security events omit identities or include secrets. **Zig answer:** Use a typed redacted schema. **Foundation:** Operations.
378. **Safe logging adapter** — **C pain:** Format strings and user data are confused. **Zig answer:** Separate templates from values. **Foundation:** Security.
379. **FFI validation gate** — **C pain:** Foreign structs enter trusted code unchecked. **Zig answer:** Copy and validate at the boundary. **Foundation:** Libraries.
380. **Unsafe-code island** — **C pain:** Pointer operations spread across the program. **Zig answer:** Confine and document invariants in a tiny module. **Foundation:** Systems code.

## 20 — Databases and persistence

381. **Append-only log** — **C pain:** Partial writes and torn records destroy recovery. **Zig answer:** Use framed records, checksums, and exact writes. **Foundation:** Storage engines.
382. **Record checksum** — **C pain:** Coverage and byte order differ between writer and reader. **Zig answer:** Centralize serialization and verification. **Foundation:** Persistence.
383. **Log scanner** — **C pain:** Corrupt lengths cause infinite loops or huge allocations. **Zig answer:** Require bounded progress and quotas. **Foundation:** Recovery.
384. **In-memory index** — **C pain:** Offsets become stale after compaction. **Zig answer:** Use stable logical IDs or rebuild explicitly. **Foundation:** Databases.
385. **Write batch** — **C pain:** Partial application violates atomic expectations. **Zig answer:** Stage records and commit with one durable marker. **Foundation:** Databases.
386. **Manifest file** — **C pain:** In-place edits lose the current database state. **Zig answer:** Use atomic replacement and versioning. **Foundation:** Storage engines.
387. **SSTable block** — **C pain:** Offsets and restart arrays trust disk data. **Zig answer:** Use bounded block views and validation. **Foundation:** LSM trees.
388. **Bloom-filter block** — **C pain:** Bit counts and hash functions drift across versions. **Zig answer:** Store and validate explicit format metadata. **Foundation:** Databases.
389. **WAL segment** — **C pain:** Rotation and fsync ordering are unclear. **Zig answer:** Model active, sealed, and durable states. **Foundation:** Databases.
390. **Recovery state machine** — **C pain:** Error handling mixes replay, repair, and refusal. **Zig answer:** Use explicit recovery outcomes. **Foundation:** Persistence.
391. **Free-page map** — **C pain:** Double allocation follows stale bitmap updates. **Zig answer:** Use transactional bitset changes. **Foundation:** Page stores.
392. **Slotted page** — **C pain:** Cell pointers overlap or point outside the page. **Zig answer:** Validate canonical page layout. **Foundation:** B-trees.
393. **B-tree split** — **C pain:** Parent and child mutations partially succeed. **Zig answer:** Stage split results before linking. **Foundation:** Databases.
394. **Compaction plan** — **C pain:** Input and output files are deleted in unsafe order. **Zig answer:** Use explicit ownership and durable commit steps. **Foundation:** LSM trees.
395. **Snapshot handle** — **C pain:** Files are reclaimed while readers still use them. **Zig answer:** Use reference-counted or epoch-owned snapshots. **Foundation:** Databases.
396. **Database iterator** — **C pain:** Borrowed key/value slices are invalidated unexpectedly. **Zig answer:** State validity until next movement. **Foundation:** APIs.
397. **Schema version** — **C pain:** Readers guess layouts from file size. **Zig answer:** Use explicit tagged versions and migration. **Foundation:** Persistence.
398. **Migration runner** — **C pain:** Half-applied migrations are rerun incorrectly. **Zig answer:** Record transactional progress. **Foundation:** Applications.
399. **Page cache** — **C pain:** Dirty, pinned, and evictable flags contradict. **Zig answer:** Use explicit page states. **Foundation:** Storage.
400. **Crash-consistency harness** — **C pain:** Happy-path tests miss ordering failures. **Zig answer:** Inject crashes between persistence steps. **Foundation:** Storage education.

## 21 — Services, protocols, and application infrastructure

401. **Configuration loader** — **C pain:** Defaults, files, and environment variables overwrite each other ad hoc. **Zig answer:** Use typed precedence and validation. **Foundation:** Applications.
402. **Command-line schema** — **C pain:** Manual argv parsing duplicates bounds and error handling. **Zig answer:** Describe options with typed results. **Foundation:** CLI tools.
403. **Subcommand dispatcher** — **C pain:** String comparisons and output parameters sprawl. **Zig answer:** Use tagged commands and exhaustive dispatch. **Foundation:** CLI tools.
404. **Structured logger** — **C pain:** printf-style logs lose fields and type information. **Zig answer:** Use typed fields and explicit sinks. **Foundation:** Services.
405. **Log rotation** — **C pain:** Rename, reopen, and concurrent writes race. **Zig answer:** Model active file ownership and rotation transaction. **Foundation:** Daemons.
406. **Metrics registry** — **C pain:** String keys and heterogeneous values are unchecked. **Zig answer:** Use typed metric handles. **Foundation:** Services.
407. **Histogram** — **C pain:** Bucket ownership and concurrent updates are fragile. **Zig answer:** Use fixed buckets and atomic policy. **Foundation:** Observability.
408. **Health state** — **C pain:** One boolean cannot distinguish starting, degraded, and failed. **Zig answer:** Use a tagged service state. **Foundation:** Operations.
409. **Graceful shutdown** — **C pain:** Signals, listeners, workers, and flushes stop in the wrong order. **Zig answer:** Use a staged shutdown plan. **Foundation:** Servers.
410. **Reloadable config** — **C pain:** Pointers into old configuration survive reload. **Zig answer:** Use immutable snapshots and owned swaps. **Foundation:** Daemons.
411. **Plugin registry** — **C pain:** Foreign callbacks outlive unloaded modules. **Zig answer:** Use leases and lifecycle states. **Foundation:** Extensible systems.
412. **RPC request ID** — **C pain:** Wraparound and reuse collide with live calls. **Zig answer:** Use occupancy tracking and typed IDs. **Foundation:** Clients.
413. **RPC framing** — **C pain:** Transport chunks and messages are conflated. **Zig answer:** Use bounded framed readers. **Foundation:** Services.
414. **RPC error model** — **C pain:** Integer codes discard transport versus application failures. **Zig answer:** Use layered tagged errors. **Foundation:** Services.
415. **Retrying client** — **C pain:** Non-idempotent operations are repeated accidentally. **Zig answer:** Carry retry policy in the request type. **Foundation:** Clients.
416. **Connection supervisor** — **C pain:** Reconnect loops leak old state. **Zig answer:** Use explicit connection generations. **Foundation:** Services.
417. **Bounded work admission** — **C pain:** Queues grow until memory exhaustion. **Zig answer:** Apply capacity and rejection policy. **Foundation:** Servers.
418. **Request context** — **C pain:** Deadlines, cancellation, and tracing are global or optional conventions. **Zig answer:** Bundle explicit request-scoped values. **Foundation:** Services.
419. **Dependency graph startup** — **C pain:** Services start before prerequisites and fail nondeterministically. **Zig answer:** Topologically order typed components. **Foundation:** Applications.
420. **Feature gate** — **C pain:** String flags and default fallbacks create unreachable combinations. **Zig answer:** Use typed configuration and exhaustive choices. **Foundation:** Applications.

## 22 — Testing, fuzzing, and verification

421. **Table-driven test** — **C pain:** Manual repeated assertions hide missing cases. **Zig answer:** Use typed cases and readable failures. **Foundation:** All modules.
422. **Allocation-failure sweep** — **C pain:** Only successful allocations are tested. **Zig answer:** Fail each allocation point deterministically. **Foundation:** Owned code.
423. **Property test generator** — **C pain:** Hand-picked cases miss algebraic violations. **Zig answer:** Generate values under explicit constraints. **Foundation:** Algorithms.
424. **State-machine model test** — **C pain:** Sequences of operations reveal bugs single calls cannot. **Zig answer:** Compare implementation against a simple model. **Foundation:** Containers.
425. **Round-trip codec test** — **C pain:** Encoder and decoder can share the same wrong assumption. **Zig answer:** Combine round trips with independent vectors. **Foundation:** Formats.
426. **Golden-vector test** — **C pain:** Specifications contain canonical cases that drift. **Zig answer:** Store and verify stable vectors. **Foundation:** Protocols.
427. **Malformed-input corpus** — **C pain:** Only valid files exercise parsers. **Zig answer:** Curate truncation, overflow, and structural failures. **Foundation:** Security.
428. **Fuzz target harness** — **C pain:** Global state and leaks make fuzzing nondeterministic. **Zig answer:** Build isolated allocator-aware entry points. **Foundation:** Parsers.
429. **Differential test** — **C pain:** One implementation's bugs remain invisible. **Zig answer:** Compare against an independent implementation. **Foundation:** Algorithms.
430. **Reference-model map** — **C pain:** Optimized hash maps are hard to reason about directly. **Zig answer:** Compare behavior with a simple linear map. **Foundation:** Collections.
431. **Concurrency stress test** — **C pain:** Races need many schedules to appear. **Zig answer:** Run bounded randomized interleavings. **Foundation:** Concurrency.
432. **Deterministic clock** — **C pain:** Real time makes tests slow and flaky. **Zig answer:** Inject controllable monotonic time. **Foundation:** Timed code.
433. **Faulty I/O adapter** — **C pain:** Short reads and writes rarely occur on local files. **Zig answer:** Inject partial progress and errors. **Foundation:** I/O.
434. **Crash injection** — **C pain:** Persistence ordering is never exercised. **Zig answer:** Terminate at labeled durability points. **Foundation:** Databases.
435. **Leak checker integration** — **C pain:** Ownership errors hide until long runs. **Zig answer:** Use tracking allocators in tests. **Foundation:** Memory.
436. **Invariant-after-each-step test** — **C pain:** Corruption is found only at the end. **Zig answer:** Validate internal structure after mutations. **Foundation:** Data structures.
437. **API compile test** — **C pain:** Documentation examples silently stop compiling. **Zig answer:** Build examples as tests. **Foundation:** Education.
438. **Benchmark guardrail** — **C pain:** Optimizations regress unnoticed or distort semantics. **Zig answer:** Measure named operations with fixed workloads. **Foundation:** Performance.
439. **Mutation test plan** — **C pain:** Tests pass even when checks are removed. **Zig answer:** Deliberately alter conditions to assess coverage. **Foundation:** Critical code.
440. **Compatibility fixture** — **C pain:** Format changes break old data silently. **Zig answer:** Retain versioned fixtures. **Foundation:** Persistence.

## 23 — Performance and systems measurement

441. **Allocation counter** — **C pain:** Performance discussions guess where memory goes. **Zig answer:** Wrap allocators and report exact operations. **Foundation:** Optimization.
442. **Peak-memory tracker** — **C pain:** Total allocated bytes hide simultaneous pressure. **Zig answer:** Track live and peak usage. **Foundation:** Services.
443. **Cache-friendly struct study** — **C pain:** Field order changes are made without measurement. **Zig answer:** Compare layouts with explicit workloads. **Foundation:** Data-oriented design.
444. **AoS-to-SoA adapter** — **C pain:** Manual parallel arrays drift out of sync. **Zig answer:** Provide a typed structure-of-arrays representation. **Foundation:** Simulation.
445. **Branch-frequency counter** — **C pain:** Hot error paths are optimized by intuition. **Zig answer:** Instrument explicit outcomes. **Foundation:** Profiling.
446. **Latency histogram** — **C pain:** Averages hide tail behavior. **Zig answer:** Use bounded buckets and percentiles. **Foundation:** Services.
447. **Throughput meter** — **C pain:** Time and counter wrap distort rates. **Zig answer:** Use monotonic samples and checked deltas. **Foundation:** Benchmarks.
448. **Microbenchmark harness** — **C pain:** Compiler elimination makes results meaningless. **Zig answer:** Consume results and control setup separately. **Foundation:** Performance.
449. **Arena versus heap benchmark** — **C pain:** Allocator claims are repeated without context. **Zig answer:** Use identical workloads and report tradeoffs. **Foundation:** Education.
450. **Copy versus borrow benchmark** — **C pain:** Premature borrowing adds lifetime complexity without evidence. **Zig answer:** Measure both designs. **Foundation:** API design.
451. **Hash-function benchmark** — **C pain:** Distribution and speed are judged on one dataset. **Zig answer:** Use varied corpora and collision metrics. **Foundation:** Maps.
452. **Parser allocation profile** — **C pain:** Fast parsing still performs thousands of hidden allocations. **Zig answer:** Track allocations per input unit. **Foundation:** Parsers.
453. **I/O chunk-size study** — **C pain:** Magic buffer sizes become folklore. **Zig answer:** Measure explicit sizes and platforms. **Foundation:** I/O.
454. **False-sharing demonstrator** — **C pain:** Independent counters contend because of layout. **Zig answer:** Use aligned types and measurements. **Foundation:** Concurrency.
455. **Lock-contention benchmark** — **C pain:** Throughput hides starvation and tail latency. **Zig answer:** Measure waits and fairness. **Foundation:** Concurrency.
456. **Queue-capacity study** — **C pain:** Unbounded queues seem fast until overload. **Zig answer:** Compare rejection, blocking, and growth. **Foundation:** Servers.
457. **Memory-bandwidth copy** — **C pain:** Custom loops are assumed faster than primitives. **Zig answer:** Benchmark generated code and alignment cases. **Foundation:** Low-level optimization.
458. **SIMD boundary adapter** — **C pain:** Vector code leaks alignment and tail assumptions everywhere. **Zig answer:** Isolate vectorized core plus scalar remainder. **Foundation:** Numerics.
459. **Cold-start measurement** — **C pain:** Initialization cost is omitted from benchmarks. **Zig answer:** Separate startup and steady state. **Foundation:** Applications.
460. **Reproducible benchmark report** — **C pain:** Results lack compiler, target, and optimization metadata. **Zig answer:** Emit a structured environment record. **Foundation:** Research.

## 24 — Language tools and virtual machines

461. **Token kind enum** — **C pain:** Integer token codes collide and switches miss cases. **Zig answer:** Use exhaustive tagged tokens. **Foundation:** Compilers.
462. **Lexer cursor** — **C pain:** Pointer scans overrun sentinels and lose source positions. **Zig answer:** Use slices and source spans. **Foundation:** Compilers.
463. **Pratt parser** — **C pain:** Binding-power tables and node ownership become implicit. **Zig answer:** Use typed precedence and allocator-explicit AST construction. **Foundation:** Expression languages.
464. **Recursive-descent parser** — **C pain:** Backtracking consumes tokens inconsistently. **Zig answer:** Use marks or explicit lookahead. **Foundation:** Compilers.
465. **AST arena** — **C pain:** Nodes allocate individually and cleanup becomes enormous. **Zig answer:** Use region ownership tied to the compilation unit. **Foundation:** Compilers.
466. **AST node union** — **C pain:** Type tags and union payloads disagree. **Zig answer:** Use a tagged union. **Foundation:** Compilers.
467. **Symbol table** — **C pain:** Identifier pointers and scopes outlive buffers. **Zig answer:** Use intern IDs and scoped maps. **Foundation:** Compilers.
468. **Scope stack** — **C pain:** Push/pop mismatches leak bindings. **Zig answer:** Use an owned stack and guards. **Foundation:** Compilers.
469. **Type interner** — **C pain:** Equivalent types are duplicated and pointer equality lies. **Zig answer:** Canonicalize into stable IDs. **Foundation:** Compilers.
470. **Diagnostic engine** — **C pain:** Parser errors lose spans and context. **Zig answer:** Use structured diagnostics. **Foundation:** Compilers.
471. **Bytecode builder** — **C pain:** Jump offsets are patched through raw indices. **Zig answer:** Use labels and checked fixups. **Foundation:** Virtual machines.
472. **Bytecode verifier** — **C pain:** Malformed instructions crash the interpreter. **Zig answer:** Validate stack effects and branch targets. **Foundation:** Virtual machines.
473. **Operand stack** — **C pain:** Stack underflow becomes memory corruption. **Zig answer:** Use checked push/pop and typed values. **Foundation:** Virtual machines.
474. **Tagged value** — **C pain:** Manual tag and union fields diverge. **Zig answer:** Use a tagged union or validated packed representation. **Foundation:** Runtimes.
475. **Dispatch loop** — **C pain:** Function tables accept incompatible handlers. **Zig answer:** Use typed opcode handling. **Foundation:** Virtual machines.
476. **Call frame** — **C pain:** Base pointers and return addresses are raw integers. **Zig answer:** Use explicit frame records and checked ranges. **Foundation:** Virtual machines.
477. **Garbage-collector mark stack** — **C pain:** Recursive tracing overflows the C stack. **Zig answer:** Use an explicit bounded/dynamic work stack. **Foundation:** Runtimes.
478. **Object handle table** — **C pain:** Moving collectors invalidate raw pointers. **Zig answer:** Use stable handles. **Foundation:** Runtimes.
479. **Module loader** — **C pain:** Dependency cycles and partial initialization leak state. **Zig answer:** Use explicit loading states. **Foundation:** Languages.
480. **REPL transaction** — **C pain:** Failed input mutates global compiler state. **Zig answer:** Stage and commit definitions. **Foundation:** Language tools.

## 25 — Integration, FFI, freestanding, and capstones

481. **C error-code wrapper** — **C pain:** Foreign integer results spread through Zig code. **Zig answer:** Translate once into an error set. **Foundation:** FFI.
482. **C owned-handle wrapper** — **C pain:** Manual destroy calls are forgotten. **Zig answer:** Use an owned Zig type with deinit. **Foundation:** FFI.
483. **C borrowed-view wrapper** — **C pain:** Foreign pointers outlive the source object. **Zig answer:** Tie access to the owner's lifetime and copy when needed. **Foundation:** FFI.
484. **Callback trampoline** — **C pain:** void context and function signatures are easy to mismatch. **Zig answer:** Generate or hand-write a typed boundary. **Foundation:** FFI.
485. **Packed-struct decoder** — **C pain:** Compiler layout is trusted for wire data. **Zig answer:** Decode fields explicitly. **Foundation:** FFI and formats.
486. **ABI layout test** — **C pain:** Struct drift breaks foreign calls silently. **Zig answer:** Assert size, alignment, and offsets. **Foundation:** FFI.
487. **Foreign string adapter** — **C pain:** Sentinel and length conventions are mixed. **Zig answer:** Use explicit temporary adaptation. **Foundation:** FFI.
488. **Dynamic-library owner** — **C pain:** Symbols outlive unloaded libraries. **Zig answer:** Tie symbol access to a library lease. **Foundation:** Plugins.
489. **Freestanding panic sink** — **C pain:** Default panic behavior assumes an operating system. **Zig answer:** Provide fixed, allocation-free diagnostics. **Foundation:** Bare metal.
490. **Freestanding allocator interface** — **C pain:** Hosted heap assumptions infect low-level modules. **Zig answer:** Depend only on the allocator contract. **Foundation:** Kernels.
491. **Boot-time fixed arena** — **C pain:** Early code needs storage before the heap exists. **Zig answer:** Build on caller-supplied memory. **Foundation:** Boot code.
492. **No-stdlib container profile** — **C pain:** Reference modules accidentally import hosted facilities. **Zig answer:** Define a freestanding-compatible subset. **Foundation:** Hypervisors.
493. **Kernel-safe bounded reader** — **C pain:** Parser diagnostics allocate or touch filesystems. **Zig answer:** Keep the core reader dependency-free. **Foundation:** Boot formats.
494. **Page-backed vector** — **C pain:** Byte allocators do not express page ownership. **Zig answer:** Adapt dynamic storage to page providers. **Foundation:** Hypervisors.
495. **ELF-to-memory loader** — **C pain:** Parser and allocator responsibilities blur. **Zig answer:** Compose bounded ELF parsing with explicit destination ranges. **Foundation:** Kernels.
496. **Virtual CPU state machine** — **C pain:** Flags permit impossible launch and stop combinations. **Zig answer:** Use tagged lifecycle states. **Foundation:** Hypervisors.
497. **Guest-memory map** — **C pain:** Overlapping regions and address wrap cause isolation failures. **Zig answer:** Use checked interval maps. **Foundation:** Hypervisors.
498. **Virtio console path** — **C pain:** Descriptor rings, byte queues, and interrupts are entangled. **Zig answer:** Compose proven queue and device modules. **Foundation:** Hypervisors.
499. **Tiny HTTP service** — **C pain:** Sockets, parsers, queues, and shutdown meet in one program. **Zig answer:** Compose earlier reference modules without hiding mechanisms. **Foundation:** Capstone.
500. **Tiny key-value database** — **C pain:** Files, checksums, indexes, recovery, and tests meet in one system. **Zig answer:** Compose the foundation into durable software. **Foundation:** Capstone.

---

## Completion standard

A module is not complete merely because its happy path runs. It should state its invariants, define ownership and invalidation, test its failure paths, avoid undocumented allocation, and explain what Zig still cannot decide for the programmer.

These 500 modules are intended to become a cumulative answer to a recurring question:

> How should this be done clearly, safely, and close to the machine in Zig?
