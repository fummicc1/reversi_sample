import Foundation
import Vapor

public struct RoomController: RouteCollection {

    public func boot(routes: RoutesBuilder) throws {
        let group = routes.grouped("rooms")

        group.get(use: index(req:))
        group.post("new", use: post(req:))
    }

    public func index(req: Request) async throws -> Game {
        guard let sid = req.parameters.get("sid") else {
            throw Abort(.badRequest)
        }
        if let currentRoom = await Store.shared.rooms.first(where: { $0.clients.map(\.sid).contains(sid) }) {
            return currentRoom.game
        }
        throw Abort(.internalServerError)
    }

    public func post(req: Request) async throws -> Room {
        let request = try req.content.decode(PostRequest.self)
        let sid = request.sid
        var rooms = await Store.shared.rooms
        if let index = rooms.firstIndex(where: { $0.clients.contains(where: { client in client.sid == sid }) }) {
            rooms.remove(at: index)
        }
        let roomId = UUID().uuidString
        let client = Client(sid: sid, roomId: roomId, result: nil)
        let game = Game(board: Board(size: 5))
        let room = Room(
            id: roomId,
            clients: [
                client
            ],
            game: game
        )
        rooms.append(room)
        await Store.shared.update(rooms: rooms)
        return room
    }
}

extension RoomController {
    public struct PostRequest: Content {
        public let sid: String
    }
}
