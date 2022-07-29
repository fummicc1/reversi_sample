//
//  Client.swift
//  
//
//  Created by Fumiya Tanaka on 2022/07/23.
//

import Foundation
import Vapor

public struct Client: Content {
    public var sid: String
    public var roomId: String?
    public var result: Game.Result?
}
