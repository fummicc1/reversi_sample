import Foundation
import Vapor


public struct Game: Codable, Content {
    public var board: Board

    public func checkWinner() -> Disk? {
        let boardResult = board.result()
        let darkCount = boardResult.darkCount
        let lightCount = boardResult.lightCount
        if darkCount > lightCount {
            return .dark
        } else if darkCount < lightCount {
            return .light
        }
        return nil
    }
}

extension Game {
    public enum Result: String, Hashable, Content {
        case win
        case lose
        case draw
    }
}
