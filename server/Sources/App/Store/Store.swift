//
//  File.swift
//  
//
//  Created by Fumiya Tanaka on 2022/07/29.
//

import Foundation


public actor Store {

    public static let shared = Store()

    public var rooms: [Room] = []

    public func update(rooms: [Room]) {
        self.rooms = rooms
    }
}
