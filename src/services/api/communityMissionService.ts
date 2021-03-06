import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { BaseApiService } from '../BaseApiService';
import { CommunityMissionViewModel } from '../../constants/generated/Model/communityMissionViewModel';
import { CommunityMissionTrackedViewModel } from '../../constants/generated/Model/communityMissionTrackedViewModel';
import { CommunityMissionPercentagePerDay } from '../../constants/generated/Model/communityMissionPercentagePerDayViewModel';

export class CommunityMissionService extends BaseApiService {

    async getCommunityMission(): Promise<ResultWithValue<CommunityMissionViewModel>> {
        return this.get<CommunityMissionViewModel>('HelloGames/CommunityMission/');
    }

    async getCommunityMissionTrackedProgress(startDate: string, endDate: string, missionId?: number, missionTier?: number): Promise<ResultWithValue<Array<CommunityMissionTrackedViewModel>>> {
        let trail = '';
        if (missionId != null && missionTier != null) {
            trail = missionId + '/' + missionTier;
        }
        const url = `CommunityMissionProgress/progress/${startDate}/${endDate}/${trail}`;
        return this.get<Array<CommunityMissionTrackedViewModel>>(url);
    }

    async getPercentageChangePerDay(startDate: string, endDate: string): Promise<ResultWithValue<Array<CommunityMissionPercentagePerDay>>> {
        const url = `CommunityMissionProgress/percentChange/${startDate}/${endDate}`;
        return this.get<Array<CommunityMissionPercentagePerDay>>(url);
    }
}
