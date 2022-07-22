import Foundation
import Vapor
import SwiftyReversi


public struct Game: AsyncResponseEncodable {
    public var board: Board

    public func checkWinner() -> Disk? {
        let darkCount = board.count(of: .dark)
        let lightCount = board.count(of: .light)
        if darkCount > lightCount {
            return .dark
        } else if darkCount < lightCount {
            return .light
        }
        return nil
    }
}

extension Game {
    public enum Result: String, Hashable {
        case win
        case lose
        case draw
    }
}

extension Board: AsyncResponseEncodable {
    public func encodeResponse(for request: Vapor.Request) async throws -> Vapor.Response {
        <#code#>
    }


}

extension Disk: AsyncResponseEncodable {
    
}
