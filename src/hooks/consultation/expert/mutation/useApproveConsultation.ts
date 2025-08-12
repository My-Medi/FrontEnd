import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  ExpertRequestedConsultationList,
  ExpertRequestedConsultationListResponse,
} from '../../../../types/consultation';
import { approveConsultation } from '../../../../apis/consultationApi/consultation';
import {
  EXP_APPROVED_INF_QK,
  EXP_APPROVED_QK,
  EXP_REQ_INF_QK,
  EXP_REQ_QK,
} from '../queries/useExpertRequestedConsultations';

const pick = (r: any): ExpertRequestedConsultationList | undefined =>
  (r?.data ?? r?.result) as ExpertRequestedConsultationList | undefined;

export function useApproveConsultation(onDone?: () => void, onFail?: (e: Error) => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => approveConsultation(id),

    // 요청 목록에서 해당 카드 제거 (낙관적)
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
      // 요청/승인 목록 동기화
      qc.invalidateQueries({ queryKey: [EXP_REQ_QK] });
      qc.invalidateQueries({ queryKey: [EXP_REQ_INF_QK] });
      qc.invalidateQueries({ queryKey: [EXP_APPROVED_QK] });
      qc.invalidateQueries({ queryKey: [EXP_APPROVED_INF_QK] });
      // 환자관리(승인된 회원) 목록 갱신
      qc.invalidateQueries({ queryKey: ['acceptedMembers'] });
      onDone?.();
    },
  });
}
