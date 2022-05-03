import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from '../BaseApiService';
import { CommunityMissionViewModel } from '../../constants/generated/Model/communityMissionViewModel';
import { CommunityMissionTrackedViewModel } from '../../constants/generated/Model/communityMissionTrackedViewModel';

export class CommunityMissionService extends BaseApiService {

    async getCommunityMission(): Promise<ResultWithValue<CommunityMissionViewModel>> {
        return this.get<CommunityMissionViewModel>('HelloGames/CommunityMission/');
    }

    async getCommunityMissionTrackedProgress(startDate: string, endDate: string): Promise<ResultWithValue<Array<CommunityMissionTrackedViewModel>>> {
        const url = `CommunityMissionProgress/${startDate}/${endDate}`;
        return this.get<Array<CommunityMissionTrackedViewModel>>(url);
    }
}
