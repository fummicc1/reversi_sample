//
//  Room.swift
//  
//
//  Created by Fumiya Tanaka on 2022/07/23.
//

import Foundation
import SwiftyReversi
import Vapor


public struct Room {
    public var id: String
    public var clients: [Client]
    public var game: Game!

    public static var maxClientCount: Int {
        2
    }
}

extension Room: AsyncResponseEncodable {    
}
