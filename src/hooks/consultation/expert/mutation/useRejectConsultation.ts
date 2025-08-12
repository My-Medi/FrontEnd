import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  ExpertRequestedConsultationList,
  ExpertRequestedConsultationListResponse,
} from '../../../../types/consultation';
import { rejectConsultation } from '../../../../apis/consultationApi/consultation';
import { EXP_REQ_INF_QK, EXP_REQ_QK } from '../queries/useExpertRequestedConsultations';

const pick = (r: any): ExpertRequestedConsultationList | undefined =>
  (r?.data ?? r?.result) as ExpertRequestedConsultationList | undefined;

export function useRejectConsultation(onDone?: () => void, onFail?: (e: Error) => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => rejectConsultation(id),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: [EXP_REQ_QK] });
      await qc.cancelQueries({ queryKey: [EXP_REQ_INF_QK] });

      const reqQs = qc.getQueryCache().findAll({ queryKey: [EXP_REQ_QK] });
      const reqPrev = reqQs.map((q) => ({
        key: q.queryKey,
        data: qc.getQueryData<ExpertRequestedConsultationListResponse>(q.queryKey),
      }));
      reqPrev.forEach(({ key, data }) => {
        const list = pick(data);
        if (!list) return;
        const next = {
          ...(data as any),
          data: { ...list, content: list.content.filter((c) => c.consultationId !== id) },
        };
        qc.setQueryData(key, next);
      });

      const infQs = qc.getQueryCache().findAll({ queryKey: [EXP_REQ_INF_QK] });
      const infPrev = infQs.map((q) => ({
        key: q.queryKey,
        data: qc.getQueryData<any>(q.queryKey),
      }));
      infPrev.forEach(({ key, data }) => {
        if (!data?.pages) return;
        const nextPages = data.pages.map((p: any) => {
          const list = pick(p);
          if (!list) return p;
          return {
            ...(p as any),
            data: { ...list, content: list.content.filter((c) => c.consultationId !== id) },
          };
        });
        qc.setQueryData(key, { ...data, pages: nextPages });
      });

      return { reqPrev, infPrev };
    },

    onError: (e, _v, ctx) => {
      ctx?.reqPrev?.forEach(({ key, data }) => qc.setQueryData(key, data));
      ctx?.infPrev?.forEach(({ key, data }) => qc.setQueryData(key, data));
      onFail?.(e as Error);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: [EXP_REQ_QK] });
      qc.invalidateQueries({ queryKey: [EXP_REQ_INF_QK] });
      // 환자관리(승인된 회원) 목록도 혹시 모를 동기화 목적
      qc.invalidateQueries({ queryKey: ['acceptedMembers'] });
      onDone?.();
    },
  });
}
