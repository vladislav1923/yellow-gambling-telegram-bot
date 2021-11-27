import { PlannedMatchesResponseDataDto } from './planned-matches-response-data.dto';

export interface PlannedMatchesResponseDto {
    success: boolean;
    data: PlannedMatchesResponseDataDto;
}