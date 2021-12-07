const getLeagueCacheKey = (date: string, leagueId: string): string => {
    return `league_${leagueId}_by_date_${date}`;
};

const getPredictionCacheKey = (fixtureId: string): string => {
    return `prediction_by_fixture_${fixtureId}`;
};

export { getLeagueCacheKey, getPredictionCacheKey };
