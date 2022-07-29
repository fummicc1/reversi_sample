//
//  Room.swift
//  
//
//  Created by Fumiya Tanaka on 2022/07/23.
//

import Foundation
import SwiftyReversi
import Vapor


public struct Room: Content {
    public var id: String
    public var clients: [Client]
    public var game: Game

    public init(id: String, clients: [Client], game: Game) {
        self.id = id
        self.clients = clients
        self.game = game
    }

    public static var maxClientCount: Int {
        2
    }
}
