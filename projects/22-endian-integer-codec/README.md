# Endian Integer Codec

Encodes and decodes fixed-width integers with byte order selected explicitly in the type. It avoids host-endian casts, packed-struct assumptions, and repeated byte swapping.

Useful for binary formats, network protocols, firmware tables, device registers, and executable loaders.