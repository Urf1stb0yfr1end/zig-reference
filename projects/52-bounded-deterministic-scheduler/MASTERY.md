# Mastery

The scheduler owns copied task descriptors in inline storage. Earlier `ready_at` wins, then smaller `priority`, then insertion order inherited from the stable priority queue. `nextReady` never consults ambient time. Scheduling failure and reversed time leave state unchanged. Reset invalidates queued tasks.

Exercises: test a full queue; advance across multiple wake times; prove equal-key stability; decide how an application maps task IDs to owned work.
