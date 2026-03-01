interface MapMetaData {
    length: string,
    difficulty: string,
    type: string,
}

export type MapInfo = Record<string, MapMetaData>
