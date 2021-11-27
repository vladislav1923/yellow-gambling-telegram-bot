import { PlannedMatchesResponseDataDto } from './planned-matches-response-data.dto';
import {JsonProperty, Serializable} from "typescript-json-serializer";
import {BaseDto} from "./base.dto";

@Serializable()
export class PlannedMatchesResponseDto extends BaseDto {
    @JsonProperty() success: boolean = false;
    @JsonProperty() data: PlannedMatchesResponseDataDto | undefined;
}