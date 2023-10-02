export const defaultDocument = {
  documents: [
    {
      id: 0,
      title: "노션을 소개 합니다.",
      document: [],
    },
  ],
  toggles: {
    0: false,
  },
  detailDocument: {
    0: {
      id: 0,
      title: "노션을 소개 합니다",
      content:
        "안녕하세요! 바닐라 자바스크립트로 구현한 노션페이지 소개 글입니다.\n첫 번째 페이지는 수정과 삭제가 되지 않습니다!\n\n구현 기간 : 2023-09-27 ~ ing (시간이 있을 때 리펙토링을 진행하고 있습니다.)\nGit : https://github.com/HeeSeok-kim/VanillaJS_clone_notion\n\nAPI가 없기에 데이터는 세션 스토리지에 저장을 하고 있습니다.\n시간이 있을 때 아래 기능을 구현하려고 합니다.\n\n구현 예정인 기능\n1. 뎁스 구현\n2. Textarea => div로 변경하기\n3. 마크다운 구현하기\n4. 다크모드 구현하기\n",
      document: [],
    },
  },
  length: 1,
};

export const defaultForm = JSON.stringify({
  id: 0,
  title: "",
  content: "",
  document: [],
});
