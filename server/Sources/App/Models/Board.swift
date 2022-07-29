import Foundation

public struct Board {
    public var width: Int
    public var height: Int
    public var disks: [Disk?]

    public init(size: Int) {
        assert(size % 2 == 0)
        self.width = size
        self.height = size
        self.disks = (0..<size).map { row -> [Disk?] in
            (0..<size).map { column -> Disk? in
                if column - size / 2 > 1 || row - size / 2 > 1 {
                    return nil
                } else {
                    return column == row ? Disk.dark : Disk.light
                }
            }
        }.flatMap { $0 }
    }

    public struct Result {
        public var darkCount: Int
        public var lightCount: Int

        public init(darkCount: Int, lightCount: Int) {
            self.darkCount = darkCount
            self.lightCount = lightCount
        }
    }
}

extension Board {
    public func result() -> Result {
        var result = Result(darkCount: 0, lightCount: 0)
        for i in 0..<width {
            for j in 0..<height {
                let id = j * width + i
                guard let disk = disks[id] else {
                    continue
                }
                switch disk {
                case .light:
                    result.lightCount += 1
                case .dark:
                    result.darkCount += 1
                }
            }
        }
        return result
    }
}

extension Board: Codable {
    public enum CodingKeys: String, CodingKey {
        case width
        case height
        case disks
    }

    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        height = try container.decode(Int.self, forKey: .height)
        width = try container.decode(Int.self, forKey: .width)
        disks = try container.decode([Disk].self, forKey: .disks)
    }
}
