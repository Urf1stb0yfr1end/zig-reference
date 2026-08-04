const std=@import("std");
const vectors=@import("fixed-capacity-vector");
const enums=@import("validated-enum-decoder");
const ranges=@import("checked-half-open-range");
const addresses=@import("distinct-memory-address-types");
const frames=@import("physical-page-frame-number-and-address-conversion");

pub const RegionKind=enum(u8){ usable=1, reserved=2, firmware=3, device=4 };
pub const PhysicalMemoryRegion=struct { start:addresses.PhysicalAddress, range:ranges.CheckedRange, kind:RegionKind,
    pub fn init(start_address:addresses.PhysicalAddress,byte_length:usize,region_kind:RegionKind) error{Overflow,ZeroLength}!@This(){ if(byte_length==0)return error.ZeroLength; const checked_range=ranges.CheckedRange.fromStartAndLength(start_address.raw(),byte_length) catch return error.Overflow; return .{.start=start_address,.range=checked_range,.kind=region_kind}; }
    pub fn length(self:@This())usize{return self.range.length();} pub fn contains(self:@This(),address:addresses.PhysicalAddress)bool{return self.range.containsValue(address.raw());}
};
pub fn PhysicalMemoryRegionSet(comptime capacity_:usize) type { _=enums; _=frames.PageSize; return struct { regions:vectors.FixedVector(PhysicalMemoryRegion,capacity_)=.{},
    pub const Error=error{Full,Overlap,Overflow,ZeroLength};
    pub fn count(self:*const @This())usize{return self.regions.count();} pub fn items(self:*const @This())[]const PhysicalMemoryRegion{return self.regions.constItems();}
    pub fn insert(self:*@This(),region:PhysicalMemoryRegion) Error!void { for(self.items())|existing| if(existing.range.overlaps(region.range)) return error.Overlap; self.regions.append(region) catch return error.Full; const slice=self.regions.items(); std.mem.sort(PhysicalMemoryRegion,slice,{},struct{fn less(_:void,a:PhysicalMemoryRegion,b:PhysicalMemoryRegion)bool{return a.start.raw()<b.start.raw();}}.less); }
    pub fn add(self:*@This(),start:addresses.PhysicalAddress,length:usize,kind:RegionKind) Error!void { const r=PhysicalMemoryRegion.init(start,length,kind) catch |e| return e; try self.insert(r); }
    pub fn findContaining(self:*const @This(),address:addresses.PhysicalAddress)?PhysicalMemoryRegion{for(self.items())|r|if(r.contains(address))return r;return null;}
    pub fn intersects(self:*const @This(),range:ranges.CheckedRange)bool{for(self.items())|r|if(r.range.overlaps(range))return true;return false;}
    pub fn mergeAdjacent(self:*@This())void{ var i:usize=0; while(i+1<self.regions.count()){ const a=self.regions.items()[i]; const b=self.regions.items()[i+1]; if(a.kind==b.kind and a.range.end==b.range.start){self.regions.items()[i].range.end=b.range.end; _=self.regions.orderedRemove(i+1) catch unreachable;}else i+=1; } }
};
test "orders queries and merges compatible adjacency" { var s=PhysicalMemoryRegionSet(4){}; try s.add(addresses.PhysicalAddress.init(0x2000),0x1000,.usable); try s.add(addresses.PhysicalAddress.init(0x1000),0x1000,.usable); s.mergeAdjacent(); try std.testing.expectEqual(@as(usize,1),s.count()); try std.testing.expect(s.findContaining(addresses.PhysicalAddress.init(0x1800))!=null); }
test "rejects zero overflow overlap and full atomically" { try std.testing.expectError(error.ZeroLength,PhysicalMemoryRegion.init(addresses.PhysicalAddress.init(0),0,.usable)); var s=PhysicalMemoryRegionSet(1){}; try s.add(addresses.PhysicalAddress.init(0),10,.usable); try std.testing.expectError(error.Overlap,s.add(addresses.PhysicalAddress.init(5),2,.reserved)); try std.testing.expectEqual(@as(usize,1),s.count()); }
