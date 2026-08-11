# Mastery

`ObjectId` names an object only inside one `FileSystem`. The root is a directory. Creation validates the complete component and capacity before mutation. Lookup starts at an explicit object or root for an absolute path. File bytes live inline, reads are bounded, and callers own open-file offsets and generational resource identity.

Exercises: prove failed creation is unchanged; wrap an `ObjectId` in project 57; add a Linux `openat` adapter without adding Linux constants here.
