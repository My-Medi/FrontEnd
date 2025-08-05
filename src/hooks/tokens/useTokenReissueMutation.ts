import { useMutation } from '@tanstack/react-query';
import { tokenAPI } from '../../apis/tokenApi/token';
import { saveTokens } from '../../utils/tokenStorage';
import type { TokenReissueResponse } from '../../apis/tokenApi/token';

interface UseTokenReissueMutationProps {
  onSuccess?: (data: TokenReissueResponse) => void;
  onError?: (error: Error) => void;
}

export const useTokenReissueMutation = ({
  onSuccess,
  onError,
}: UseTokenReissueMutationProps = {}) => {
  return useMutation<TokenReissueResponse, Error, string>({
    mutationFn: (refreshToken: string) => tokenAPI.reissue(refreshToken),
    onSuccess: (data) => {
      // 새로운 토큰 저장
      saveTokens(data.accessToken, data.refreshToken);
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}; 