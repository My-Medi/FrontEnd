import API from '../axios';

// 닉네임 중복 확인 (true = 중복, false = 사용 가능)
export const checkNicknameDuplication = async (nickname: string): Promise<boolean> => {
	const response = await API.get(`/tokens/duplication/nickname`, {
		params: { nickname },
	});
	return Boolean(response.data?.result);
};

// 로그인 아이디 중복 확인 (true = 중복, false = 사용 가능)
export const checkLoginIdDuplication = async (loginId: string): Promise<boolean> => {
	const response = await API.get(`/tokens/duplication/login-id`, {
		params: { loginId },
	});
	return Boolean(response.data?.result);
};


