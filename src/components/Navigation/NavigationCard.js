export default function NavigationCard({ id, title, toggle }) {
  const toggleImg = toggle
    ? "/assets/toggle_open.svg"
    : "/assets/toggle_close.svg";
  const navigationChild = toggle
    ? "navigation_child"
    : "navigation_child hidden";
  const $NavigationCard = `
    <div class="navigation_card_container" >
        <div class="navigation_card" data-id=${id}>
          <img src=${toggleImg} data-action="toggle">
          <img src="/assets/document.svg" data-action="move">
          <span class="navigation_card_text" data-action="move">${
            title ? title : "제목 없음"
          }</span>
          <img src="/assets/delete.svg" data-action="delete">
          <img src="/assets/add.svg" data-action="add">
        </div>
        <div class=${navigationChild} data-action="child">
          <span>하위 페이지 없음</span>
        </div>
    </div>
  `;

  return $NavigationCard;
}
