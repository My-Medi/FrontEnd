import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApprovedConsultation } from '../../../../apis/consultationApi/consultation';
import { EXP_APPROVED_INF_QK, EXP_APPROVED_QK } from '../queries/useExpertRequestedConsultations';

export function useDeleteApprovedConsultation(onDone?: () => void, onFail?: (e: Error) => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteApprovedConsultation(id),

    // 승인됨 목록이 이미 붙어 있다면 여기에도 낙관적 적용 가능
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [EXP_APPROVED_QK] });
      qc.invalidateQueries({ queryKey: [EXP_APPROVED_INF_QK] });
      onDone?.();
    },

    onError: (e) => onFail?.(e as Error),
  });
}
