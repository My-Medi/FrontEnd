/* 로그 확인전 코드 */
import API from '../axios';

export const getAcceptedMembers = async (page = 0, size = 6) => {
  try {
    const { data } = await API.get('/experts/consultations/accepted', {
      params: { page, size },
    });
    return data;
  } catch (e: any) {
    throw e;
  }
};
