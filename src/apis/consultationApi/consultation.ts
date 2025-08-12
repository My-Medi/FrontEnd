import type {
  ConsultationAffectResponse,
  ExpertRequestedConsultationListResponse,
  ExpertUserInfoResponse,
} from '../../types/consultation';
import API from '../axios';

export const getExpertRequestedConsultations = async (
  page = 0,
  size = 3,
): Promise<ExpertRequestedConsultationListResponse> => {
  const res = await API.get<ExpertRequestedConsultationListResponse>(
    '/experts/consultations/requested',
    { params: { page, size } },
  );
  return res.data;
};

export const approveConsultation = async (
  consultationId: number,
): Promise<ConsultationAffectResponse> => {
  const res = await API.patch<ConsultationAffectResponse>(
    `/experts/consultations/${consultationId}/approve`,
  );
  return res.data;
};

export const rejectConsultation = async (
  consultationId: number,
): Promise<ConsultationAffectResponse> => {
  const res = await API.patch<ConsultationAffectResponse>(
    `/experts/consultations/${consultationId}/reject`,
  );
  return res.data;
};

export const deleteApprovedConsultation = async (
  consultationId: number,
): Promise<ConsultationAffectResponse> => {
  const res = await API.delete<ConsultationAffectResponse>(
    `/experts/consultations/${consultationId}`,
  );
  return res.data;
};

// 특정 사용자 정보 (요청서 상세) 조회
export const getExpertUserInfo = async (
  userId: number,
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' = 'REQUESTED',
): Promise<ExpertUserInfoResponse> => {
  const res = await API.get<ExpertUserInfoResponse>(
    `/experts/users/${userId}/info`,
    { params: { status } },
  );
  return res.data;
};
