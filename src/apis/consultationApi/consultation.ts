import type {
  ConsultationAffectResponse,
  ExpertRequestedConsultationListResponse,
} from '../../types/consultation';
import API from '../axios';

export const getExpertRequestedConsultations = async (
  page = 0,
  size = 3,
): Promise<ExpertRequestedConsultationListResponse> => {
  const res = await API.get<ExpertRequestedConsultationListResponse>(
    '/api/v1/experts/consultations/requested',
    { params: { page, size } },
  );
  return res.data;
};

export const approveConsultation = async (
  consultationId: number,
): Promise<ConsultationAffectResponse> => {
  const res = await API.patch<ConsultationAffectResponse>(
    `/api/v1/experts/consultations/${consultationId}/approve`,
  );
  return res.data;
};

export const rejectConsultation = async (
  consultationId: number,
): Promise<ConsultationAffectResponse> => {
  const res = await API.patch<ConsultationAffectResponse>(
    `/api/v1/experts/consultations/${consultationId}/reject`,
  );
  return res.data;
};

export const deleteApprovedConsultation = async (
  consultationId: number,
): Promise<ConsultationAffectResponse> => {
  const res = await API.delete<ConsultationAffectResponse>(
    `/api/v1/experts/consultations/${consultationId}`,
  );
  return res.data;
};
