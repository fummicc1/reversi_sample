import WebSocketKit
import Fluent
import Vapor


func routes(_ app: Application) throws {
    // MARK: HTTP
    app.get { req in
        return "It works!"
    }

    // MARK: Websocket
    app.webSocket("hello") { req, ws in
        print(ws)
    }
}
