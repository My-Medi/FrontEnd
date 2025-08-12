/* 로그 확인전 코드 */
import API from '../axios';

export const getAcceptedMembers = async (page = 0, size = 3) => {
  try {
    const { data } = await API.get('/experts/consultations/accepted', {
      params: { page, size },
    });
    return data;
  } catch (e: any) {
    // 디버깅용 로그
    const status = e?.response?.status;
    const body = e?.response?.data;
    const headers = e?.config?.headers;
    console.log('[AcceptedMembers] status:', status);
    console.log('[AcceptedMembers] body:', body);
    console.log('[AcceptedMembers] req headers:', headers);
    throw e;
  }
};
