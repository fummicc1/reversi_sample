import Foundation
import Vapor


public enum Disk {
    case light
    case dark
}


extension Disk: Codable {
    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let key = try container.decode(String.self)
        if key == "dark" {
            self = .dark
        } else if key == "light" {
            self = .light
        } else {
            throw Abort(.internalServerError)
        }
    }

    public func encode(to encoder: Encoder) throws {
        let key: String
        switch self {
        case .dark:
            key = "dark"
        case .light:
            key = "light"
        }
        var container = encoder.singleValueContainer()
        try container.encode(key)
    }
}
