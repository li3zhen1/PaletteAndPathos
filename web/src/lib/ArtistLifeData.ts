// Generated by https://quicktype.io

export interface ArtistLifeDataset {
    wiki: ArtistLife[];
    moma: ArtistLife[];
}

export interface ArtistLife {
    name?:        string;
    keywords?:    string[];
    lifePeriods?: LifePeriod[];
    genre?:       string[];
    // ArtistLife?:  ArtistLife;
}

export interface LifePeriod {
    start:     number;
    end:       number;
    happiness: number;
    location:  string;
    events:    string[];
}