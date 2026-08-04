# Unit-Safe Quantity

Creates distinct scalar types for quantities such as bytes, pages, sectors, ticks, nanoseconds, or pixels. Values with different unit tags cannot be passed interchangeably even when they share the same integer representation.

Use explicit conversion functions in higher modules whenever changing units.