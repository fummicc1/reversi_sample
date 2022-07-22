import Foundation
import Vapor


public struct RoomController: RouteCollection {

    public private(set) var rooms: [Room] = []

    public func boot(routes: RoutesBuilder) throws {
        let group = routes.grouped("rooms")
        group.get("join", use: index(req:))
    }

    public func index(req: Request) async throws -> Room {

    }
}
